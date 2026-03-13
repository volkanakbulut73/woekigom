import { supabase } from './supabase';
import type { Profile, Transaction, SwapListing } from '../types';

export const DBService = {
    async ensureUserProfile(userId: string, fullName: string, avatarUrl: string | null = null) {
        const { data, error } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                full_name: fullName,
                avatar_url: avatarUrl,
            }, { onConflict: 'id' })
            .select()
            .single();

        if (error) throw error;
        return data as Profile;
    },

    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data as Profile;
    },

    async updateProfile(userId: string, updates: Partial<Profile>) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data as Profile;
    },

    async createTransactionRequest(seekerId: string, amount: number, listingTitle: string) {
        const { data, error } = await supabase
            .from('transactions')
            .insert({
                seeker_id: seekerId,
                amount,
                listing_title: listingTitle,
                status: 'waiting-supporter',
            })
            .select()
            .single();

        if (error) throw error;
        return data as Transaction;
    },

    async getPendingTransactions() {
        const { data, error } = await supabase
            .from('transactions')
            .select(`*, profiles!transactions_seeker_id_fkey(full_name, rating, avatar_url)`)
            .eq('status', 'waiting-supporter')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getUserActiveTransaction(userId: string) {
        const { data, error } = await supabase
            .from('transactions')
            .select(`*, seeker:profiles!transactions_seeker_id_fkey(full_name), supporter:profiles!transactions_supporter_id_fkey(full_name)`)
            .or(`seeker_id.eq.${userId},supporter_id.eq.${userId}`)
            .in('status', ['waiting-supporter', 'waiting-cash-payment', 'cash-paid', 'qr-uploaded'])
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows returned
        return data || null;
    },

    async getTransactionById(transactionId: string) {
        const { data, error } = await supabase
            .from('transactions')
            .select(`*, seeker:profiles!transactions_seeker_id_fkey(full_name), supporter:profiles!transactions_supporter_id_fkey(full_name)`)
            .eq('id', transactionId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data || null;
    },

    async updateTransactionStatus(transactionId: string, status: Transaction['status'], updates: Partial<Transaction> = {}) {
        const { data, error } = await supabase
            .from('transactions')
            .update({ status, ...updates })
            .eq('id', transactionId)
            .select()
            .single();

        if (error) throw error;
        return data as Transaction;
    },

    async acceptTransaction(transactionId: string, supporterId: string, supportPercentage: number) {
        return this.updateTransactionStatus(transactionId, 'waiting-cash-payment', { supporter_id: supporterId, support_percentage: supportPercentage });
    }
};

export const SwapService = {
    async getListings() {
        const { data, error } = await supabase
            .from('swap_listings')
            .select(`*, profiles(full_name, rating, avatar_url)`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async createListing(listingData: Omit<SwapListing, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('swap_listings')
            .insert(listingData)
            .select()
            .single();

        if (error) throw error;
        return data as SwapListing;
    },

    async deleteListing(listingId: string) {
        const { error } = await supabase
            .from('swap_listings')
            .delete()
            .eq('id', listingId);

        if (error) throw error;
    },

    async uploadImage(file: File, bucket: 'images' | 'qr-codes' | 'avatars') {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return data.publicUrl;
    }
};

export const MessageService = {
    async getThreadMessages(threadId: string) {
        const { data, error } = await supabase
            .from('messages')
            .select(`*, sender:profiles!messages_sender_id_fkey(full_name, avatar_url), receiver:profiles!messages_receiver_id_fkey(full_name, avatar_url)`)
            .eq('thread_id', threadId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data;
    },

    async getUserThreads(userId: string) {
        const { data, error } = await supabase
            .from('threads')
            .select(`
                *,
                buyer:profiles!threads_buyer_id_fkey(full_name, avatar_url),
                seller:profiles!threads_seller_id_fkey(full_name, avatar_url),
                listing:swap_listings(title, photo_url, required_balance)
            `)
            .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
            .order('updated_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getThreadDetails(threadId: string) {
         const { data, error } = await supabase
            .from('threads')
            .select(`
                *,
                buyer:profiles!threads_buyer_id_fkey(full_name, avatar_url),
                seller:profiles!threads_seller_id_fkey(full_name, avatar_url),
                listing:swap_listings(title, photo_url, required_balance)
            `)
            .eq('id', threadId)
            .single();
         if (error) throw error;
         return data;
    },

    async findOrCreateThread(listingId: string | null, buyerId: string, sellerId: string, type: 'market' | 'task' | 'private') {
        let query = supabase.from('threads').select('*').eq('buyer_id', buyerId).eq('seller_id', sellerId).eq('type', type);
        if (listingId) query = query.eq('listing_id', listingId);
        else query = query.is('listing_id', null);

        const { data: found } = await query;
        if (found && found.length > 0) return found[0];

        // Try reverse buyer/seller
        let query2 = supabase.from('threads').select('*').eq('buyer_id', sellerId).eq('seller_id', buyerId).eq('type', type);
        if (listingId) query2 = query2.eq('listing_id', listingId);
        else query2 = query2.is('listing_id', null);

        const { data: found2 } = await query2;
        if (found2 && found2.length > 0) return found2[0];

        // Create new
        const { data: created, error } = await supabase
            .from('threads')
            .insert({
                listing_id: listingId,
                buyer_id: buyerId,
                seller_id: sellerId,
                type,
                last_message: null
            })
            .select()
            .single();

        if (error) throw error;
        return created;
    },

    async sendMessage(threadId: string, senderId: string, receiverId: string, content: string) {
        const { data, error } = await supabase
            .from('messages')
            .insert({
                thread_id: threadId,
                sender_id: senderId,
                receiver_id: receiverId,
                content,
                read: false
            })
            .select()
            .single();

        if (error) throw error;

        // Update thread last_message and updated_at
        await supabase
            .from('threads')
            .update({ last_message: content, updated_at: new Date().toISOString() })
            .eq('id', threadId);

        // Also create a notification for the receiver
        await NotificationService.createNotification(
            receiverId,
            'new_message',
            'Yeni Mesaj',
            `Yeni bir mesajınız var.`,
            `/app/messages/${threadId}`
        );

        return data;
    },

    async markThreadMessagesAsRead(threadId: string, viewerId: string) {
        const { error } = await supabase
            .from('messages')
            .update({ read: true })
            .eq('thread_id', threadId)
            .eq('receiver_id', viewerId)
            .eq('read', false);

        if (error) throw error;

        // Also clear notifications related to these messages
        await NotificationService.markMessageNotificationsAsRead(threadId, viewerId);
    }
};

export const NotificationService = {
    async getUserNotifications(userId: string) {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getUnreadCount(userId: string) {
        const { count, error } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('read', false);

        if (error) throw error;
        return count || 0;
    },

    async getUnreadMessageCount(userId: string) {
        const { count, error } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('type', 'new_message')
            .eq('read', false);

        if (error) throw error;
        return count || 0;
    },

    async markAsRead(notificationId: string) {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', notificationId);

        if (error) throw error;
    },

    async markAllAsRead(userId: string) {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', userId)
            .eq('read', false);

        if (error) throw error;
    },

    async markMessageNotificationsAsRead(threadId: string, userId: string) {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', userId)
            .eq('type', 'new_message')
            .like('link', `%${threadId}%`)
            .eq('read', false);

        if (error) throw error;
    },

    async createNotification(userId: string, type: string, title: string, content: string, link: string) {
        const { data, error } = await supabase
            .from('notifications')
            .insert({
                user_id: userId,
                type,
                title,
                content,
                link,
                read: false
            });

        if (error) throw error;
        return data;
    }
};
