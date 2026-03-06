import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowRightLeft, Landmark, Activity, CreditCard, Gift, Send, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/slider1.png',
            title: 'Birlikte Paylaş, \nDaha Fazla Kazan!',
            description: 'Yemek kartı bakiyeni paylaş sosyal ağını güçlendir.',
            buttonText: 'Hemen Başla'
        },
        {
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
            title: 'Hızlı ve Güvenli \nQR Takas',
            description: 'Saniyeler içinde eşleş, QR ile hesabını öde ve anında kazan.',
            buttonText: 'İşlemleri Gör'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500">
            {/* Banner Section - Slider */}
            <section className="relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(57,255,20,0.15)] flex flex-col justify-center min-h-[260px] md:min-h-[300px] group">
                {/* Slides */}
                <div
                    className="flex h-full w-full transition-transform duration-700 ease-in-out absolute inset-0"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="min-w-full h-full relative flex-shrink-0">
                            {/* Background Image */}
                            <div className="absolute inset-0 w-full h-full bg-slate-900 border border-slate-800/50 rounded-[24px] md:rounded-[32px] overflow-hidden">
                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover md:object-contain md:object-right" />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full max-w-xl h-full flex flex-col justify-center p-6 md:p-10">
                                {index === 0 && (
                                    <div className="inline-block self-start bg-[#39ff14]/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#39ff14] uppercase tracking-widest mb-4 border border-[#39ff14]/20 shadow-sm">
                                        Yeni Referans Sistemi
                                    </div>
                                )}
                                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-4 tracking-tight leading-tight whitespace-pre-line drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-slate-200 text-sm md:text-base mb-6 md:mb-8 max-w-sm md:max-w-md font-medium drop-shadow-md">
                                    {slide.description}
                                </p>
                                <button className="self-start bg-[#39ff14] text-[#0a0b1e] hover:bg-[#39ff14]/90 px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all active:scale-95 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]">
                                    {slide.buttonText}
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-20"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-20"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-6 bg-[#39ff14]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                        />
                    ))}
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
