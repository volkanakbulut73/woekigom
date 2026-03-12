import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { NotificationService } from '../lib/services';
import { supabase } from '../lib/supabase';

export function useNotifications() {
    const { user } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!user) {
            setUnreadCount(0);
            return;
        }

        const fetchCount = async () => {
            try {
                const count = await NotificationService.getUnreadCount(user.id);
                setUnreadCount(count);
            } catch (err) {
                console.error("Error fetching notification count:", err);
            }
        };

        fetchCount();

        // Listen for new notifications
        const channel = supabase
            .channel(`public:notifications:user_id=eq.${user.id}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, () => {
                fetchCount();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    return { unreadCount, setUnreadCount };
}
