import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart2, Rocket, Home, Store, Plus, ArrowLeftRight, User, Trash2 } from 'lucide-react';
import { DBService } from '../lib/services';
import { useAuth } from '../context/AuthContext';
import type { Transaction } from '../types';

const Talepler = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTxs = async () => {
        try {
            setLoading(true);
            const data = await DBService.getPendingTransactions();
            setTransactions(data as Transaction[]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTxs();
        }
    }, [user]);

    const handleAccept = async (txId: string) => {
        if (!user) return;
        try {
            await DBService.acceptTransaction(txId, user.id);
            // After accepting, we should navigate to the active tracker.
            // But since tracker UI isn't ready in this prompt, we just alert and reload.
            alert('Talep başarıyla kabul edildi! (Tracker sayfasına yönlendirileceksiniz)');
            fetchTxs();
        } catch (err) {
            console.error('Kabul etme hatası:', err);
            alert('Talep kabul edilirken bir hata oluştu');
        }
    };

    const handleCancel = async (txId: string) => {
        try {
            await DBService.updateTransactionStatus(txId, 'cancelled');
            fetchTxs();
        } catch (err) {
            console.error('Iptal hatası:', err);
            alert('İptal edilirken bir hata oluştu');
        }
    };

    const myRequests = transactions.filter(t => t.seeker_id === user?.id);
    const otherRequests = transactions.filter(t => t.seeker_id !== user?.id);

    return (
        <div className="bg-[#0a0b1e] font-sans text-slate-100 min-h-screen flex flex-col">
            <header className="sticky top-0 z-20 bg-[#0a0b1e]/90 backdrop-blur-md border-b border-[#33f20d]/10">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-[#33f20d] transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className="text-[11px] font-bold text-[#33f20d] tracking-[0.2em] uppercase">talepler</h2>
                    </div>
                    <Link to="/app/talepler/create" className="bg-[#33f20d] text-[#0a0b1e] w-8 h-8 md:hidden flex items-center justify-center rounded-lg shadow-lg">
                        <Plus size={18} className="font-bold" />
                    </Link>
                </div>
                <div className="flex px-4">
                    <button className="flex-1 py-4 text-[11px] font-bold border-b-2 border-[#33f20d] text-[#33f20d] tracking-wider uppercase transition-colors">
                        Paylaşım Bekleyenler
                    </button>
                    <button className="flex-1 py-4 text-[11px] font-bold border-b-2 border-transparent hover:text-[#33f20d]/80 hover:border-[#33f20d]/50 text-slate-500 tracking-wider uppercase transition-colors">
                        Paylaşımlarım
                    </button>
                </div>
            </header>

            <main className="flex-1 p-4 space-y-4 pb-24">
                <div className="mb-2">
                    <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl relative overflow-hidden border-l-2 border-l-[#33f20d] flex items-center justify-between border border-[#33f20d]/10">
                        {/* Decorative Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#33f20d]/10 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-1">Aktif Talepler</p>
                            <p className="text-3xl font-bold text-white tracking-tight">{transactions.length}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#33f20d]/10 flex items-center justify-center border border-[#33f20d]/20 relative z-10">
                            <BarChart2 className="text-[#33f20d]" size={20} />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-slate-500 font-bold">Talepler yükleniyor...</div>
                ) : (
                    <>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 mt-6 mb-2">Bekleyen talepler</h2>

                        {otherRequests.length === 0 && (
                            <div className="py-10 text-center text-slate-500 text-sm">Bekleyen başkasına ait talep yok.</div>
                        )}

                        {otherRequests.map((tx) => {
                            const fullName = tx.profiles?.full_name || 'Anonim';
                            const avatar = tx.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${fullName.replace(' ', '+')}&background=33f20d&color=0a0b1e&rounded=true`;

                            return (
                                <div key={tx.id} className="bg-white/5 backdrop-blur-xl border border-[#33f20d]/10 rounded-xl overflow-hidden relative group transition-transform active:scale-[0.98] mb-4">
                                    <div className="p-5 flex flex-col gap-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                <img alt="Avatar" className="w-full h-full object-cover" src={avatar} />
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <h3 className="text-white font-bold text-lg leading-tight">{fullName}</h3>
                                                <div className="text-slate-400 text-sm mt-1">
                                                    <span className="font-semibold text-slate-300 block line-clamp-1">{tx.listing_title}</span>
                                                </div>
                                            </div>
                                            <div className="text-right mt-7 shrink-0">
                                                <p className="text-[#33f20d] font-bold text-xl leading-none">₺{Number(tx.amount).toLocaleString('tr-TR')}</p>
                                                <p className="text-[10px] text-slate-500 uppercase mt-1">Tutar</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end pt-2 border-t border-white/5 mt-2">
                                            <button onClick={() => handleAccept(tx.id)} className="bg-[#33f20d] hover:bg-[#33f20d]/90 text-[#0a0b1e] px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(51,242,13,0.3)] hover:shadow-[0_0_20px_rgba(51,242,13,0.5)]">
                                                Kabul Et <Rocket size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {myRequests.length > 0 && (
                            <>
                                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 mt-6 mb-2">Senin Paylaşımların</h2>
                                {myRequests.map((tx) => {
                                    const fullName = tx.profiles?.full_name || 'Ben';
                                    const avatar = tx.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${fullName.replace(' ', '+')}&background=random&color=fff&rounded=true`;

                                    return (
                                        <div key={tx.id} className="bg-white/5 backdrop-blur-xl border border-[#33f20d]/10 rounded-xl overflow-hidden relative opacity-80 mb-4">
                                            <div className="absolute top-2.5 right-3 z-10">
                                                <span className="bg-slate-500/10 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-full border border-white/10">Senin Paylaşımın</span>
                                            </div>
                                            <div className="p-5 flex flex-col gap-4">
                                                <div className="flex gap-4 items-start">
                                                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                        <img alt="Avatar" className="w-full h-full object-cover" src={avatar} />
                                                    </div>
                                                    <div className="flex-1 pt-1">
                                                        <h3 className="text-white font-bold text-lg leading-tight">{fullName}</h3>
                                                        <div className="text-slate-400 text-sm mt-1">
                                                            <span className="font-semibold text-slate-300 block line-clamp-1">{tx.listing_title}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right mt-7 shrink-0">
                                                        <p className="text-[#33f20d] font-bold text-xl leading-none">₺{Number(tx.amount).toLocaleString('tr-TR')}</p>
                                                        <p className="text-[10px] text-slate-500 uppercase mt-1">Tutar</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-end pt-2 border-t border-white/5 mt-2">
                                                    <button onClick={() => handleCancel(tx.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2 rounded-lg font-bold text-sm transition-all border border-red-500/30 flex items-center gap-1.5">
                                                        <Trash2 size={16} /> İptal Et
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </>
                )}

            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0b1e]/90 backdrop-blur-xl border-t border-[#33f20d]/10 z-30 pb-6 pt-2">
                <div className="flex justify-around items-center max-w-md mx-auto">
                    <Link to="/app" className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <Home size={24} />
                        <span className="text-[10px] font-medium uppercase tracking-wider">Anasayfa</span>
                    </Link>
                    <Link to="/app/market" className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <Store size={24} />
                        <span className="text-[10px] font-medium uppercase tracking-wider">Pazar</span>
                    </Link>

                    <div className="relative -top-4">
                        <Link to="/app/olustur" className="w-14 h-14 bg-[#33f20d] rounded-2xl flex items-center justify-center text-[#0a0b1e] shadow-[0_0_20px_rgba(51,242,13,0.4)] rotate-45 hover:scale-105 transition-transform">
                            <Plus size={24} className="-rotate-45 font-bold" />
                        </Link>
                    </div>

                    <Link to="/app/talepler" className="flex flex-col items-center gap-1 text-[#33f20d]">
                        <ArrowLeftRight size={24} />
                        <span className="text-[10px] font-medium uppercase tracking-wider">Talepler</span>
                    </Link>
                    <Link to="/app/profile" className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <User size={24} />
                        <span className="text-[10px] font-medium uppercase tracking-wider">Profil</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Talepler;
