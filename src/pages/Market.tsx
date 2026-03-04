import { Search, MapPin, SlidersHorizontal, Star } from 'lucide-react';
import { useState } from 'react';

const MARKET_ITEMS = [
    {
        id: 1,
        title: "500 TL Bakiye",
        desc: "Açıklama: Nakit / Kripto Takas",
        brand: "MULTINET",
        seller: "@Cyber_Tr",
        price: 450.00,
        rating: 4.9,
        imgColor: "bg-slate-200"
    },
    {
        id: 2,
        title: "Yemek Paketi x5",
        desc: "Açıklama: Anında Onaylı",
        brand: "SODEXO",
        seller: "@Neo_Alice",
        price: 245.00,
        rating: 5.0,
        imgColor: "bg-blue-900"
    },
    {
        id: 3,
        title: "1000 TL Limitli",
        desc: "Açıklama: Hızlı Transfer",
        brand: "SETCARD",
        seller: "@Dev_Lord",
        price: 910.00,
        rating: 4.7,
        imgColor: "bg-stone-900"
    },
    {
        id: 4,
        title: "200 TL Kredi",
        desc: "Açıklama: Doğrulanmış Hesap",
        brand: "TICKET",
        seller: "@Market_Pro",
        price: 184.00,
        rating: 4.8,
        imgColor: "bg-teal-900"
    },
    {
        id: 5,
        title: "350 TL Bakiye",
        desc: "Açıklama: Güvenli Ödeme",
        brand: "METROPOL",
        seller: "@Trade_Master",
        price: 310.00,
        rating: 4.9,
        imgColor: "bg-slate-800"
    }
];

const Market = () => {
    const [activeTab, setActiveTab] = useState('Pazar');
    const [activeFilter, setActiveFilter] = useState('Tüm İlanlar');

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
                {MARKET_ITEMS.map((item) => (
                    <div key={item.id} className="bg-[#16172d] border border-white/5 rounded-3xl overflow-hidden shadow-lg group hover:border-[#39ff14]/30 transition-colors flex flex-col">
                        {/* Image Section */}
                        <div className={`relative h-48 w-full p-4 flex flex-col justify-end overflow-hidden ${item.imgColor}`}>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#16172d] via-transparent to-transparent z-0 opacity-80"></div>

                            {/* Dummy Image Placeholder */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl">
                                <span className="font-black text-white/20 text-4xl">{item.brand[0]}</span>
                            </div>

                            {/* Rating */}
                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 z-10">
                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-white font-bold text-xs">{item.rating}</span>
                            </div>

                            <span className="font-extrabold text-cyan-400 text-sm tracking-wider uppercase z-10">{item.brand}</span>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-slate-400 text-xs mb-4">{item.desc}</p>

                            <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shrink-0">
                                        <img src={`https://ui-avatars.com/api/?name=${item.seller.replace('@', '')}&background=random&color=fff`} alt={item.seller} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">Satıcı</p>
                                        <p className="text-white text-xs font-bold">{item.seller}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">Fiyat</p>
                                    <p className="text-cyan-400 font-extrabold text-lg">₺{item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Market;
