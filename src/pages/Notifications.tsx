import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { NotificationService } from '../lib/services';
import type { Notification } from '../types';
import { Bell, Check, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const NotificationsPage = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return;
            try {
                const data = await NotificationService.getUserNotifications(user.id);
                setNotifications(data as Notification[]);
            } catch (err) {
                console.error("Error fetching notifications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();

        if (!user) return;
        const channel = supabase
            .channel(`public:notifications:user_id=eq.${user.id}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, () => {
                fetchNotifications();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const markAllAsRead = async () => {
        if (!user) return;
        try {
            await NotificationService.markAllAsRead(user.id);
            setNotifications(notifications.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error(err);
        }
    };

    const markAsRead = async (id: string, read: boolean) => {
        if (read) return;
        try {
            await NotificationService.markAsRead(id);
            setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error(err);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'new_message': return <MessageSquare size={20} className="text-cyan-400" />;
            case 'transaction': return <CheckCircle2 size={20} className="text-[#39ff14]" />;
            default: return <AlertCircle size={20} className="text-slate-400" />;
        }
    };

    return (
        <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#16172d] border border-white/5 rounded-2xl flex items-center justify-center text-slate-300">
                        <Bell size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-wide">Bildirimler</h1>
                        <p className="text-sm text-slate-400 font-medium">Hesabınızla ilgili güncellemeler</p>
                    </div>
                </div>
                {notifications.some(n => !n.read) && (
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-sm font-bold border border-white/5 transition-colors"
                    >
                        <Check size={16} />
                        Tümünü Okundu İşaretle
                    </button>
                )}
            </div>

            <div className="bg-[#16172d] rounded-3xl border border-white/5 overflow-hidden flex flex-col min-h-[500px]">
                {loading ? (
                    <div className="flex-1 flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#39ff14]"></div>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-4 py-20">
                        <Bell size={48} className="text-slate-600 opacity-50" />
                        <p className="text-lg font-bold">Hiç bildiriminiz yok.</p>
                        <p className="text-sm">Yeni bir gelişme olduğunda burada görünecek.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {notifications.map((notif) => (
                            <div key={notif.id} className={`p-4 sm:p-6 transition-colors hover:bg-white/[0.02] flex flex-col sm:flex-row gap-4 items-start ${!notif.read ? 'bg-[#39ff14]/[0.02]' : ''}`}>
                                <div className="flex w-full gap-4">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 bg-[#0a0b1e]">
                                        {getIcon(notif.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-4 mb-1">
                                            <h3 className={`text-base font-bold truncate ${!notif.read ? 'text-white' : 'text-slate-300'}`}>
                                                {notif.title}
                                            </h3>
                                            <span className="text-xs text-slate-500 whitespace-nowrap shrink-0 font-medium">
                                                {new Date(notif.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                                            {notif.content}
                                        </p>
                                        {notif.link && (
                                            <Link
                                                to={notif.link}
                                                onClick={() => markAsRead(notif.id, notif.read)}
                                                className="inline-flex py-1.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 font-bold text-xs transition-colors border border-white/5 active:scale-95"
                                            >
                                                Görüntüle
                                            </Link>
                                        )}
                                    </div>
                                    {!notif.read && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#39ff14] shrink-0 mt-2 shadow-[0_0_8px_#39ff14]"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
