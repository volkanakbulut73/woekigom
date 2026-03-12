import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageService } from '../lib/services';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, Clock } from 'lucide-react';
import type { Message } from '../types';

const MessagesPage = () => {
    const { user } = useAuth();
    const [threads, setThreads] = useState<any[]>([]); // Using any for grouped thread representation
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) return;
            try {
                const messages = await MessageService.getUserMessageThreads(user.id) as Message[];

                // Group messages by listing_id to create thread summaries
                const threadMap = new Map<string, any>();

                messages.forEach(msg => {
                    const existingThread = threadMap.get(msg.listing_id);

                    // We only want the most recent message per thread for the preview
                    if (!existingThread || new Date(msg.created_at) > new Date(existingThread.lastMessageDate)) {
                        const otherParty = msg.sender_id === user.id ? msg.receiver : msg.sender;
                        const unreadCount = (!msg.read && msg.receiver_id === user.id) ? 1 : 0;

                        threadMap.set(msg.listing_id, {
                            listing_id: msg.listing_id,
                            listing_title: msg.listing?.title || 'Bilinmeyen İlan',
                            listing_photo: msg.listing?.photo_url ? msg.listing.photo_url.split(',')[0] : null,
                            otherParty: otherParty || { full_name: 'Anonim' },
                            lastMessage: msg.content,
                            lastMessageDate: msg.created_at,
                            unreadCount: (existingThread?.unreadCount || 0) + unreadCount
                        });
                    } else if (!msg.read && msg.receiver_id === user.id) {
                        // Increment unread count for older unread messages in the thread
                        existingThread.unreadCount += 1;
                    }
                });

                setThreads(Array.from(threadMap.values()).sort((a, b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()));
            } catch (err) {
                console.error("Error fetching message threads:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [user]);

    return (
        <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#16172d] border border-white/5 rounded-2xl flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <MessageSquare size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-white tracking-wide">Mesajlarım</h1>
                    <p className="text-sm text-slate-400 font-medium">Görüşmeleriniz ve ilan soruları</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {loading ? (
                    <div className="col-span-full py-20 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                    </div>
                ) : threads.length === 0 ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 gap-4 bg-[#16172d] border border-white/5 rounded-3xl">
                        <MessageSquare size={48} className="text-slate-600 opacity-50" />
                        <p className="text-lg font-bold">Hiç mesajınız yok.</p>
                        <p className="text-sm">İlanlarınıza mesaj geldiğinde burada görünecek.</p>
                    </div>
                ) : (
                    threads.map((thread) => (
                        <Link
                            key={thread.listing_id}
                            to={`/app/market/messages/${thread.listing_id}`}
                            className="bg-[#16172d] border border-white/5 hover:border-cyan-400/30 rounded-3xl p-5 flex flex-col gap-4 transition-all group shadow-lg"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-white/10">
                                        {thread.listing_photo ? (
                                            <img src={thread.listing_photo} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-white/30 text-xl">
                                                {thread.listing_title[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-bold text-sm truncate">{thread.listing_title}</h3>
                                        <p className="text-xs text-cyan-400 font-bold mt-0.5 truncate flex items-center gap-1.5">
                                            <span className="w-4 h-4 rounded-full overflow-hidden inline-block shrink-0 border border-white/20">
                                                <img src={thread.otherParty?.avatar_url || `https://ui-avatars.com/api/?name=${thread.otherParty?.full_name}&background=random`} alt="" className="w-full h-full object-cover" />
                                            </span>
                                            {thread.otherParty?.full_name}
                                        </p>
                                    </div>
                                </div>
                                {thread.unreadCount > 0 && (
                                    <div className="w-6 h-6 rounded-full bg-[#39ff14] text-[#0a0b1e] flex items-center justify-center text-xs font-black shadow-[0_0_10px_#39ff14] shrink-0">
                                        {thread.unreadCount}
                                    </div>
                                )}
                            </div>

                            <div className="bg-[#0a0b1e] rounded-2xl p-4 border border-white/5 relative">
                                <p className={`text-sm line-clamp-2 ${thread.unreadCount > 0 ? 'text-white font-medium' : 'text-slate-400'}`}>
                                    {thread.lastMessage}
                                </p>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(thread.lastMessageDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${thread.unreadCount > 0 ? 'text-[#39ff14]' : 'text-slate-600'}`} />
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
