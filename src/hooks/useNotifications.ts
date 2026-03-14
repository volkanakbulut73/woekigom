import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { NotificationService } from '../lib/services';
import { supabase } from '../lib/supabase';
import { useLocation } from 'react-router-dom';

export function useNotifications() {
    const { user } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    const location = useLocation();
    const pathRef = useRef(location.pathname);

    useEffect(() => {
        pathRef.current = location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        if (!user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUnreadCount(0);
            return;
        }

        const fetchCount = async () => {
            try {
                const count = await NotificationService.getUnreadCount(user.id);
                setUnreadCount(count);

                const messageCount = await NotificationService.getUnreadMessageCount(user.id);
                setUnreadMessageCount(messageCount);
            } catch (err) {
                console.error("Error fetching notification count:", err);
            }
        };

        fetchCount();

        // Listen for new notifications
        const channel = supabase
            .channel(`public:notifications:user_id=eq.${user.id}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, (payload) => {
                // If it's a new message notification and user is on that specific chat, skip the bell increase
                if (payload.eventType === 'INSERT' && payload.new.type === 'new_message') {
                    const link = payload.new.link || '';
                    const idMatch = link.split('/').pop();
                    if (idMatch && pathRef.current.includes(idMatch)) {
                        return; // User is actively viewing this, skip fetching the higher count
                    }
                }
                fetchCount();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    return { unreadCount, setUnreadCount, unreadMessageCount, setUnreadMessageCount };
}
