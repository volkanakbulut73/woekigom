import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Send, Smile, Hash, Users, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../hooks/useNotifications';

interface ChatMessage {
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    senderAvatar: string | null;
    timestamp: string;
    isBot: boolean;
}

interface OnlineUser {
    id: string;
    name: string;
    avatar: string | null;
}

const Muhabbet = () => {
    const { profile, user } = useAuth();
    const { unreadCount } = useNotifications();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBotTyping]);

    useEffect(() => {
        if (!user || !profile) return;

        // Initialize Supabase Realtime Channel
        const channel = supabase.channel('public-chat');
        channelRef.current = channel;

        // Listen for incoming broadcast messages
        channel.on('broadcast', { event: 'message' }, (payload) => {
            setMessages((prev) => [...prev, payload.payload as ChatMessage]);
        });

        // Listen for online user presence
        channel
            .on('presence', { event: 'sync' }, () => {
                const newState = channel.presenceState();
                const usersMap = new Map<string, OnlineUser>();
                
                for (const id in newState) {
                    const presences = newState[id] as unknown as { userId: string, name: string, avatar: string | null }[];
                    if (presences.length > 0) {
                        const presence = presences[0];
                        usersMap.set(presence.userId, {
                            id: presence.userId,
                            name: presence.name,
                            avatar: presence.avatar
                        });
                    }
                }
                setOnlineUsers(Array.from(usersMap.values()));
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({
                        userId: user.id,
                        name: profile.full_name || 'Kullanıcı',
                        avatar: profile.avatar_url,
                        onlineAt: new Date().toISOString()
                    });
                }
            });

        return () => {
            channel.unsubscribe();
        };
    }, [user, profile]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !profile || !channelRef.current) return;

        const msgText = newMessage.trim();
        setNewMessage(''); // optimistic clear

        const myMessage: ChatMessage = {
            id: Date.now().toString() + Math.random().toString(36).substring(7),
            text: msgText,
            senderId: user.id,
            senderName: profile.full_name || 'Kullanıcı',
            senderAvatar: profile.avatar_url,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isBot: false,
        };

        // Render locally immediately
        setMessages((prev) => [...prev, myMessage]);

        // Broadcast to others
        await channelRef.current.send({
            type: 'broadcast',
            event: 'message',
            payload: myMessage,
        });

        // Check for bot trigger
        const isBotTriggered = msgText.toLowerCase().includes('@workigom') || msgText.toLowerCase().includes('/workigom');
        
        if (isBotTriggered) {
            setIsBotTyping(true);
            try {
                const { data, error } = await supabase.functions.invoke('gemini-bot', {
                    body: { message: msgText, user_name: profile.full_name }
                });

                if (error) {
                    console.error("Supabase Edge Function Error:", error);
                    throw error;
                }

                // Check if the response contains an error from the Gemini API
                if (data?.error) {
                    console.error("Gemini API Error:", data.error, data.detail);
                }

                const botReply = data?.response || data?.error || "Sanırım sistemlerimde bir arıza var...";

                const botMessage: ChatMessage = {
                    id: Date.now().toString() + '-bot',
                    text: botReply,
                    senderId: 'bot-1',
                    senderName: 'Workigom AI',
                    senderAvatar: null,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isBot: true,
                };

                // Add to local state
                setMessages((prev) => [...prev, botMessage]);
                
                // Broadcast bot reply so others see it
                await channelRef.current.send({
                    type: 'broadcast',
                    event: 'message',
                    payload: botMessage,
                });
            } catch (err) {
                console.error("Bot error details:", err);
                const errorMessage: ChatMessage = {
                    id: Date.now().toString() + '-err',
                    text: "Bağlantı hatası oluştu, Workigom AI'a ulaşılamıyor.",
                    senderId: 'bot-1',
                    senderName: 'Workigom AI',
                    senderAvatar: null,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isBot: true,
                }
                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsBotTyping(false);
            }
        }
    };

    return (
        <div className="flex h-[calc(100vh-70px)] md:h-screen w-full flex-col bg-[#0B132B] md:rounded-none overflow-hidden border-none shadow-2xl animate-in fade-in duration-500">
            <style>{`
                .glass-panel-chat {
                    background: rgba(28, 37, 65, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .neon-border-pink {
                    box-shadow: 0 0 10px rgba(255, 0, 127, 0.3);
                    border: 1px solid rgba(255, 0, 127, 0.5);
                }
                .chat-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .chat-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .chat-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 255, 255, 0.2);
                    border-radius: 10px;
                }
            `}</style>
            
            {/* Top Navigation Bar */}
            <header className="flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#1C2541]/50 px-4 md:px-6 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.5)]">
                            <Hash className="text-white" size={20} />
                        </div>
                        <h1 className="hidden text-xl font-bold tracking-tight text-white sm:block">NEON<span className="text-[#FF007F]">CHAT</span></h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/app/notifications" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#FF007F] transition-all relative">
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#1C2541]">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </Link>
                    <div className="md:hidden flex items-center justify-center h-10 w-10 bg-white/5 rounded-xl text-slate-300">
                        <Users size={18} />
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex flex-1 overflow-hidden relative">
                {/* Chat Flow Section */}
                <section className="flex flex-1 flex-col bg-[#0B132B]/50 relative z-10">
                    {/* Messages List */}
                    <div className="chat-scrollbar flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                        {/* System Message */}
                        <div className="flex justify-center">
                            <span className="rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-white/5 text-center shadow-sm">
                                Şifreli oturuma hoş geldiniz. Realtime WebSocket Aktif.
                            </span>
                        </div>

                        {messages.map((msg) => {
                            const isMe = msg.senderId === user?.id;

                            if (msg.isBot) {
                                return (
                                    <div key={msg.id} className="flex items-start gap-3 md:gap-4 animate-in slide-in-from-left-4 duration-300">
                                        <div className="h-10 w-10 shrink-0 rounded-2xl bg-[#0a0b1e] border border-[#FF007F]/50 flex items-center justify-center text-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.3)] text-xl">
                                            🤖
                                        </div>
                                        <div className="flex flex-col gap-1 w-full max-w-[85%] md:max-w-md">
                                            <div className="flex items-center gap-2 px-1">
                                                <span className="text-xs font-bold text-[#FF007F]">{msg.senderName}</span>
                                                <span className="flex items-center gap-1 rounded bg-[#FF007F]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#FF007F]">AI</span>
                                                <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                                            </div>
                                            <div className="glass-panel-chat rounded-2xl rounded-tl-none px-4 py-2.5 text-xs leading-relaxed text-slate-100 border-[#FF007F]/20 shadow-md">
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={msg.id} className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} items-start gap-3 md:gap-4 animate-in slide-in-from-bottom-2 duration-300`}>
                                    <div 
                                        className={`h-10 w-10 shrink-0 rounded-2xl bg-cover bg-center border ${isMe ? 'border-[#FF007F]/30' : 'border-[#00FFFF]/30'} bg-[#1C2541] flex items-center justify-center font-bold text-white uppercase`}
                                        style={{ backgroundImage: msg.senderAvatar ? `url(${msg.senderAvatar})` : 'none' }}>
                                        {!msg.senderAvatar && msg.senderName.substring(0, 2)}
                                    </div>
                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1 w-full max-w-[85%] md:max-w-md`}>
                                        <div className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} items-center gap-2 px-1`}>
                                            <span className={`text-xs font-bold ${isMe ? 'text-[#FF007F]' : 'text-[#00FFFF]'}`}>{msg.senderName}</span>
                                            <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                                        </div>
                                        <div className={`${isMe ? 'bg-[#FF007F] text-white rounded-tr-none shadow-[0_0_15px_rgba(255,0,127,0.2)]' : 'glass-panel-chat text-slate-100 rounded-tl-none shadow-md'} rounded-2xl px-4 py-2.5 text-xs leading-relaxed`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {isBotTyping && (
                            <div className="flex items-start gap-3 md:gap-4 animate-pulse">
                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-[#0a0b1e] border border-[#FF007F]/50 flex items-center justify-center text-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.3)] text-xl">
                                    🤖
                                </div>
                                <div className="flex items-center bg-[#1C2541]/70 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5">
                                    <span className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input Section */}
                    <div className="p-4 md:p-6 bg-[#0B132B]/80 backdrop-blur-md">
                        <form onSubmit={handleSendMessage} className="glass-panel-chat neon-border-pink relative flex items-center gap-2 rounded-2xl p-1.5 pr-1.5 focus-within:ring-1 focus-within:ring-[#FF007F]/50 transition-all bg-[#1C2541]">
                            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-[#00FFFF]">
                                <Smile size={20} />
                            </button>
                            <input 
                                className="flex-1 border-none bg-transparent py-2.5 px-2 text-[14px] text-white placeholder:text-white/30 focus:ring-0 outline-none" 
                                placeholder="Workigom AI'ı çağırmak için konuşmanın başına @workigom yazın..." 
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button 
                                type="submit"
                                disabled={!newMessage.trim()} 
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF007F] text-white shadow-[0_0_15px_rgba(255,0,127,0.4)] transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                <Send size={18} className="translate-x-0.5" />
                            </button>
                        </form>
                    </div>
                </section>

                {/* Sidebar: User List */}
                <aside className="hidden w-64 lg:w-72 flex-col border-l border-white/10 bg-[#1C2541]/30 md:flex z-20">
                    <div className="flex h-14 items-center border-b border-white/10 px-6 shrink-0 bg-[#0B132B]/50">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14] animate-pulse"></span>
                            Online — {onlineUsers.length}
                        </h3>
                    </div>
                    <div className="chat-scrollbar flex-1 overflow-y-auto p-4 space-y-6">
                        
                        {/* Bot Group */}
                        <div>
                            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Droids</p>
                            <div className="space-y-1">
                                <div className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5 cursor-pointer">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-xl bg-[#0a0b1e] border border-[#FF007F]/30 flex items-center justify-center text-xl">
                                            🤖
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#1C2541] bg-[#39FF14]"></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-semibold text-[#FF007F]">Workigom AI</span>
                                        </div>
                                        <span className="text-[9px] text-slate-400">Her zaman aktif</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Users Group */}
                        <div>
                            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Citizens</p>
                            <div className="space-y-1">
                                {onlineUsers.map(ou => (
                                    <div key={ou.id} className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5 cursor-pointer opacity-90 hover:opacity-100">
                                        <div className="relative">
                                            <div 
                                                className="h-10 w-10 rounded-xl bg-cover bg-center border border-white/10 bg-[#1C2541] flex items-center justify-center font-bold text-slate-300 uppercase" 
                                                style={{ backgroundImage: ou.avatar ? `url(${ou.avatar})` : 'none' }}>
                                                {!ou.avatar && ou.name.substring(0, 2)}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#1C2541] bg-[#39FF14]"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-200">{ou.id === user?.id ? (ou.name + ' (Siz)') : ou.name}</span>
                                            <span className="text-[9px] text-slate-500">Online</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </aside>
            </main>
        </div>
    );
};

export default Muhabbet;
