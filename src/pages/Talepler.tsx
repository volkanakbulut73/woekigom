import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart2, Plus, Trash2 } from 'lucide-react';
import { DBService } from '../lib/services';
import { useAuth } from '../context/AuthContext';
import { getSupporterBadge, getMockTransactionCount } from '../utils/badges';
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
                                    <div className="py-10 col-span-full text-center text-slate-500 text-sm">Bekleyen başkasına ait talep yok.</div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {otherRequests.map((tx) => {
                                        const fullName = tx.profiles?.full_name || 'Anonim';
                                        const avatar = tx.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${fullName.replace(' ', '+')}&background=33f20d&color=0a0b1e&rounded=true`;

                                        return (
                                            <div key={tx.id} className="bg-[#12142d] border border-white/5 rounded-[24px] p-5 relative group transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                                                {/* Top section: Avatar + Name + Amount */}
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="flex gap-3 items-center">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#12142d] relative">
                                                            <img alt="Avatar" className="w-full h-full object-cover" src={avatar} />
                                                            {/* Online indicator dot */}
                                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#12142d] rounded-full"></div>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white font-bold text-base leading-tight">{fullName}</h3>
                                                            <div className={`mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${getSupporterBadge(getMockTransactionCount(tx.profiles?.id)).bgClasses} ${getSupporterBadge(getMockTransactionCount(tx.profiles?.id)).borderClasses}`}>
                                                                {getSupporterBadge(getMockTransactionCount(tx.profiles?.id)).icon}
                                                                <span className={`text-[10px] font-bold ${getSupporterBadge(getMockTransactionCount(tx.profiles?.id)).colorClasses}`}>
                                                                    {getSupporterBadge(getMockTransactionCount(tx.profiles?.id)).label}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-[#1a471e] text-center px-4 py-2.5 rounded-2xl border border-green-800/50 shadow-inner">
                                                        <p className="text-white font-black text-xl leading-none">{Number(tx.amount).toLocaleString('tr-TR')}₺</p>
                                                        <p className="text-green-300/80 text-[9px] uppercase font-bold mt-1">Menü Tutarı</p>
                                                    </div>
                                                </div>

                                                {/* Middle: Description */}
                                                <div className="flex items-center gap-3 mb-6 px-1">
                                                    <div className="w-2 h-2 rounded-full border-2 border-slate-500 shrink-0"></div>
                                                    <span className="text-slate-300 text-sm font-medium line-clamp-2">{tx.listing_title}</span>
                                                </div>

                                                <hr className="border-white/5 mb-5" />

                                                {/* Facilities Features */}
                                                <div className="flex justify-between items-center mb-6 px-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                    <div className="flex items-center gap-1.5">
                                                        <span>Escrow Güvencesi</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span>QR ile Ödeme</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 hidden lg:flex">
                                                        <span>Anında Transfer</span>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <button onClick={() => handleAcceptClick(tx)} className="w-full bg-[#1b5e20] hover:bg-[#2e7d32] text-white py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(27,94,32,0.4)]">
                                                    Paylaş & Kazan
                                                </button>

                                                <p className="text-center text-slate-500 text-[10px] mt-4 font-semibold">
                                                    İşlem Workigom güvencesiyle yapılır
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {activeTab === 'my' && (
                            <>
                                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 mt-6 mb-2">Senin Paylaşımların</h2>
                                {myRequests.length === 0 && (
                                    <div className="py-10 col-span-full text-center text-slate-500 text-sm">Bekleyen sana ait talep yok.</div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {myRequests.map((tx) => {
                                        const fullName = tx.profiles?.full_name || 'Ben';
                                        const avatar = tx.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${fullName.replace(' ', '+')}&background=random&color=fff&rounded=true`;

                                        return (
                                            <div key={tx.id} className="bg-[#12142d] border border-white/5 rounded-[24px] p-5 relative group transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] opacity-80">
                                                <div className="absolute top-4 right-4 z-10">
                                                    <span className="bg-slate-500/10 text-slate-400 text-[9px] font-bold px-2 py-1 rounded-full border border-white/10 uppercase tracking-widest">Senin Paylaşımın</span>
                                                </div>

                                                {/* Top section: Avatar + Name + Amount */}
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="flex gap-3 items-center">
                                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#12142d] relative opacity-70">
                                                            <img alt="Avatar" className="w-full h-full object-cover" src={avatar} />
                                                        </div>
                                                        <div className="opacity-70">
                                                            <h3 className="text-white font-bold text-base leading-tight">{fullName}</h3>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Middle: Description */}
                                                <div className="flex items-center gap-3 mb-6 px-1">
                                                    <div className="w-2 h-2 rounded-full border-2 border-slate-500 shrink-0"></div>
                                                    <span className="text-slate-300 text-sm font-medium line-clamp-2">{tx.listing_title}</span>
                                                </div>

                                                <hr className="border-white/5 mb-5" />

                                                <div className="flex justify-between items-center bg-[#1a471e]/50 border border-[#1a471e] rounded-xl p-3 mb-5">
                                                    <span className="text-slate-400 text-xs font-semibold">Tutar</span>
                                                    <span className="text-white font-black text-lg leading-none">{Number(tx.amount).toLocaleString('tr-TR')}₺</span>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2">
                                                    <Link to={`/app/tracker/${tx.id}`} className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold text-xs transition-all flex-1 text-center">
                                                        Takip Et
                                                    </Link>
                                                    <button onClick={() => handleCancel(tx.id)} className="bg-red-900/40 hover:bg-red-900/60 text-red-500 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 flex-1 border border-red-900/50">
                                                        <Trash2 size={14} /> İptal Et
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
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
                            {/* Option 1: %15 */}
                            <div
                                className="border-2 border-[#002f5e] rounded-[24px] p-5 cursor-pointer hover:bg-slate-50 relative overflow-hidden group transition-all"
                            >
                                <div className="flex justify-between items-center mb-5 relative z-10">
                                    <div className="font-extrabold text-[#002f5e] text-lg">% 15 Paylaşım</div>
                                    <div className="bg-[#002f5e] text-white text-[11px] font-bold px-3 py-1.5 rounded-full">Standart</div>
                                </div>
                                <div className="space-y-3 mb-5 relative z-10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Senin katkın (İndirim):</span>
                                        <span className="font-bold">{Math.round(selectedTx.amount * 0.10)} ₺</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Platform ücreti: %5</span>
                                        <span className="font-bold">{Math.round(selectedTx.amount * 0.05)} ₺</span>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 pt-4 mb-5 flex justify-between items-center relative z-10">
                                    <span className="font-bold text-[#002f5e]">Toplam Maliyetin:</span>
                                    <span className="font-black text-xl text-[#002f5e]">{Math.round(selectedTx.amount * 0.15)} ₺</span>
                                </div>
                                <div className="bg-[#e8f5e9] rounded-2xl p-4 text-center border border-[#c8e6c9] relative z-10">
                                    <p className="text-[#0a471e] font-bold mb-1">Hesabına aktarılacak:</p>
                                    <p className="text-[#0a471e] font-black text-3xl mb-2">{(selectedTx.amount * 0.85).toLocaleString('tr-TR')} ₺</p>
                                    <p className="text-[#4c845b] text-[10px] font-semibold">Yararlanıcı {(selectedTx.amount * 0.90).toLocaleString('tr-TR')} ₺ ödeyecek</p>
                                </div>
                                <button
                                    onClick={() => confirmAccept(15)}
                                    className="mt-5 w-full bg-[#002f5e] text-white font-bold py-3.5 rounded-xl opacity-0 hover:bg-[#001d3a] group-hover:opacity-100 transition-opacity absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0"
                                >
                                    Bunu Seç
                                </button>
                            </div>

                            {/* Option 2: %100 */}
                            <div
                                className="border border-slate-200 rounded-[24px] p-5 cursor-pointer hover:border-amber-300 hover:bg-amber-50/50 transition-all relative overflow-hidden group"
                            >
                                <div className="flex justify-between items-center mb-5">
                                    <div className="font-extrabold text-/900 text-lg flex items-center gap-1">%100 Buda Benden 💜</div>
                                    <div className="bg-amber-400 text-amber-900 text-[11px] font-bold px-3 py-1.5 rounded-full">Altın Kalp</div>
                                </div>
                                <div className="space-y-3 mb-5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Senin katkın:</span>
                                        <span className="font-bold">{selectedTx.amount.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Platform ücreti:</span>
                                        <span className="font-bold flex items-center gap-1 text-slate-800">%0 - Buda Bizden olsun 🤠</span>
                                    </div>
                                </div>
                                <div className="bg-amber-50 rounded-2xl p-4 text-center border border-amber-200 mt-6 relative z-10 transition-transform">
                                    <p className="text-amber-700 text-[11px] font-bold mb-3">Yemek ücretinin tamamını ödemeyi kabul ettiniz.</p>
                                    <div className="bg-white/50 rounded-lg p-3 flex justify-between items-center">
                                        <span className="text-amber-900 text-sm font-semibold">Hesabınıza aktarılacak tutar:</span>
                                        <span className="text-amber-700 font-black text-xl">0 ₺</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => confirmAccept(100)}
                                    className="mt-5 w-full bg-amber-400 text-amber-900 font-bold py-3.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 hover:bg-amber-500"
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
