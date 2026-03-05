import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DBService } from '../../lib/services';
import type { Transaction } from '../../types';

const Tracker = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            DBService.getTransactionById(id)
                .then(tx => setTransaction(tx as Transaction))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const status = transaction?.status || 'waiting-supporter';

    const statusOrder = [
        'waiting-supporter',
        'waiting-cash-payment',
        'cash-paid',
        'qr-uploaded',
        'payment-verified',
        'completed'
    ];

    const currentStepIndex = statusOrder.indexOf(status);

    const getStepState = (stepId: string) => {
        const stepIndex = statusOrder.indexOf(stepId);
        if (currentStepIndex === -1) {
            return 'pending';
        }
        if (currentStepIndex > stepIndex) return 'completed';
        if (currentStepIndex === stepIndex) return 'active';
        return 'pending';
    };

    const formatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });

    if (loading) {
        return <div className="min-h-screen bg-[#050A19] flex items-center justify-center text-[#00ff88] font-bold">Yükleniyor...</div>;
    }

    if (!transaction) {
        return <div className="min-h-screen bg-[#050A19] flex items-center justify-center text-red-500 font-bold">İşlem bulunamadı.</div>;
    }

    const isSeeker = user?.id === transaction.seeker_id;
    const otherPartyName = isSeeker ? (transaction as any).supporter?.full_name : (transaction as any).seeker?.full_name;

    const handlePaymentComplete = async () => {
        if (!id) return;
        try {
            await DBService.updateTransactionStatus(id, 'cash-paid');
            setTransaction({ ...transaction, status: 'cash-paid' } as Transaction);
        } catch (err) {
            console.error(err);
        }
    };

    const handleConfirmTransaction = async () => {
        if (!id) return;
        try {
            await DBService.updateTransactionStatus(id, 'completed');
            setTransaction({ ...transaction, status: 'completed' } as Transaction);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = async () => {
        if (!id) return;
        if (confirm('İşlemi iptal etmek istediğinize emin misiniz?')) {
            try {
                await DBService.updateTransactionStatus(id, 'cancelled');
                navigate('/app/talepler');
            } catch (err) {
                console.error(err);
                alert('İptal edilirken bir hata oluştu');
            }
        }
    };

    const handleQRUpload = async () => {
        if (!id) return;
        try {
            await DBService.updateTransactionStatus(id, 'qr-uploaded');
            setTransaction({ ...transaction, status: 'qr-uploaded' } as Transaction);
        } catch (err) {
            console.error(err);
        }
    };

    const renderActionCard = () => {
        return (
            <div className="mt-4 glass-panel rounded-xl p-4 border-l-4 border-l-[#00e5ff] shadow-lg">
                <div className="mb-3">
                    <h4 className="text-[10px] text-[#00e5ff]/80 uppercase tracking-widest font-bold mb-2">Alıcı Bilgisi</h4>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#00e5ff]/20 border border-[#00e5ff]/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#00e5ff] text-lg">person</span>
                        </div>
                        <div>
                            <p className="text-white text-xs font-bold">{otherPartyName || 'Mert Yılmaz'}</p>
                            <p className="text-slate-400 text-[10px]">Onaylı Üye</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-start mb-2 pt-2 border-t border-[#00e5ff]/10">
                    <span className="text-xs text-[#00e5ff]/80 uppercase tracking-wider font-semibold">Tutar</span>
                    <span className="text-[#00e5ff] font-bold text-lg neon-text-blue">
                        {formatter.format(transaction.amount * (transaction.support_percentage === 100 ? 0 : 0.88))}
                    </span>
                </div>
                <div className="flex justify-between items-start">
                    <span className="text-xs text-[#00e5ff]/80 uppercase tracking-wider font-semibold">Restoran</span>
                    <span className="text-white font-medium text-sm">{transaction.listing_title || 'Gourmet Burger'}</span>
                </div>
                {isSeeker ? (
                    <button onClick={handlePaymentComplete} className="mt-4 w-full py-3 bg-[#00e5ff] hover:bg-[#00e5ff]/80 text-[#050A19] rounded-xl font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all">
                        Ödemeyi Yaptım
                    </button>
                ) : (
                    <div className="mt-3 pt-3 border-t border-[#00e5ff]/20 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#00e5ff] text-sm">info</span>
                        <p className="text-[10px] text-slate-300">Karşı taraf ödemeyi onayladığında QR kod açılacaktır.</p>
                    </div>
                )}
            </div>
        );
    };

    const seekerSteps = [
        {
            id: 'waiting-supporter',
            label: currentStepIndex > 0 ? 'Eşleşme Sağlandı' : 'Eşleşme Bekleniyor',
            icon: 'check_circle', // In the new design, the completed state uses check_circle automatically
            descriptionActive: 'İşleniyor...',
            descriptionCompleted: 'Tamamlandı',
            descriptionPending: 'Bekliyor',
        },
        {
            id: 'waiting-cash-payment',
            label: 'Ödeme Bekleniyor',
            icon: 'payments',
            descriptionActive: 'İşleniyor...',
            descriptionCompleted: 'Ödendi',
            descriptionPending: 'Bekliyor',
            renderAction: renderActionCard
        },
        {
            id: 'cash-paid',
            label: 'QR Kod Hazırlanıyor',
            icon: 'qr_code_2',
            descriptionActive: 'İşleniyor...',
            descriptionCompleted: 'Hazırlandı',
            descriptionPending: 'Bekliyor',
        },
        {
            id: 'qr-uploaded',
            label: 'QR Yüklendi',
            icon: 'qr_code_2',
            descriptionActive: 'İşleniyor...',
            descriptionCompleted: 'Onaylandı',
            descriptionPending: 'Bekliyor',
            renderAction: () => (
                <div className="mt-4 flex flex-col gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined text-4xl text-slate-400">image</span>
                    </div>
                    <button onClick={handleConfirmTransaction} className="w-full py-3 bg-[#00ff88] hover:bg-[#00ff88]/80 text-[#0A1529] rounded-xl font-bold shadow-[0_0_15px_rgba(0,255,136,0.4)] transition-all">
                        İşlemi Onayla
                    </button>
                    <button className="w-full py-3 border border-slate-700 text-slate-300 rounded-xl font-bold hover:bg-white/5 transition-all">
                        Sorun Bildir
                    </button>
                </div>
            )
        },
        {
            id: 'completed',
            label: 'Tamamlandı',
            icon: 'flag',
            descriptionActive: 'İşlem Başarılı',
            descriptionCompleted: 'İşlem Başarılı',
            descriptionPending: 'Bekliyor',
            renderAction: () => (
                <div className="mt-4 p-4 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30">
                    <p className="text-[#00ff88] font-bold text-sm text-center">Tebrikler!</p>
                    <button onClick={() => navigate('/app/home')} className="mt-4 w-full py-3 bg-[#00ff88] text-[#0A1529] font-bold rounded-xl shadow-[0_0_15px_rgba(0,255,136,0.3)]">Ana Sayfaya Dön</button>
                </div>
            )
        }
    ];

    const supporterSteps = [
        {
            id: 'waiting-cash-payment',
            label: 'Ödeme Bekleniyor',
            icon: 'payments',
            descriptionActive: 'İşleniyor...',
            descriptionCompleted: 'Alındı',
            descriptionPending: 'Bekleniyor',
        },
        {
            id: 'cash-paid',
            label: 'QR Hazırla',
            icon: 'qr_code_2',
            descriptionActive: 'İşleniyor...',
            descriptionCompleted: 'Yüklendi',
            descriptionPending: 'Bekliyor',
            renderAction: () => (
                <div className="mt-4">
                    <button onClick={handleQRUpload} className="w-full py-4 rounded-xl border-2 border-dashed border-[#00e5ff]/50 text-[#00e5ff] font-bold flex flex-col items-center justify-center gap-2 hover:bg-[#00e5ff]/10 transition-all bg-[#0A1529]/50 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                        FOTOĞRAF YÜKLE
                    </button>
                </div>
            )
        },
        {
            id: 'qr-uploaded',
            label: 'QR Yüklendi',
            icon: 'qr_code_2',
            descriptionActive: 'İşleniyor...',
            descriptionCompleted: 'Onaylandı',
            descriptionPending: 'Bekliyor',
        },
        {
            id: 'completed',
            label: 'Tamamlandı',
            icon: 'flag',
            descriptionActive: 'İşlem Başarılı',
            descriptionCompleted: 'İşlem Başarılı',
            descriptionPending: 'Bekliyor',
            renderAction: () => (
                <div className="mt-4 p-4 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30">
                    <p className="text-[#00ff88] font-bold text-sm text-center">Tebrikler!</p>
                    <button onClick={() => navigate('/app/home')} className="mt-4 w-full py-3 bg-[#00ff88] text-[#0A1529] font-bold rounded-xl shadow-[0_0_15px_rgba(0,255,136,0.3)]">Ana Sayfaya Dön</button>
                </div>
            )
        }
    ];

    const stepsToRender = isSeeker ? seekerSteps : supporterSteps;

    return (
        <div className="bg-[#f6f8f5] dark:bg-[#050A19] font-['Space_Grotesk',_sans-serif] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative overflow-hidden bg-sci-fi-grid">
            <style>{`
                .glass-panel {
                    background: rgba(10, 21, 41, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(0, 229, 255, 0.2);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                }
                .neon-glow {
                    box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
                }
                .neon-glow-blue {
                    box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
                }
                .neon-glow-pink {
                    box-shadow: 0 0 15px rgba(249, 26, 156, 0.3);
                }
                .neon-text-green {
                    text-shadow: 0 0 8px rgba(0, 255, 136, 0.5);
                }
                .neon-text-blue {
                    text-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
                }
                .energy-line-bg {
                    width: 6px;
                    border-radius: 3px;
                }
                .energy-line-active {
                    width: 6px;
                    border-radius: 3px;
                }
                .bg-sci-fi-grid {
                    background-image: radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 50%), linear-gradient(0deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
            `}</style>

            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#00e5ff]/10 to-transparent pointer-events-none z-0"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#00ff88]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
            <div className="absolute top-40 right-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>

            <header className="relative z-10 flex items-center justify-between p-5 pt-6">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/app/talepler')} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A1529] border border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold tracking-tight text-white neon-text-blue uppercase">İşlem Hattı #{id?.substring(0, 4)}</h1>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1529] border border-[#00ff88]/30">
                    <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.8)]"></div>
                    <span className="text-xs font-medium text-[#00ff88] tracking-wider uppercase">Canlı</span>
                </div>
            </header>

            <main className="flex-1 relative z-10 px-5 py-2 overflow-y-auto pb-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 neon-text-blue">İşlem Detayları</h2>
                    <p className="text-slate-400 text-sm">Tahmini tamamlanma: <span className="text-[#00e5ff] font-bold">2 dk</span></p>
                </div>

                <div className="relative pl-4">
                    <div className="absolute left-[18px] top-2 bottom-10 bg-[#0A1529] z-0 energy-line-bg border border-white/5"></div>
                    <div className="absolute left-[18px] top-2 bg-gradient-to-b from-[#00ff88] via-[#00ff88] to-transparent z-0 shadow-[0_0_15px_rgba(0,255,136,0.5)] energy-line-active transition-all duration-1000" style={{ height: `${Math.min(currentStepIndex * 25 + 20, 100)}%` }}></div>

                    {stepsToRender.map((step, index) => {
                        const state = getStepState(step.id);
                        const isLast = index === stepsToRender.length - 1;

                        const isActive = state === 'active';
                        const isCompleted = state === 'completed';

                        let stepWrapperClass = "relative z-10 flex gap-5 " + (!isLast ? "mb-10 " : "");
                        if (state === "pending") stepWrapperClass += "opacity-50";
                        if (isCompleted) stepWrapperClass += "group";

                        return (
                            <div key={step.id} className={stepWrapperClass}>
                                <div className="flex flex-col items-center">
                                    {isActive ? (
                                        <div className="relative w-10 h-10 flex items-center justify-center z-10">
                                            <div className="absolute inset-0 bg-[#00e5ff]/30 rounded-full animate-ping"></div>
                                            <div className="relative w-10 h-10 rounded-full bg-[#00e5ff] flex items-center justify-center text-[#050A19] font-bold shadow-[0_0_20px_rgba(0,229,255,0.6)] border-2 border-white/20">
                                                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                                            </div>
                                        </div>
                                    ) : isCompleted ? (
                                        <div className="w-10 h-10 rounded-full bg-[#0A1529] border-2 border-[#00ff88] flex items-center justify-center text-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.3)] z-10">
                                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-[#0A1529] border border-white/10 flex items-center justify-center text-slate-500 z-10">
                                            <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 pt-1 relative">
                                    {isActive && (
                                        <div className="absolute -top-9 -left-2 bg-[#00e5ff] text-[#050A19] text-[10px] font-bold px-3 py-1 rounded-md shadow-[0_0_15px_rgba(0,229,255,0.4)] transform -translate-y-1 animate-bounce z-20">
                                            ŞU AN BURADASINIZ
                                            <div className="absolute bottom-[-4px] left-3 w-2 h-2 bg-[#00e5ff] transform rotate-45"></div>
                                        </div>
                                    )}
                                    <h3 className={"text-lg font-bold text-white leading-none mb-1 " + (isActive ? "neon-text-blue" : "")}>{step.label}</h3>
                                    <p className={isCompleted ? "text-[#00ff88]/70 text-sm font-medium" : "text-slate-300 text-sm font-medium"}>
                                        {isCompleted ? step.descriptionCompleted : isActive ? step.descriptionActive : step.descriptionPending}
                                    </p>

                                    {isActive && step.renderAction && step.renderAction()}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {status !== 'completed' && status !== 'cancelled' && status !== 'dismissed' && (
                    <div className="mt-12">
                        <button onClick={handleCancel} className="w-full py-4 rounded-xl border border-[#f91a9c]/50 text-[#f91a9c] font-bold flex items-center justify-center gap-2 hover:bg-[#f91a9c]/10 transition-all neon-glow-pink group bg-[#0A1529]/50 backdrop-blur-sm">
                            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">close</span>
                            İŞLEMİ İPTAL ET
                        </button>
                    </div>
                )}
            </main>


        </div>
    );
};

export default Tracker;
