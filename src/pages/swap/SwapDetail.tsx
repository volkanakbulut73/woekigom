import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Star, MapPin, MessageSquare, Trash2 } from 'lucide-react';
import { SwapService, MessageService } from '../../lib/services';
import { supabase } from '../../lib/supabase';
import type { SwapListing } from '../../types';

const SwapDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [listing, setListing] = useState<SwapListing | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [startingChat, setStartingChat] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

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
            } catch (err) {
                console.error('Error fetching detail:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

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

    const handleStartChat = async () => {
        if (!user || !listing || !id) return;
        setStartingChat(true);

        try {
            // Find or create thread
            const thread = await MessageService.findOrCreateThread(id, user.id, listing.owner_id, 'market');
            
            // If this is a brand new thread (no last message), auto-send an initial message
            if (!thread.last_message) {
                await MessageService.sendMessage(
                    thread.id, 
                    user.id, 
                    listing.owner_id, 
                    "Merhaba, ilanınız hala satılık mı detayları öğrenebilir miyim?"
                );
            }

            // Navigate to the unified messages page for this thread
            navigate(`/app/messages/${thread.id}`);
        } catch (err) {
            console.error('Error starting chat:', err);
            alert('Mesajlaşma başlatılamadı.');
        } finally {
            setStartingChat(false);
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

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/app/market')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#16172d] border border-white/5 text-slate-300 hover:text-[#39ff14] transition-colors shrink-0">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-white tracking-wide">İlan Detayı</h2>
            </div>

            <div className="bg-[#16172d] border border-white/5 rounded-3xl overflow-hidden shadow-xl shrink-0">
                <div className="relative h-64 lg:h-96 w-full bg-[#0a0b1e] flex items-center justify-center overflow-hidden border-b border-white/5">
                    {mainPhoto ? (
                        <img src={mainPhoto} alt={listing.title} className="w-full h-full object-contain" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-t from-[#0a0b1e] to-[#16172d] relative flex items-center justify-center">
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
                                <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                <div className="p-6 lg:p-8 space-y-8">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-2xl lg:text-4xl font-black text-white">{listing.title}</h1>
                            <p className="text-[#39ff14] font-black text-2xl lg:text-4xl">₺{Number(listing.required_balance).toLocaleString('tr-TR')}</p>
                        </div>
                        <div className="flex items-center gap-1 text-cyan-400 text-sm font-semibold">
                            <MapPin size={16} />
                            {listing.location || 'Konum belirtilmedi'}
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/5 border-t border-white/5"></div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Açıklama</h3>
                        <p className="text-slate-300 text-sm lg:text-base leading-relaxed whitespace-pre-wrap">
                            {listing.description || 'Bu ilan için açıklama girilmemiş.'}
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 bg-[#0a0b1e] p-5 rounded-2xl border border-white/5 flex-wrap shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full border border-[#39ff14]/30 overflow-hidden shrink-0">
                                <img src={sellerAvatar} alt={sellerName} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Satıcı</p>
                                <p className="text-white font-bold text-base">{sellerName}</p>
                            </div>
                        </div>
                        {isOwner ? (
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 size={18} />
                                {deleting ? 'Siliniyor...' : 'İlanı Sil'}
                            </button>
                        ) : (
                            <button
                                onClick={handleStartChat}
                                disabled={startingChat}
                                className="px-8 py-3.5 bg-[#39ff14] text-[#0a0b1e] border border-[#39ff14]/50 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#39ff14]/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {startingChat ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0a0b1e]"></div>
                                ) : (
                                    <>
                                        <MessageSquare size={20} />
                                        Mesaj Gönder
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwapDetail;
