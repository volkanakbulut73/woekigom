import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Star, MapPin, Send, MessageSquare, Trash2 } from 'lucide-react';
import { SwapService } from '../../lib/services';
import { supabase } from '../../lib/supabase';
import type { SwapListing } from '../../types';

interface Message {
    id: string;
    swap_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
    sender?: {
        full_name: string;
        avatar_url: string;
    };
}

const SwapDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, profile } = useAuth();
    const [listing, setListing] = useState<SwapListing | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            try {
                // Fetch Listing
                const { data: listingData, error: listingError } = await supabase
                    .from('swap_listings')
                    .select('*, profiles(full_name, avatar_url, rating)')
                    .eq('id', id)
                    .single();

                if (listingError) throw listingError;
                setListing(listingData as SwapListing);

                // Fetch Messages related to this swap and current user
                const { data: messagesData, error: messagesError } = await supabase
                    .from('messages')
                    .select('*, sender:profiles!messages_sender_id_fkey(full_name, avatar_url)')
                    .eq('swap_id', id)
                    .order('created_at', { ascending: true });

                if (messagesError && messagesError.code !== '42P01') {
                    console.error(messagesError);
                } else if (messagesData) {
                    setMessages(messagesData as Message[]);
                }
            } catch (err) {
                console.error('Error fetching detail:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();

        const pollInterval = setInterval(async () => {
            if (!id) return;
            const { data } = await supabase
                .from('messages')
                .select('*, sender:profiles!messages_sender_id_fkey(full_name, avatar_url)')
                .eq('swap_id', id)
                .order('created_at', { ascending: true });

            if (data) {
                setMessages(data as Message[]);
            }
        }, 3000);

        const subscription = supabase
            .channel(`messages-${id}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `swap_id=eq.${id}` }, (payload) => {
                setMessages((prev) => [...prev, payload.new as Message]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
            clearInterval(pollInterval);
        };
    }, [id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleDelete = async () => {
        if (!listing || !window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) return;

        setDeleting(true);
        try {
            await SwapService.deleteListing(listing.id);
            navigate('/app/market', { replace: true });
        } catch (err) {
            console.error(err);
            alert('İlan silinirken bir hata oluştu.');
            setDeleting(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !listing || !id) return;

        const receiverId = listing.owner_id === user.id
            ? (messages.find(m => m.sender_id !== user.id)?.sender_id || listing.owner_id)
            : listing.owner_id;

        const messageObj = {
            swap_id: id,
            sender_id: user.id,
            receiver_id: receiverId,
            content: newMessage.trim()
        };

        try {
            const tempMessage = {
                ...messageObj,
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                sender: {
                    full_name: profile?.full_name || 'Ben',
                    avatar_url: profile?.avatar_url || ''
                }
            };
            setMessages(prev => [...prev, tempMessage as Message]);
            setNewMessage('');

            const { error } = await supabase.from('messages').insert([messageObj]);
            if (error) {
                if (error.code === '42P01') {
                    console.warn("Messages table does not exist. UI demo working.");
                } else {
                    throw error;
                }
            }
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#39ff14]"></div></div>;
    }

    if (!listing) {
        return <div className="p-10 text-center text-white font-bold">İlan bulunamadı!</div>;
    }

    const isOwner = user?.id === listing.owner_id;
    const sellerInfo = listing.profiles as { full_name?: string; avatar_url?: string; rating?: number } | undefined;
    const sellerName = sellerInfo?.full_name || 'Anonim Kullanıcı';
    const sellerAvatar = sellerInfo?.avatar_url || `https://ui-avatars.com/api/?name=${sellerName.replace(' ', '+')}&background=random&color=fff`;

    const photoUrls = listing.photo_url ? listing.photo_url.split(',') : [];
    const mainPhoto = photoUrls.length > 0 ? photoUrls[activeImageIndex] : null;

    const formatName = (fullName?: string) => {
        if (!fullName) return 'Anonim';
        const parts = fullName.trim().split(' ');
        if (parts.length === 1) return parts[0];
        const last = parts.pop();
        return `${parts.join(' ')} ${last?.charAt(0)}.`;
    };

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 pb-20 lg:pb-10 lg:h-[calc(100vh-100px)]">
            {/* Left/Top Content: Detail */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/app/market')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#16172d] border border-white/5 text-slate-300 hover:text-[#39ff14] transition-colors shrink-0">
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-xl font-bold text-white tracking-wide">İlan Detayı</h2>
                </div>

                <div className="bg-[#16172d] border border-white/5 rounded-3xl overflow-hidden shadow-xl shrink-0">
                    <div className="relative h-64 lg:h-80 w-full bg-slate-800 flex items-center justify-center overflow-hidden">
                        {mainPhoto ? (
                            <img src={mainPhoto} alt={listing.title} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-t from-[#0a0b1e] to-blue-900/40 relative flex items-center justify-center">
                                <span className="text-6xl text-white/10 font-black">{listing.title[0]}</span>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-lg">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-white font-bold text-sm">{sellerInfo?.rating || '5.0'}</span>
                        </div>
                    </div>

                    {photoUrls.length > 1 && (
                        <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar bg-[#0a0b1e]/50 border-b border-white/5">
                            {photoUrls.map((url, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${activeImageIndex === idx ? 'border-[#39ff14] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                >
                                    <img src={url} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="p-6 lg:p-8 space-y-6">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h1 className="text-2xl lg:text-3xl font-black text-white">{listing.title}</h1>
                                <p className="text-[#39ff14] font-black text-2xl lg:text-3xl">₺{Number(listing.required_balance).toLocaleString('tr-TR')}</p>
                            </div>
                            <div className="flex items-center gap-1 text-cyan-400 text-sm font-semibold">
                                <MapPin size={16} />
                                {listing.location || 'Konum belirtilmedi'}
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/5"></div>

                        <p className="text-slate-300 text-sm lg:text-base leading-relaxed whitespace-pre-wrap">
                            {listing.description || 'Bu ilan için açıklama girilmemiş.'}
                        </p>

                        <div className="flex items-center justify-between gap-4 bg-[#0a0b1e] p-4 rounded-2xl border border-white/5 flex-wrap">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden shrink-0">
                                    <img src={sellerAvatar} alt={sellerName} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Satıcı Profil</p>
                                    <p className="text-white font-bold text-sm">{sellerName}</p>
                                </div>
                            </div>
                            {isOwner ? (
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
                                >
                                    <Trash2 size={16} />
                                    {deleting ? 'Siliniyor...' : 'İlanı Sil'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate(`/app/market/messages/${listing.id}`)}
                                    className="px-6 py-2.5 bg-[#39ff14] text-[#0a0b1e] border border-[#39ff14]/50 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#39ff14]/90 hover:scale-105 transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                                >
                                    <MessageSquare size={16} />
                                    Mesaj Gönder
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right/Bottom Content: Chat */}
            <div className="w-full lg:w-1/2 flex flex-col bg-[#16172d] border border-white/5 rounded-3xl overflow-hidden shadow-xl h-[500px] lg:h-full shrink-0">
                <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-[#0a0b1e]/50 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/10 flex items-center justify-center shrink-0">
                        <MessageSquare size={18} className="text-[#39ff14]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">
                            {isOwner ? 'Gelen Mesajlar' : `${sellerName} ile Sohbet`}
                        </h3>
                        <p className="text-[10px] text-[#39ff14] uppercase tracking-widest font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse"></span> Canlı Sohbet
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3 opacity-60">
                            <MessageSquare size={40} className="text-slate-600" />
                            <p className="text-sm font-bold">Henüz hiç mesaj yok.</p>
                            <p className="text-xs">{(isOwner) ? 'Müşteriler mesaj attığında burada görünecek.' : 'İlk mesajı siz gönderin!'}</p>
                        </div>
                    ) : (
                        messages.map((msg, idx) => {
                            const isMe = msg.sender_id === user?.id;
                            const dName = isMe ? 'Ben' : formatName(msg.sender?.full_name);
                            const dAvatar = isMe ? profile?.avatar_url : msg.sender?.avatar_url;
                            const avatarUrl = dAvatar || `https://ui-avatars.com/api/?name=${dName.replace(' ', '+')}&background=random&color=fff`;

                            return (
                                <div key={msg.id || idx} className={`flex w-full gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    {!isMe && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto opacity-80">
                                            <img src={avatarUrl} alt={dName} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex flex-col max-w-[75%]">
                                        {!isMe && <span className="text-[10px] text-slate-400 ml-1 mb-1">{dName}</span>}
                                        <div className={`rounded-2xl px-4 py-3 text-sm shadow-md ${isMe
                                            ? 'bg-[#39ff14] text-[#0a0b1e] rounded-br-sm font-medium'
                                            : 'bg-slate-800 border border-white/5 text-slate-200 rounded-bl-sm'
                                            }`}>
                                            {msg.content}
                                            <div className={`text-[9px] mt-1 text-right ${isMe ? 'text-[#0a0b1e]/60' : 'text-slate-400'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    {isMe && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto opacity-80">
                                            <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=Ben&background=39ff14&color=000`} alt="Ben" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-white/5 bg-[#0a0b1e]/30">
                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Bir mesaj yazın..."
                            className="w-full bg-[#16172d] border border-white/10 rounded-full py-3.5 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-[#39ff14]/50 transition-colors placeholder:text-slate-500"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#39ff14] text-[#0a0b1e] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#39ff14]/90 transition-colors shadow-lg"
                        >
                            <Send size={16} className="-ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SwapDetail;
