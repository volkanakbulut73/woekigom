import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageService } from '../lib/services';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowLeft, Send, ShoppingCart, Briefcase, Lock, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Message, MessageThread } from '../types';

const MessagesPage = () => {
    const { user, profile } = useAuth();
    const { thread_id } = useParams<{ thread_id: string }>();
    const navigate = useNavigate();

    const [threads, setThreads] = useState<MessageThread[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingThreads, setLoadingThreads] = useState(true);
    const [loadingChat, setLoadingChat] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeThread = threads.find(t => t.id === thread_id);

    // Fetch Threads
    useEffect(() => {
        const fetchThreads = async () => {
            if (!user) return;
            try {
                const data = await MessageService.getUserThreads(user.id);
                setThreads(data as MessageThread[]);
            } catch (err) {
                console.error("Error fetching threads:", err);
            } finally {
                setLoadingThreads(false);
            }
        };

        fetchThreads();

        // Optional: Poll or Real-time for thread updates
        const interval = setInterval(fetchThreads, 10000);
        return () => clearInterval(interval);
    }, [user]);

    // Fetch Messages for Active Thread
    useEffect(() => {
        if (!thread_id || !user) {
            setMessages([]);
            return;
        }

        const fetchMessages = async () => {
            setLoadingChat(true);
            try {
                const data = await MessageService.getThreadMessages(thread_id);
                setMessages(data as Message[]);
                await MessageService.markThreadMessagesAsRead(thread_id, user.id);
            } catch (err) {
                const error = err as { code?: string };
                if (error.code !== '42P01') console.error("Error fetching messages:", error);
            } finally {
                setLoadingChat(false);
            }
        };

        fetchMessages();

        const subscription = supabase
            .channel(`messages-${thread_id}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `thread_id=eq.${thread_id}` }, async (payload) => {
                setMessages((prev) => [...prev, payload.new as Message]);
                if (user && thread_id) {
                    await MessageService.markThreadMessagesAsRead(thread_id, user.id);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [thread_id, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !activeThread || !thread_id) return;

        const content = newMessage.trim();
        setNewMessage('');
        const receiverId = activeThread.buyer_id === user.id ? activeThread.seller_id : activeThread.buyer_id;

        try {
            const tempMessage = {
                id: Date.now().toString(),
                thread_id: thread_id,
                sender_id: user.id,
                receiver_id: receiverId,
                content: content,
                read: false,
                created_at: new Date().toISOString(),
                sender: {
                    full_name: profile?.full_name || 'Ben',
                    avatar_url: profile?.avatar_url || ''
                }
            };
            setMessages(prev => [...prev, tempMessage as Message]);

            await MessageService.sendMessage(thread_id, user.id, receiverId, content);
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const getOtherParty = (thread?: MessageThread) => {
        if (!user || !thread) return null;
        return thread.buyer_id === user.id ? thread.seller : thread.buyer;
    };

    const formatTime = (isoString?: string | null) => {
        if (!isoString) return '';
        const d = new Date(isoString);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getThreadIcon = (type: string) => {
        switch (type) {
            case 'market': return <ShoppingCart size={14} className="text-cyan-400" />;
            case 'task': return <Briefcase size={14} className="text-pink-400" />;
            case 'private': return <Lock size={14} className="text-[#39ff14]" />;
            default: return <MessageSquare size={14} />;
        }
    };

    const isMobileView = window.innerWidth < 1024;
    const showList = !isMobileView || !thread_id;
    const showChat = !isMobileView || !!thread_id;

    return (
        <div className="w-full flex gap-4 xl:gap-6 animate-in fade-in duration-500 pb-10 h-[calc(100vh-100px)]">
            {/* Left Panel: Thread List */}
            {showList && (
                <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col bg-[#16172d] border border-white/5 rounded-3xl overflow-hidden shadow-xl shrink-0">
                    <div className="p-5 border-b border-white/5 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0a0b1e] border border-white/10 rounded-xl flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-white tracking-wide">Mesajlarım</h1>
                            </div>
                        </div>
                        <div className="relative">
                            <input type="text" placeholder="Sohbetlerde ara..." className="w-full bg-[#0a0b1e] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#39ff14]/50 focus:outline-none transition-colors" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar p-2">
                        {loadingThreads ? (
                            <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div></div>
                        ) : threads.length === 0 ? (
                            <div className="p-10 text-center text-slate-500 text-sm font-medium">Sohbetiniz bulunmuyor.</div>
                        ) : (
                            threads.map((thread) => {
                                const other = getOtherParty(thread);
                                const isActive = thread.id === thread_id;
                                const avatar = other?.avatar_url || `https://ui-avatars.com/api/?name=${other?.full_name?.replace(' ', '+') || 'A'}&background=random`;

                                return (
                                    <Link
                                        key={thread.id}
                                        to={`/app/messages/${thread.id}`}
                                        className={`flex items-start gap-3 p-3 rounded-2xl transition-all mb-1 ${isActive ? 'bg-[#0a0b1e] border border-[#39ff14]/20 shadow-[0_0_15px_rgba(57,255,20,0.05)]' : 'hover:bg-white/5 border border-transparent'}`}
                                    >
                                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 relative">
                                            <img src={avatar} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center h-12">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <h3 className="text-white font-bold text-sm truncate">{other?.full_name || 'Kullanıcı'}</h3>
                                                <span className="text-[10px] text-slate-500">{formatTime(thread.updated_at)}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 truncate pr-4 flex items-center gap-1.5">
                                                <span className="shrink-0">{getThreadIcon(thread.type)}</span>
                                                <span className="truncate">{thread.last_message || 'İlan sorusu...'}</span>
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* Right Panel: Active Chat */}
            {showChat && (
                <div className="flex-1 flex flex-col bg-[#16172d] border border-white/5 rounded-3xl overflow-hidden shadow-xl lg:flex relative">
                    {!thread_id ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-4 opacity-50 p-10">
                            <MessageSquare size={64} className="text-slate-600" />
                            <p className="text-lg font-bold text-center">Bir sohbet seçin veya yeni mesaj gönderin.</p>
                        </div>
                    ) : (
                        <>
                            {/* Chat Context Header */}
                            <div className="bg-[#0a0b1e]/80 backdrop-blur-xl border-b border-white/5 flex flex-col z-10 shrink-0">
                                <div className="p-3 lg:p-4 flex items-center gap-3 border-b border-white/5 relative">
                                    <button onClick={() => navigate('/app/messages')} className="lg:hidden w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-white">
                                        <ArrowLeft size={18} />
                                    </button>
                                    <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0">
                                        <img src={getOtherParty(activeThread)?.avatar_url || `https://ui-avatars.com/api/?name=${getOtherParty(activeThread)?.full_name?.replace(' ', '+') || 'A'}&background=random`} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-base leading-tight">
                                            {getOtherParty(activeThread)?.full_name || 'Kullanıcı'}
                                        </h3>
                                        <p className="text-[10px] text-[#39ff14] uppercase tracking-widest font-bold flex items-center gap-1 mt-0.5">
                                            Çevrimiçi
                                        </p>
                                    </div>
                                </div>
                                {activeThread?.listing && (
                                    <div className="px-3 py-2 bg-[#16172d]/50 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            {activeThread.listing.photo_url && (
                                                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                                    <img src={activeThread.listing.photo_url.split(',')[0]} className="w-full h-full object-cover" alt="" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-xs font-bold text-slate-300 truncate max-w-[150px] lg:max-w-xs">{activeThread.listing.title}</p>
                                                <p className="text-[10px] text-cyan-400 font-bold">₺{activeThread.listing.required_balance}</p>
                                            </div>
                                        </div>
                                        <Link to={`/app/market/${activeThread.listing_id}`} className="text-xs font-bold text-[#39ff14] flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#39ff14]/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            İlana Git <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 no-scrollbar bg-[#0b141a] relative">
                                <div className="absolute inset-0 bg-[#0a0b1e]/50 backdrop-blur-[2px]"></div>
                                <div className="relative z-10 flex flex-col space-y-4">
                                {loadingChat ? (
                                    <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#39ff14]"></div></div>
                                ) : messages.length === 0 ? (
                                    <div className="text-center p-10 text-slate-400 text-sm">Mesajınız yok.</div>
                                ) : (
                                    messages.map((msg, idx) => {
                                        const isMe = msg.sender_id === user?.id;
                                        return (
                                            <div key={msg.id || idx} className={`flex w-full gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                <div className="flex flex-col max-w-[80%] lg:max-w-[70%]">
                                                    <div className={`px-4 py-2.5 text-[14px] leading-relaxed shadow-lg relative group ${isMe
                                                        ? 'bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-sm' // WhatsApp Dark Mode Sender
                                                        : 'bg-[#202c33] border border-white/5 text-[#e9edef] rounded-2xl rounded-tl-sm' // WhatsApp Dark Mode Receiver
                                                        }`}>
                                                        {msg.content}
                                                        <div className={`text-[10px] mt-1 text-right flex items-center justify-end gap-1 ${isMe ? 'text-white/60' : 'text-slate-400'}`}>
                                                            {formatTime(msg.created_at)}
                                                            {isMe && <span className="text-[#53bdeb] text-[8px]">✓✓</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="p-3 lg:p-4 border-t border-white/5 bg-[#202c33] shrink-0 z-10 relative">
                                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 max-w-4xl mx-auto">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Bir mesaj yazın..."
                                        className="flex-1 bg-[#2a3942] rounded-xl py-3.5 px-5 text-[15px] text-[#e9edef] focus:outline-none focus:ring-1 focus:ring-white/10 transition-shadow placeholder:text-[#8696a0]"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className="w-12 h-12 shrink-0 bg-[#00a884] text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00a884]/90 transition-colors shadow-lg"
                                    >
                                        <Send size={20} className="-ml-0.5" />
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
