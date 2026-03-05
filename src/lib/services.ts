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

    async uploadImage(file: File, bucket: 'images' | 'qr-codes') {
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
