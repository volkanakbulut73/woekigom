import { Link } from 'react-router-dom';
import { Search, Bell, Rocket, TrendingUp, RefreshCw, Wallet, Utensils, ShoppingBasket, Trophy, Grid, Receipt, Plus, Store, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { profile } = useAuth();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-24 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-40 px-5 pt-12 pb-4 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <Utensils className="text-slate-950" size={18} />
                    </div>
                    <h1 className="font-bold text-xl tracking-tight">Workigom</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/60 border border-white/5 backdrop-blur-md">
                        <Search size={20} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/60 border border-white/5 backdrop-blur-md relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-950"></span>
                    </button>
                </div>
            </header>

            <main className="px-5 space-y-6">
                {/* Banner */}
                <section className="bg-gradient-to-br from-indigo-500 to-blue-500 rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-blue-500/10">
                    <div className="relative z-10 max-w-[70%]">
                        <h2 className="text-2xl font-bold leading-tight text-white mb-2">Birlikte Paylaş, Daha Fazla Kazan!</h2>
                        <p className="text-white/80 text-sm mb-4">
                            Davet ettiğin her arkadaşın için 1 yıl boyunca yapılan her işlemden <span className="font-bold text-white"> % 1 </span> nakit ödül kazan.
                        </p>
                        <button className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            Hemen Paylaş
                            <Rocket size={14} />
                        </button>
                    </div>
                    <div className="absolute -right-6 -bottom-6 opacity-20 transform -rotate-12">
                        <Rocket size={160} className="text-white" />
                    </div>
                </section>

                {/* Stats */}
                <section className="grid grid-cols-1 gap-3">
                    <div className="bg-slate-900/60 border border-white/5 backdrop-blur-md p-5 rounded-2xl flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Toplam Tasarruf</p>
                            <p className="text-2xl font-bold text-green-500">₺0</p>
                            <p className="text-[10px] text-slate-500">Net İndirim Tutarı</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-green-500" size={24} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-900/60 border border-white/5 backdrop-blur-md p-4 rounded-2xl space-y-2">
                            <div className="flex justify-between items-start">
                                <RefreshCw className="text-blue-400" size={20} />
                                <p className="text-[10px] text-blue-400 font-bold uppercase">BAŞARILI</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-xs text-slate-400">Toplam İşlem</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/60 border border-white/5 backdrop-blur-md p-4 rounded-2xl space-y-2">
                            <div className="flex justify-between items-start">
                                <Wallet className="text-green-500" size={20} />
                                <p className="text-[10px] text-green-500 font-bold uppercase">toplam bakiye</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">₺{profile?.wallet_balance || 0}</p>
                                <p className="text-xs text-slate-400">Kazanılan Pay</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-green-500 text-lg">⚡</span>
                            <h3 className="font-bold text-lg">Son Tasarruflar</h3>
                        </div>
                        <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-1 rounded-full font-bold">● CANLI AKIŞ</span>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-slate-900/60 border border-white/5 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                                <Utensils className="text-green-500" size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Hasan T.</p>
                                <p className="text-xs text-slate-400">Yemek Kartı Paylaşımı</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-500 font-bold text-sm">₺500 tasarruf</p>
                                <p className="text-[10px] text-slate-500">2 dakika önce</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/60 border border-white/5 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                                <ShoppingBasket className="text-blue-400" size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Ahmet Y.</p>
                                <p className="text-xs text-slate-400">Market Harcaması</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-500 font-bold text-sm">₺300 tasarruf</p>
                                <p className="text-[10px] text-slate-500">14 dakika önce</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/60 border border-white/5 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                                <Utensils className="text-green-500" size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Merve K.</p>
                                <p className="text-xs text-slate-400">Yemek Kartı Paylaşımı</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-500 font-bold text-sm">₺150 tasarruf</p>
                                <p className="text-[10px] text-slate-500">22 dakika önce</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leaderboard Stub */}
                <section className="bg-slate-900/60 border border-white/5 backdrop-blur-md rounded-2xl p-5 mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-bold text-lg">Liderlik Tablosu</h3>
                        <Trophy className="text-yellow-500" size={20} />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-slate-500 w-4">1</span>
                            <img alt="User" className="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=0D8ABC&color=fff" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold">Ahmet Yılmaz</p>
                                <p className="text-[10px] text-slate-500">512 İşlem</p>
                            </div>
                            <span className="text-xs font-bold">₺12.4k</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-slate-500 w-4">2</span>
                            <img alt="User" className="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=Selin+Demir&background=10b981&color=fff" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold">Selin Demir</p>
                                <p className="text-[10px] text-slate-500">311 İşlem</p>
                            </div>
                            <span className="text-xs font-bold">₺8.2k</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 h-20 bg-slate-900/85 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-4 pb-4">
                <Link to="/app" className="flex flex-col items-center gap-1 text-green-500">
                    <Grid size={24} />
                    <span className="text-[10px] font-medium">Anasayfa</span>
                </Link>
                <Link to="/app/talepler" className="flex flex-col items-center gap-1 text-slate-500">
                    <Receipt size={24} />
                    <span className="text-[10px] font-medium">Talepler</span>
                </Link>
                <div className="relative -top-6">
                    <Link to="/app/market/create" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 text-slate-950 border-4 border-slate-950">
                        <Plus size={32} />
                    </Link>
                </div>
                <Link to="/app/market" className="flex flex-col items-center gap-1 text-slate-500">
                    <Store size={24} />
                    <span className="text-[10px] font-medium">Market</span>
                </Link>
                <Link to="/app/profile" className="flex flex-col items-center gap-1 text-slate-500">
                    <User size={24} />
                    <span className="text-[10px] font-medium">Profil</span>
                </Link>
            </nav>
        </div>
    );
};

export default Home;
