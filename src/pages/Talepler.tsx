import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart2, Rocket, Plus, Trash2 } from 'lucide-react';
import { DBService } from '../lib/services';
import { useAuth } from '../context/AuthContext';
import type { Transaction } from '../types';

const Talepler = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'other' | 'my'>('other');

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

    const handleAcceptClick = (tx: Transaction) => {
        setSelectedTx(tx);
        setIsModalOpen(true);
    };

    const confirmAccept = async (supportPercentage: number) => {
        if (!user || !selectedTx) return;
        try {
            await DBService.acceptTransaction(selectedTx.id, user.id, supportPercentage);
            navigate(`/app/tracker/${selectedTx.id}`);
        } catch (err) {
            console.error('Kabul etme hatası:', err);
            alert('Talep kabul edilirken bir hata oluştu');
        } finally {
            setIsModalOpen(false);
            setSelectedTx(null);
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
                    <button
                        onClick={() => setActiveTab('other')}
                        className={`flex-1 py-4 text-[11px] font-bold border-b-2 tracking-wider uppercase transition-colors ${activeTab === 'other' ? 'border-[#33f20d] text-[#33f20d]' : 'border-transparent text-slate-500 hover:text-[#33f20d]/80 hover:border-[#33f20d]/50'}`}>
                        Paylaşım Bekleyenler
                    </button>
                    <button
                        onClick={() => setActiveTab('my')}
                        className={`flex-1 py-4 text-[11px] font-bold border-b-2 tracking-wider uppercase transition-colors ${activeTab === 'my' ? 'border-[#33f20d] text-[#33f20d]' : 'border-transparent text-slate-500 hover:text-[#33f20d]/80 hover:border-[#33f20d]/50'}`}>
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
                            <p className="text-3xl font-bold text-white tracking-tight">{activeTab === 'other' ? otherRequests.length : myRequests.length}</p>
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
                        {activeTab === 'other' && (
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
                                                    <button onClick={() => handleAcceptClick(tx)} className="bg-[#33f20d] hover:bg-[#33f20d]/90 text-[#0a0b1e] px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(51,242,13,0.3)] hover:shadow-[0_0_20px_rgba(51,242,13,0.5)]">
                                                        Kabul Et <Rocket size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}

                        {activeTab === 'my' && (
                            <>
                                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 mt-6 mb-2">Senin Paylaşımların</h2>
                                {myRequests.length === 0 && (
                                    <div className="py-10 text-center text-slate-500 text-sm">Bekleyen sana ait talep yok.</div>
                                )}
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
                                                <div className="flex items-center justify-end pt-2 border-t border-white/5 mt-2 gap-2">
                                                    <Link to={`/app/tracker/${tx.id}`} className="bg-[#33f20d]/10 hover:bg-[#33f20d]/20 text-[#33f20d] px-6 py-2 rounded-lg font-bold text-sm transition-all border border-[#33f20d]/30 flex items-center gap-1.5 flex-1 justify-center">
                                                        Takip Et
                                                    </Link>
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

            {/* Share Selection Modal */}
            {isModalOpen && selectedTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white text-slate-900 w-full max-w-sm rounded-[24px] overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-[#002f5e]">Paylaşım Seçimi</h3>
                                <p className="text-slate-500 text-xs mt-1">{selectedTx.profiles?.full_name || 'Kullanıcı'} için paylaşım oranını seçin</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
                                ✕
                            </button>
                        </div>

                        <div className="p-5 overflow-y-auto space-y-4 flex-1">
                            {/* Option 1: %12 */}
                            <div
                                className="border-2 border-[#002f5e] rounded-2xl p-4 cursor-pointer hover:bg-slate-50 relative overflow-hidden group transition-all"
                            >
                                <div className="flex justify-between items-center mb-4 relative z-10">
                                    <div className="font-extrabold text-[#002f5e] text-lg">% 12 Paylaşım</div>
                                    <div className="bg-[#002f5e] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">Standart</div>
                                </div>
                                <div className="space-y-2 mb-4 relative z-10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Senin katkın (İndirim):</span>
                                        <span className="font-bold">₺{Math.round(selectedTx.amount * 0.09)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Platform ücreti: %3</span>
                                        <span className="font-bold">₺{Math.round(selectedTx.amount * 0.03)}</span>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 pt-3 mb-4 flex justify-between items-center relative z-10">
                                    <span className="font-bold text-[#002f5e]">Toplam Maliyetin:</span>
                                    <span className="font-black text-xl text-[#0a471e]">₺{selectedTx.amount.toLocaleString('tr-TR')}</span>
                                </div>
                                <div className="bg-[#e8f5e9] rounded-xl p-3 text-center border border-[#c8e6c9] relative z-10">
                                    <p className="text-[#0a471e] text-xs font-bold mb-1">Hesabına aktarılacak:</p>
                                    <p className="text-[#0a471e] font-black text-2xl mb-1">₺{(selectedTx.amount * 0.88).toLocaleString('tr-TR')}</p>
                                    <p className="text-[#4c845b] text-[10px] font-semibold">Yararlanıcı ₺{(selectedTx.amount * 0.91).toLocaleString('tr-TR')} ödeyecek</p>
                                </div>
                                <button
                                    onClick={() => confirmAccept(12)}
                                    className="mt-4 w-full bg-[#002f5e] text-white font-bold py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0"
                                >
                                    Bunu Seç
                                </button>
                            </div>

                            {/* Option 2: %100 */}
                            <div
                                className="border border-slate-200 rounded-2xl p-4 cursor-pointer hover:border-amber-300 hover:bg-amber-50/50 transition-all relative overflow-hidden group"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="font-extrabold text-amber-500 text-lg flex items-center gap-1">%100 Buda Benden 💖</div>
                                    <div className="bg-amber-400 text-amber-900 text-[10px] uppercase font-bold px-2 py-1 rounded-full">Altın Kalp</div>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Senin katkın:</span>
                                        <span className="font-bold">₺{selectedTx.amount.toLocaleString('tr-TR')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Platform ücreti:</span>
                                        <span className="font-bold flex items-center gap-1 text-slate-800">%0 - Buda Bizden olsun 🤠</span>
                                    </div>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-200 mt-6 relative z-10 transition-transform">
                                    <p className="text-amber-700 text-[10px] font-bold mb-2">Yemek ücretinin tamamını ödemeyi kabul ettiniz.</p>
                                    <div className="bg-white/50 rounded-lg p-2 flex justify-between items-center">
                                        <span className="text-amber-900 text-xs font-semibold">Hesabınıza aktarılacak tutar:</span>
                                        <span className="text-amber-700 font-black text-lg">0 ₺</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => confirmAccept(100)}
                                    className="mt-4 w-full bg-amber-400 text-amber-900 font-bold py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0"
                                >
                                    Bunu Seç
                                </button>
                            </div>
                        </div>

                        <div className="p-5 border-t border-slate-100 grid grid-cols-2 gap-3 bg-slate-50 shrink-0">
                            <button onClick={() => setIsModalOpen(false)} className="py-3 rounded-xl font-bold text-slate-500 bg-slate-200 hover:bg-slate-300 transition-colors">
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Talepler;
