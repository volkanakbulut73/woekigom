import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Store, User as UserIcon, SlidersHorizontal, ChevronDown, SearchX, Plus, Home, Heart } from 'lucide-react';

const Market = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#0a0b1e] font-sans text-slate-100 min-h-screen flex justify-center">
            <div className="relative w-full max-w-[430px] h-[932px] overflow-hidden flex flex-col bg-[#0a0b1e] shadow-2xl border-x border-[#39ff14]/10">

                {/* Header */}
                <div className="pt-14 pb-6 px-5 bg-[#0a0b1e] rounded-b-[40px] z-10 shadow-none border-b border-[#39ff14]/20 relative">
                    {/* Cyber gradient glow */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#39ff14]/5 to-transparent pointer-events-none rounded-b-[40px]"></div>

                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#39ff14] transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="flex-1 relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#39ff14]/50 group-focus-within:text-[#39ff14]" size={20} />
                            <input
                                className="w-full h-10 pl-10 pr-4 bg-[#16172d] border border-white/10 rounded-full text-sm placeholder:text-slate-500 focus:ring-1 focus:ring-[#39ff14] focus:border-[#39ff14] text-white transition-all outline-none"
                                placeholder="Ürün, marka veya kategori ara..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="p-1 mb-6 rounded-xl bg-white/5 backdrop-blur-md flex border border-white/10 relative z-10">
                        <button className="flex-1 py-2 text-sm font-semibold rounded-lg bg-[#39ff14] text-[#0a0b1e] shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all flex items-center justify-center gap-2">
                            <Store size={18} />
                            Pazar
                        </button>
                        <button className="flex-1 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <UserIcon size={18} />
                            İlanlarım
                        </button>
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 relative z-10">
                        <button className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#16172d] text-[#39ff14] border border-[#39ff14]/30 rounded-xl text-sm font-semibold shadow-lg shadow-[#39ff14]/10 hover:bg-[#39ff14]/10 transition-colors">
                            <SlidersHorizontal size={16} />
                            Filtrele
                        </button>
                        <button className="flex-shrink-0 flex items-center gap-1 px-4 py-2 bg-[#16172d] border border-white/10 text-slate-300 rounded-xl text-sm font-medium hover:border-[#39ff14]/30 transition-colors">
                            Sırala
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex-shrink-0 flex items-center gap-1 px-4 py-2 bg-[#16172d] border border-white/10 text-slate-300 rounded-xl text-sm font-medium hover:border-[#39ff14]/30 transition-colors">
                            Konum
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                <main className="flex-1 px-5 pt-6 bg-transparent overflow-y-auto pb-32 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-200 tracking-tight">Vitrin Ürünleri</h2>
                        <button className="text-sm font-bold text-[#39ff14] hover:opacity-80 transition-opacity uppercase tracking-widest">Yenile</button>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-10 flex flex-col items-center justify-center text-center space-y-4 shadow-sm border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#39ff14]/5 to-transparent pointer-events-none"></div>
                        <div className="w-16 h-16 rounded-full bg-[#16172d] flex items-center justify-center mb-2 border border-[#39ff14]/20 relative z-10">
                            <SearchX className="text-slate-400" size={32} />
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed relative z-10">
                            Aradığınız kriterlere uygun ilan bulunamadı.
                        </p>
                        <button className="text-[#39ff14] font-bold text-sm tracking-wide uppercase hover:underline relative z-10">
                            Aramayı Temizle
                        </button>
                    </div>
                </main>

                <Link to="/app/market/create" className="absolute bottom-28 right-6 w-14 h-14 bg-[#39ff14] text-[#0a0b1e] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.5)] ring-4 ring-[#0a0b1e] transition-transform hover:scale-105 active:scale-95 z-20">
                    <Plus size={32} />
                </Link>

                <nav className="absolute bottom-0 left-0 right-0 h-24 bg-[#16172d]/90 backdrop-blur-xl border-t border-[#39ff14]/20 flex items-start pt-4 px-8 justify-between z-30">
                    <Link to="/app" className="flex flex-col items-center gap-1 text-[#39ff14]">
                        <Home size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Ana Sayfa</span>
                    </Link>
                    <Link to="/app/talepler" className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <Heart size={24} />
                        <span className="text-[10px] font-medium uppercase tracking-wider">Talepler</span>
                    </Link>
                    <Link to="/app/profile" className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <UserIcon size={24} />
                        <span className="text-[10px] font-medium uppercase tracking-wider">Profil</span>
                    </Link>
                </nav>

                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#39ff14]/50 rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)] z-40"></div>
            </div>
        </div>
    );
};

export default Market;
