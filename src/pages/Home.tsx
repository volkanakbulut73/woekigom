import { Link } from 'react-router-dom';
import { ArrowRight, ArrowRightLeft, Landmark, Activity, CreditCard, Gift, Send, Trophy } from 'lucide-react';

const Home = () => {

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500">
            {/* Banner Section */}
            <section className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-[#39ff14]/80 rounded-[24px] md:rounded-[32px] p-6 md:p-10 relative overflow-hidden shadow-[0_10px_40px_rgba(57,255,20,0.15)] flex flex-col justify-center min-h-[200px] md:min-h-[240px]">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-10 w-64 h-64 bg-white/20 blur-3xl rounded-full pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-xl">
                    <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4 border border-white/20 shadow-sm">
                        Yenİ ÖZellİk: Hızlı Takas
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-4 tracking-tight leading-tight mix-blend-overlay">
                        Birlikte Paylaş, <br className="hidden md:block" /> Daha Fazla Kazan!
                    </h2>
                    <p className="text-white/90 text-sm md:text-base mb-6 md:mb-8 max-w-sm md:max-w-md font-medium">
                        Yemek kartı bakiyeni paylaş sosyal ağını güçlendir. Geleceğin finansı burada.
                    </p>
                    <button className="bg-white text-indigo-900 hover:bg-slate-100 px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all active:scale-95 shadow-xl hover:shadow-2xl">
                        Hemen Başla
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Card 1 */}
                <div className="bg-[#16172d] border border-white/5 p-6 rounded-[24px] shadow-lg relative overflow-hidden group hover:border-[#39ff14]/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#39ff14]/5 rounded-full blur-2xl group-hover:bg-[#39ff14]/10 transition-colors"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[#0a0b1e] border border-[#39ff14]/20 flex items-center justify-center">
                            <Landmark className="text-[#39ff14]" size={24} />
                        </div>
                        <span className="text-[#39ff14] text-xs font-bold">+12%</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-slate-500 text-xs font-semibold mb-1">Toplam Tasarruf</p>
                        <p className="text-3xl font-extrabold text-white tracking-tight">₺1,450.00</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#16172d] border border-white/5 p-6 rounded-[24px] shadow-lg relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[#0a0b1e] border border-indigo-500/20 flex items-center justify-center">
                            <ArrowRightLeft className="text-indigo-400" size={24} />
                        </div>
                        <span className="text-indigo-400 text-xs font-bold">24 Adet</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-slate-500 text-xs font-semibold mb-1">Toplam İşlem</p>
                        <p className="text-3xl font-extrabold text-white tracking-tight">42 İşlem</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#16172d] border border-white/5 p-6 rounded-[24px] shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[#0a0b1e] border border-blue-500/20 flex items-center justify-center">
                            <Activity className="text-blue-400" size={24} />
                        </div>
                        <span className="text-blue-400 text-xs font-bold">Aktif</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-slate-500 text-xs font-semibold mb-1">Katkı Payı</p>
                        <p className="text-3xl font-extrabold text-white tracking-tight">₺340.50</p>
                    </div>
                </div>
            </section>

            {/* Bottom Section: Transactions & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-4">

                {/* Son Islemler */}
                <section className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-bold text-lg md:text-xl text-white">Son İşlemler</h3>
                        <Link to="/app/market" className="text-sm font-bold text-[#39ff14] hover:underline">Tümünü Gör</Link>
                    </div>

                    <div className="bg-[#16172d] border border-white/5 rounded-[24px] overflow-hidden shadow-lg">
                        <div className="hidden md:grid grid-cols-4 gap-4 p-5 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            <div className="col-span-1">İşlem</div>
                            <div className="col-span-1">Tarih</div>
                            <div className="col-span-1 text-right">Miktar</div>
                            <div className="col-span-1 text-right">Durum</div>
                        </div>

                        <div className="divide-y divide-white/5 flex flex-col">
                            {/* Tx 1 */}
                            <div className="p-5 flex items-center justify-between md:grid md:grid-cols-4 md:gap-4 md:items-center hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4 col-span-1">
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                                        <CreditCard className="text-orange-500" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-white">Multinet Takas</p>
                                        <p className="text-[11px] text-slate-500">Market Alımı</p>
                                    </div>
                                </div>
                                <div className="hidden md:block text-slate-400 text-sm font-medium col-span-1">
                                    Bugün, 14:30
                                </div>
                                <div className="hidden md:block col-span-1 text-right">
                                    <span className="font-bold text-white text-base">₺450.00</span>
                                </div>
                                <div className="text-right md:flex justify-end items-center col-span-1">
                                    <span className="md:hidden font-bold text-white block mb-1">₺450.00</span>
                                    <span className="inline-block bg-[#39ff14]/10 text-[#39ff14] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#39ff14]/20">TAMAMLANDI</span>
                                </div>
                            </div>

                            {/* Tx 2 */}
                            <div className="p-5 flex items-center justify-between md:grid md:grid-cols-4 md:gap-4 md:items-center hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4 col-span-1">
                                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0">
                                        <Gift className="text-pink-500" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-white">Sodexo Paylaşım</p>
                                        <p className="text-[11px] text-slate-500">Grup Talebi</p>
                                    </div>
                                </div>
                                <div className="hidden md:block text-slate-400 text-sm font-medium col-span-1">
                                    Dün, 09:12
                                </div>
                                <div className="hidden md:block col-span-1 text-right">
                                    <span className="font-bold text-white text-base">₺120.00</span>
                                </div>
                                <div className="text-right md:flex justify-end items-center col-span-1">
                                    <span className="md:hidden font-bold text-white block mb-1">₺120.00</span>
                                    <span className="inline-block bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-3 py-1.5 rounded-full border border-yellow-500/20">BEKLEMEDE</span>
                                </div>
                            </div>

                            {/* Tx 3 */}
                            <div className="p-5 flex items-center justify-between md:grid md:grid-cols-4 md:gap-4 md:items-center hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4 col-span-1">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                        <Send className="text-blue-500" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-white">Nakit Çekim</p>
                                        <p className="text-[11px] text-slate-500">Banka Transferi</p>
                                    </div>
                                </div>
                                <div className="hidden md:block text-slate-400 text-sm font-medium col-span-1">
                                    02.03.2024
                                </div>
                                <div className="hidden md:block col-span-1 text-right">
                                    <span className="font-bold text-white text-base">₺1,200.00</span>
                                </div>
                                <div className="text-right md:flex justify-end items-center col-span-1">
                                    <span className="md:hidden font-bold text-white block mb-1">₺1,200.00</span>
                                    <span className="inline-block bg-[#39ff14]/10 text-[#39ff14] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#39ff14]/20">TAMAMLANDI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leaderboard */}
                <section className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-bold text-lg md:text-xl text-white">Liderlik Tablosu</h3>
                        <div className="w-5 h-5 rounded-full bg-slate-500/20 flex items-center justify-center text-slate-400 cursor-pointer hover:text-white transition-colors">
                            <span className="text-[10px] font-black">i</span>
                        </div>
                    </div>

                    <div className="bg-[#16172d] border border-white/5 rounded-[24px] p-6 shadow-lg flex flex-col gap-6">

                        {/* User 1 */}
                        <div className="flex items-center gap-4 relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-600 p-0.5 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                                <img alt="User" src="https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=fff&color=ea580c" className="w-full h-full rounded-[14px] object-cover" />
                            </div>
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 text-[#0a0b1e] font-black text-sm rounded-full border-2 border-[#16172d] flex items-center justify-center">1</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm text-white leading-tight mb-0.5">Ahmet Yılmaz</p>
                                <p className="text-[10px] text-slate-500 font-medium">12.4k Puan</p>
                            </div>
                            <Trophy size={18} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)] fill-yellow-400" />
                        </div>

                        {/* User 2 */}
                        <div className="flex items-center gap-4 relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-500 p-0.5 shadow-[0_0_15px_rgba(148,163,184,0.3)]">
                                <img alt="User" src="https://ui-avatars.com/api/?name=Selin+Demir&background=1e293b&color=fff" className="w-full h-full rounded-[14px] object-cover" />
                            </div>
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-300 text-[#0a0b1e] font-black text-sm rounded-full border-2 border-[#16172d] flex items-center justify-center">2</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm text-white leading-tight mb-0.5">Selin Demir</p>
                                <p className="text-[10px] text-slate-500 font-medium">10.1k Puan</p>
                            </div>
                            <Trophy size={18} className="text-slate-400 fill-slate-400" />
                        </div>

                        {/* User 3 */}
                        <div className="flex items-center gap-4 relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-700 p-0.5 shadow-[0_0_15px_rgba(234,88,12,0.3)]">
                                <img alt="User" src="https://ui-avatars.com/api/?name=Caner+Sahin&background=ea580c&color=fff" className="w-full h-full rounded-[14px] object-cover" />
                            </div>
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-orange-500 text-[#0a0b1e] font-black text-sm rounded-full border-2 border-[#16172d] flex items-center justify-center">3</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm text-white leading-tight mb-0.5">Caner Şahin</p>
                                <p className="text-[10px] text-slate-500 font-medium">8.9k Puan</p>
                            </div>
                            <Trophy size={18} className="text-orange-600 fill-orange-600" />
                        </div>

                        <button className="w-full mt-2 bg-transparent border border-white/5 hover:border-white/10 hover:bg-white/5 py-3 rounded-2xl text-[11px] font-bold text-slate-300 transition-colors uppercase tracking-wider">
                            Tüm Sıralama
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Home;
