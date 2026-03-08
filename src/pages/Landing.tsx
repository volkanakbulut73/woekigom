import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="bg-[#102216] font-sans text-slate-100 antialiased overflow-x-hidden min-h-screen dark">
            <style>{`
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .text-gradient {
                    background: linear-gradient(to right, #13ec5b, #00ffa3);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>

            {/* Header */}
            <header className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#13ec5b] rounded-lg p-1">
                            {/* <span className="material-symbols-outlined text-[#102216] font-bold">sync_alt</span> */}
                            <img src="/logo.png" alt="W" className="w-6 h-6 object-cover" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight">Workigom</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a className="hover:text-[#13ec5b] transition-colors" href="#">Nasıl Çalışır?</a>
                        <a className="hover:text-[#13ec5b] transition-colors" href="#">Avantajlar</a>
                        <a className="hover:text-[#13ec5b] transition-colors" href="#">S.S.S.</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="hidden sm:block text-sm font-bold border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-white">Giriş Yap</Link>
                        <Link to="/register" className="bg-[#13ec5b] text-[#102216] text-sm font-bold px-4 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(19,236,91,0.3)] transition-all">Kayıt Ol</Link>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative pt-12 pb-20 px-4 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#13ec5b]/10 blur-[120px] rounded-full -z-10"></div>
                    <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
                        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6 max-w-3xl">
                            Güvenli <span className="text-gradient">QR Takas</span> Mekanizması
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                            P2P yemek kartı bakiyesi paylaşımı ve güvenli QR ödeme sistemi ile yemek masraflarınızı optimize edin.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
                            <Link to="/register" className="bg-[#13ec5b] text-[#102216] text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                Hemen Başla
                            </Link>
                            <Link to="/login" className="border border-white/10 glass text-lg font-bold px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-white">
                                Giriş Yap
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center gap-4 mb-20">
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                                <span className="material-symbols-outlined text-[#13ec5b] text-3xl">verified_user</span>
                                <div className="text-left">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Güvenlik</p>
                                    <p className="text-lg font-bold">Escrow Güvencesi</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                                <span className="material-symbols-outlined text-[#13ec5b] text-3xl">star</span>
                                <div className="text-left">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Topluluk</p>
                                    <p className="text-lg font-bold">Çift Taraflı Puanlama</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Mockups (Visual Representation) */}
                        <div className="relative w-full max-w-4xl h-[400px] mx-auto hidden md:block">
                            {/* User 1: Zeynep */}
                            <div className="absolute left-0 top-10 glass p-6 rounded-2xl w-72 text-left shadow-2xl rotate-[-2deg]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-700 font-bold flex items-center justify-center text-xl">Z</div>
                                    <div>
                                        <h4 className="font-bold text-white">Zeynep K.</h4>
                                        <p className="text-xs text-slate-400">Bakiyesini Paylaşıyor</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3 mb-3">
                                    <p className="text-xs text-slate-400 mb-1">Mevcut Bakiye</p>
                                    <p className="text-xl font-bold text-[#13ec5b]">1.450,00 TL</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] bg-[#13ec5b]/20 text-[#13ec5b] px-2 py-1 rounded">Onaylandı</span>
                                    <span className="material-symbols-outlined text-slate-500">more_horiz</span>
                                </div>
                            </div>

                            {/* User 2: Ahmet */}
                            <div className="absolute right-0 bottom-10 glass p-6 rounded-2xl w-72 text-left shadow-2xl rotate-[2deg]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-700 font-bold flex items-center justify-center text-xl">A</div>
                                    <div>
                                        <h4 className="font-bold text-white">Ahmet Y.</h4>
                                        <p className="text-xs text-slate-400">Restoranda Ödeme Yapıyor</p>
                                    </div>
                                </div>
                                <div className="aspect-square bg-white rounded-lg p-2 mb-4 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#102216] text-6xl">qr_code_2</span>
                                </div>
                                <button className="w-full bg-[#13ec5b] text-[#102216] font-bold py-2 rounded-lg text-sm">Ödemeyi Tamamla</button>
                            </div>

                            {/* Decorative connecting line */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <span className="material-symbols-outlined text-[#13ec5b]/30 text-8xl">sync_alt</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="py-24 px-4 bg-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black mb-4">Akıllı Takas Modeli</h2>
                            <p className="text-slate-400 max-w-xl mx-auto">Üç basit adımda güvenli ve hızlı bir şekilde bakiyenizi nakde çevirin veya indirimli yemek yiyin.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Step 1 */}
                            <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:border-[#13ec5b]/30 transition-all">
                                <div className="w-16 h-16 bg-[#13ec5b]/10 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-[#13ec5b] text-3xl">search</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">1. Talep & Eşleşme</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Uygulama üzerinden ihtiyacınıza uygun bakiyeyi veya bakiye arayan kişileri saniyeler içinde bulun.
                                </p>
                                <div className="absolute -right-4 -bottom-4 text-white/5 text-9xl font-black opacity-10">01</div>
                            </div>
                            {/* Step 2 */}
                            <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:border-[#13ec5b]/30 transition-all">
                                <div className="w-16 h-16 bg-[#13ec5b]/10 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-[#13ec5b] text-3xl">qr_code_scanner</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">2. QR ile Ödeme</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Restoranda kasada ödemenizi platform üzerinden oluşturulan QR kodu ile anında gerçekleştirin.
                                </p>
                                <div className="absolute -right-4 -bottom-4 text-white/5 text-9xl font-black opacity-10">02</div>
                            </div>
                            {/* Step 3 */}
                            <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:border-[#13ec5b]/30 transition-all">
                                <div className="w-16 h-16 bg-[#13ec5b]/10 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-[#13ec5b] text-3xl">security</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">3. Güvenli Transfer</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Ödeme onaylandıktan sonra bakiye transferi Workigom güvencesiyle cüzdanlar arasında tamamlanır.
                                </p>
                                <div className="absolute -right-4 -bottom-4 text-white/5 text-9xl font-black opacity-10">03</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="max-w-5xl mx-auto glass rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#13ec5b]/20 blur-[100px] rounded-full"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Yemek kartı bakiyenizi <br />özgürce yönetmeye hazır mısınız?</h2>
                            <Link to="/register" className="inline-block bg-[#13ec5b] text-[#102216] text-xl font-bold px-12 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                                Hemen Ücretsiz Katıl
                            </Link>
                            <p className="mt-6 text-slate-500 text-sm">Kurulum gerekmez, hemen kullanmaya başlayın.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#13ec5b]/20 rounded-lg p-1">
                            <span className="material-symbols-outlined text-[#13ec5b] text-sm font-bold">sync_alt</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">Workigom</span>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-500">
                        <a className="hover:text-white transition-colors" href="#">Kullanım Koşulları</a>
                        <a className="hover:text-white transition-colors" href="#">Gizlilik Politikası</a>
                        <a className="hover:text-white transition-colors" href="#">Destek</a>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">
                        © {new Date().getFullYear()} Workigom. Tüm hakları saklıdır.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
