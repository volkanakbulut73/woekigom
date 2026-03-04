import { Search, MapPin, SlidersHorizontal, Star, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SwapService } from '../lib/services';
import { useAuth } from '../context/AuthContext';
import type { SwapListing } from '../types';

const Market = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('Pazar');
    const [activeFilter, setActiveFilter] = useState('Tüm İlanlar');
    const [listings, setListings] = useState<SwapListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const data = await SwapService.getListings();
                setListings(data as SwapListing[]);
            } catch (err) {
                console.error("Error fetching listings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    // Filter listings based on tab. 
    // "Pazar" -> All listings
    // "İlanlarım" -> Only current user's listings
    const displayListings = activeTab === 'İlanlarım'
        ? listings.filter(item => item.owner_id === user?.id)
        : listings;

    return (
        <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
            {/* Search Bar */}
            <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Ürün, marka veya kategori ara..."
                    className="w-full bg-[#16172d] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#39ff14]/40 transition-colors placeholder:text-slate-500"
                />
            </div>

            {/* Main Tabs & Filters Container */}
            <div className="flex flex-col gap-4 bg-[#16172d] p-4 rounded-3xl border border-white/5">
                {/* Pazar / İlanlarım Tab */}
                <div className="flex w-full bg-[#0a0b1e] rounded-xl p-1 border border-white/5">
                    <button
                        onClick={() => setActiveTab('Pazar')}
                        className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 rounded-lg transition-all ${activeTab === 'Pazar'
                            ? 'bg-white text-[#0a0b1e] shadow-md'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Pazar
                    </button>
                    <button
                        onClick={() => setActiveTab('İlanlarım')}
                        className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 rounded-lg transition-all ${activeTab === 'İlanlarım'
                            ? 'bg-white text-[#0a0b1e] shadow-md'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        İlanlarım
                    </button>
                </div>

                {/* Filtrele & Konum */}
                <div className="flex gap-3">
                    <button className="flex-1 py-3 px-4 rounded-xl border border-[#39ff14]/30 flex items-center justify-center gap-2 text-[#39ff14] font-bold text-sm bg-[#39ff14]/5 hover:bg-[#39ff14]/10 transition-colors">
                        <SlidersHorizontal size={18} />
                        Filtrele
                    </button>
                    <button className="flex-1 py-3 px-4 rounded-xl border border-white/10 flex items-center justify-between text-white font-semibold text-sm bg-[#0a0b1e] hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-2 text-cyan-400">
                            <MapPin size={18} />
                            <span className="text-white">Konum</span>
                        </div>
                        <span className="text-slate-500 text-xs text-right">⌄</span>
                    </button>
                </div>
            </div>

            {/* Pill Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {['Tüm İlanlar', 'Yemek Kartları', 'Hediye Kartları', 'Kuponlar'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeFilter === filter
                            ? 'bg-cyan-400 text-[#0a0b1e]'
                            : 'border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 gap-4 mt-2">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-slate-500 font-bold">İlanlar yükleniyor...</div>
                ) : displayListings.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-slate-500 font-bold">Burada henüz hiç ilan yok.</div>
                ) : displayListings.map((item) => (
                    <Link key={item.id} to={`/app/market/${item.id}`} className="bg-[#16172d] border border-white/5 rounded-3xl overflow-hidden shadow-lg group hover:border-[#39ff14]/30 transition-colors flex flex-col relative">
                        {/* Image Section */}
                        <div className={`relative h-48 w-full p-4 flex flex-col justify-end overflow-hidden ${item.photo_url ? 'bg-slate-800' : 'bg-blue-900'}`}>
                            {item.photo_url ? (
                                <img src={item.photo_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                            ) : (
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#16172d] via-transparent to-transparent z-0 opacity-80"></div>
                            )}

                            {!item.photo_url && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl">
                                    <span className="font-black text-white/20 text-4xl">{item.title[0]}</span>
                                </div>
                            )}

                            {/* Rating */}
                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 z-10">
                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-white font-bold text-xs">{item.profiles?.rating || '5.0'}</span>
                            </div>

                            <span className="font-extrabold text-cyan-400 text-sm tracking-wider uppercase z-10">İLAN</span>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-slate-400 text-xs mb-4 line-clamp-2">{item.description || 'Açıklama bulunmuyor'}</p>

                            <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shrink-0">
                                        {item.profiles?.avatar_url ? (
                                            <img src={item.profiles.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={`https://ui-avatars.com/api/?name=${(item.profiles?.full_name || 'X').replace(' ', '+')}&background=random&color=fff`} alt={item.profiles?.full_name || 'S'} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">Satıcı</p>
                                        <p className="text-white text-xs font-bold max-w-[100px] truncate">{item.profiles?.full_name || 'Anonim Kullanıcı'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">Fiyat</p>
                                    <p className="text-cyan-400 font-extrabold text-lg">₺{Number(item.required_balance).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Floating Action Button */}
            <Link to="/app/market/create" className="fixed bottom-24 right-4 md:bottom-10 md:right-10 w-14 h-14 bg-[#0a0b1e] border border-[#39ff14]/20 rounded-full flex items-center justify-center text-[#39ff14] shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-40 transition-transform active:scale-95 hover:scale-105">
                <Plus size={28} />
            </Link>
        </div>
    );
};

export default Market;
