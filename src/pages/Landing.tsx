
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star, RefreshCw, Smartphone, CheckCircle } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] font-sans text-gray-100 overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-[#0f172a]/90 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-success-500 rounded-lg flex items-center justify-center overflow-hidden">
                                <img src="/logo.png" alt="W" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                                Workigom
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Nasıl Çalışır?</a>
                            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Avantajlar</a>
                            <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">S.S.S</a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="hidden sm:flex text-gray-300 hover:text-white transition-colors text-sm font-medium items-center gap-2">
                                <ArrowRight className="w-4 h-4" /> Giriş Yap
                            </Link>
                            <Link to="/register" className="bg-white text-gray-900 hover:bg-gray-100 px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                                Kayıt Ol
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-success-500/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-500/10 border border-success-500/20 text-success-400 text-xs font-semibold tracking-wide uppercase">
                                <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
                                P2P Yemek Kartı Paylaşım Ağı
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                                Güvenli <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-success-400 to-teal-400">
                                    QR Takas
                                </span> <br />
                                Mekanizması
                            </h1>

                            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                                Yemek kartı kullanıcılarını ve restoran ödemesi yapanları buluşturan güvenli P2P platformu.
                                Bakiyenizi iskontolu kullanım hakkı ile paylaşın, karşılıklı kazanın.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/register" className="bg-success-500 hover:bg-success-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group">
                                    Hemen Başla
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/login" className="bg-gray-800/50 hover:bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center">
                                    Giriş Yap
                                </Link>
                            </div>

                            <div className="flex items-center gap-6 pt-6 border-t border-gray-800">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <ShieldCheck className="w-5 h-5 text-gray-500" />
                                    <span>Escrow Güvencesi</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Star className="w-5 h-5 text-gray-500" />
                                    <span>Çift Taraflı Puanlama</span>
                                </div>
                            </div>
                        </div>

                        {/* Visuals - Match the screenshot mockups */}
                        <div className="relative h-[600px] w-full hidden lg:block">
                            <div className="absolute top-10 right-0 w-[400px] bg-[#1e293b] rounded-3xl p-6 border border-gray-700 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">Z</div>
                                        <div>
                                            <p className="font-bold text-white">Zeynep K.</p>
                                            <p className="text-xs text-success-400 flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> 4.9 Puan</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border border-gray-700/50">
                                    <p className="text-sm text-gray-400 mb-1">Yemek Kartı Bakiyesi</p>
                                    <p className="text-3xl font-bold text-white">₺1.200</p>
                                </div>
                                <div className="flex items-center gap-2 text-success-400 text-sm font-medium">
                                    <CheckCircle className="w-4 h-4" /> Paylaşıma Hazır
                                </div>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl z-20 border-4 border-[#0f172a]">
                                <RefreshCw className="w-6 h-6 text-success-500" />
                            </div>

                            <div className="absolute bottom-10 left-0 w-[400px] bg-white rounded-3xl p-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                        <div className="w-full h-full object-cover bg-gray-300"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Ahmet Y.</p>
                                        <p className="text-xs text-warning-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Onaylı Kullanıcı</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <p className="text-sm text-gray-500 mb-1">Restoran Hesabı</p>
                                    <p className="text-3xl font-bold text-gray-900">₺1.200</p>
                                </div>
                                <div className="mt-4 flex justify-between items-center px-2">
                                    <span className="text-sm text-gray-500">Ödenecek Tutar:</span>
                                    <span className="font-bold text-success-600 text-lg">₺960 (Nakit)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* How it Works Section */}
            <section id="how-it-works" className="py-24 bg-white text-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="text-success-600 font-bold uppercase tracking-wider text-sm mb-2">Ekosistem</p>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Akıllı Takas Modeli</h2>
                        <p className="text-lg text-gray-600">
                            Workigom, nakit akışını doğrudan yönetmez. Kullanıcıların güvenli bir ortamda "kullanım hakkı" paylaşımı yapmasını sağlar.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#0f172a] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">1</div>

                            <div className="h-40 flex items-center justify-center mb-6">
                                <div className="bg-gray-50 h-24 w-full rounded-xl flex items-center justify-around px-4 border border-gray-100">
                                    <div className="text-center">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-2 border-2 border-white shadow-sm"></div>
                                        <span className="text-xs font-medium">Ahmet Y.</span>
                                    </div>
                                    <RefreshCw className="w-6 h-6 text-success-500" />
                                    <div className="text-center">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 mx-auto mb-2 border-2 border-white shadow-sm"></div>
                                        <span className="text-xs font-medium">Zeynep K.</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-center mb-3">Talep & Eşleşme</h3>
                            <p className="text-gray-600 text-center text-sm leading-relaxed">
                                Restoranda ödeme yapacak kişi ile yemek kartı bakiyesi olan kullanıcı anında online olarak eşleşir ve tüm süreç dakikalar içerisinde tamamlanır.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-success-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-success-500/30">2</div>

                            <div className="h-40 flex items-center justify-center mb-6">
                                <div className="relative">
                                    <div className="w-24 h-32 rounded-xl border-4 border-gray-200 flex items-center justify-center">
                                        <Smartphone className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <div className="absolute -right-6 bottom-4 bg-success-500 text-white text-[10px] font-bold px-2 py-1 rounded">Onaylandı</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-center mb-3">QR ile Ödeme</h3>
                            <p className="text-gray-600 text-center text-sm leading-relaxed">
                                Kart sahibi oluşturduğu QR/PIN kodunu sistem üzerinden paylaştığı kullanıcıya iletir ve kullanıcı restoranın POS cihazına okutarak hesabı öder. Bu işlem "kullanım hakkı" paylaşımıdır.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-primary-500/30">3</div>

                            <div className="h-40 flex items-center justify-center mb-6">
                                <div className="bg-gray-50 w-full p-4 rounded-xl border border-gray-100 text-center">
                                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mb-2">
                                        Cüzdanım
                                    </p>
                                    <p className="text-3xl font-bold text-success-500">+ ₺800</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-center mb-3">Güvenli Transfer</h3>
                            <p className="text-gray-600 text-center text-sm leading-relaxed">
                                İşlem kanıtlandığında, alıcının havuza gönderdiği indirimli tutar (Escrow) kart sahibinin cüzdanına anında aktarılır.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Placeholder for visual completion */}
            <footer className="bg-gray-50 py-12 border-t border-gray-200 text-center text-gray-500 text-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} Workigom. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
