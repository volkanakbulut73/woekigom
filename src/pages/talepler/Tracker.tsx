import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';

// Status tracking enum based on user requirements
type TransactionStatus = 'waiting-supporter' | 'waiting-cash-payment' | 'cash-paid' | 'qr-uploaded' | 'payment-verified' | 'completed';

const Tracker = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Defaulting to step 2 for visualization as per mockup
    const [status, setStatus] = useState<TransactionStatus>('waiting-cash-payment');

    // Mapping db states to visual step indices (0-5)
    const statusToIndex: Record<TransactionStatus, number> = {
        'waiting-supporter': 0,
        'waiting-cash-payment': 1,
        'cash-paid': 2,
        'qr-uploaded': 3,
        'payment-verified': 4,
        'completed': 5
    };

    const currentStepIndex = statusToIndex[status];

    const steps = [
        "Eşleşme",
        "Alıcı Ödemesi",
        "QR Hazırlama",
        "QR Yüklendi",
        "Ödeme Yapıldı",
        "Tamamlandı"
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden flex flex-col">

            {/* Dark Green Header background area */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-[#0a471e] rounded-b-[2rem] z-0"></div>

            {/* Header Content */}
            <header className="px-6 py-6 flex flex-col relative z-10 text-white">
                <button
                    onClick={() => navigate('/app/talepler')}
                    className="flex w-10 h-10 items-center -ml-2 text-white/80 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} /> <span className="ml-1 text-sm font-bold tracking-wide">Geri</span>
                </button>
                <div className="mt-2 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold flex items-center gap-2">
                            {currentStepIndex === 0 ? 'Destekçi Aranıyor...' : 'Eşleşme Başarılı!'}
                            {currentStepIndex > 0 && <span className="bg-[#3ff91a] text-[#0a471e] p-1 rounded-sm"><Check size={14} className="stroke-[4]" /></span>}
                        </h1>
                        <p className="text-white/80 text-xs mt-1 font-medium tracking-wide">İşlem #{id?.substring(0, 5).toUpperCase()}</p>
                    </div>
                    {currentStepIndex === 0 && (
                        <div className="text-2xl animate-pulse">💛</div>
                    )}
                </div>
            </header>

            <div className="px-4 relative z-10 flex-1 flex flex-col pb-8">

                {/* Steps Card */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-4">
                    <div className="flex items-center gap-2 text-slate-700 font-bold mb-6 text-sm">
                        <span className="text-lg">📊</span> İşlem Takibi
                    </div>

                    <div className="flex flex-col gap-4 relative">
                        {/* Connecting Line background */}
                        <div className="absolute left-[15px] top-[15px] bottom-[15px] w-[2px] bg-slate-100 -z-10"></div>
                        {/* Active Progress Line */}
                        <div
                            className="absolute left-[15px] top-[15px] w-[2px] bg-[#0a471e] -z-10 transition-all duration-700 ease-in-out"
                            style={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((step, index) => {
                            const isCompleted = index < currentStepIndex;
                            const isActive = index === currentStepIndex;

                            return (
                                <div key={index} className="flex items-center gap-4 relative">
                                    {isActive && (
                                        <div className="absolute -left-1 w-10 h-10 bg-[#0a471e]/10 rounded-full animate-ping"></div>
                                    )}

                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 z-10 ${isCompleted ? 'bg-[#0a471e] border-[#0a471e] text-white' :
                                        isActive ? 'bg-[#002f5e] border-[#002f5e] text-white shadow-[0_0_15px_rgba(0,47,94,0.3)]' :
                                            'bg-slate-100 border-slate-100 text-slate-400'
                                        }`}>
                                        {isCompleted ? <Check size={14} className="stroke-[3]" /> : index + 1}
                                    </div>
                                    <div className={`font-bold text-[15px] transition-colors duration-300 ${isActive ? 'text-[#002f5e]' :
                                        isCompleted ? 'text-[#0a471e]' :
                                            'text-slate-400'
                                        }`}>
                                        {step}
                                    </div>

                                    {/* Bouncing "You Are Here" indicator */}
                                    {isActive && (
                                        <div className="ml-auto flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#002f5e] animate-bounce bg-[#002f5e]/10 px-2 py-1 rounded-full">
                                            Buradasınız <ChevronRight size={12} className="-ml-1" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Details Card */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex-1 flex flex-col items-center justify-center text-center">

                    <div className="w-16 h-16 bg-[#4c845b] text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <Check size={32} className="stroke-[2.5]" />
                    </div>

                    <div className="bg-emerald-50 text-[#0a471e] font-bold px-3 py-1 rounded-md flex items-center gap-1.5 text-sm mb-6 border border-emerald-100">
                        <Check size={14} /> Eşleşme Tamamlandı
                    </div>

                    <h2 className="text-[#002f5e] font-extrabold text-lg leading-snug max-w-[220px] mb-4">
                        Ayşe K. ile eşleşme başarılı! Tracking başlatıldı...
                    </h2>

                    <p className="text-[#002f5e] text-sm font-semibold max-w-[250px] leading-relaxed mb-6 opacity-80">
                        Şimdi ödeme ekranına yönlendiriliyorsunuz, 5 dk içinde QR ekranınızda olacak.
                    </p>

                    {/* Developer Buttons to advance state manually for testing */}
                    <div className="mt-10 w-full pt-6 border-t border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-3">(Test) Durumu İlerlet</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {Object.keys(statusToIndex).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatus(s as TransactionStatus)}
                                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${status === s ? 'bg-[#002f5e] text-white' : 'bg-slate-100 text-slate-500'}`}
                                >
                                    Adım {statusToIndex[s as TransactionStatus] + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Tracker;
