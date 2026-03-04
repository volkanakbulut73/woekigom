import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, QrCode, XCircle } from 'lucide-react';

const Tracker = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // In a real scenario, we would subscribe to Supabase realtime events on transactions table to update 'status'

    return (
        <div className="min-h-screen bg-[#060812] text-white font-sans overflow-hidden flex flex-col relative">
            {/* Background Glow Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[30%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] right-[-10%] w-[30%] h-[40%] bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[30%] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header */}
            <header className="px-6 py-6 flex items-center justify-between relative z-10">
                <button
                    onClick={() => navigate('/app')}
                    className="w-10 h-10 flex items-center justify-center -ml-2 text-slate-300 hover:text-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">Order #{id?.substring(0, 4) || '4829'}</h1>
                <button className="text-[#39ff14] text-xs font-black tracking-widest uppercase hover:text-[#33f20d]">
                    HELP
                </button>
            </header>

            <div className="px-6 relative z-10 flex-1 flex flex-col pt-4 pb-8">
                {/* Title Area */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black mb-2 animate-pulse-slow">P2P Match Found</h2>
                    <p className="text-sm text-slate-400 max-w-[260px] mx-auto leading-relaxed">
                        Follow the progress below to complete your meal share.
                    </p>
                </div>

                {/* Status Cards */}
                <div className="flex gap-4 mb-10">
                    <div className="flex-1 bg-[#121629] border border-white/5 rounded-2xl p-4 shadow-lg active-card-glow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#39ff14]/5 rounded-bl-[100%]"></div>
                        <div className="flex items-center gap-2 mb-2">
                            <Clock size={14} className="text-[#39ff14]" />
                            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">STATUS</span>
                        </div>
                        <p className="text-lg font-bold text-white">In Progress</p>
                    </div>
                    <div className="flex-1 bg-[#121629] border border-white/5 rounded-2xl p-4 shadow-lg overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock size={14} className="text-[#39ff14]" />
                            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">EST. TIME</span>
                        </div>
                        <p className="text-lg font-bold text-white">~5 mins left</p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex-1 relative pl-4 sm:pl-8 max-w-md mx-auto w-full">
                    {/* Step 1 */}
                    <div className="flex gap-6 mb-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[19px] top-[40px] bottom-[-40px] w-[2px] bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>

                        <div className="w-10 h-10 rounded-full border border-[#39ff14] bg-[#0a2012] flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                            <Check size={20} className="text-[#39ff14]" />
                        </div>
                        <div className="pt-1">
                            <h3 className="font-bold text-lg mb-1">Matching with Seller</h3>
                            <p className="text-sm text-slate-400 mb-2">Found matching card holder nearby.</p>
                            <span className="text-xs text-[#39ff14] font-mono">Completed 10:45 AM</span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-6 mb-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[19px] top-[40px] bottom-[-40px] w-[2px] bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>

                        <div className="w-10 h-10 rounded-full border border-[#39ff14] bg-[#0a2012] flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(57,255,20,0.3)] relative">
                            <div className="absolute inset-0 bg-[#39ff14] rounded-full blur-md opacity-20"></div>
                            <Check size={20} className="text-[#39ff14]" />
                        </div>
                        <div className="pt-1">
                            <h3 className="font-bold text-lg mb-1">Payment Processing</h3>
                            <p className="text-sm text-slate-400 mb-2">Funds held in secure escrow.</p>
                            <span className="text-xs text-[#39ff14] font-mono">Completed 10:46 AM</span>
                        </div>
                    </div>

                    {/* Step 3 (Active) */}
                    <div className="flex gap-6 relative">
                        {/* Faded bottom line to represent end or next step */}
                        <div className="absolute left-[19px] top-[40px] h-[100px] w-[2px] bg-gradient-to-b from-[#39ff14] to-transparent"></div>

                        <div className="w-10 h-10 rounded-full border-2 border-[#39ff14] bg-[#0a2012] flex items-center justify-center shrink-0 z-10 relative">
                            {/* Pulse effect */}
                            <div className="absolute inset-0 bg-[#39ff14] rounded-full animate-ping opacity-20"></div>
                            <div className="absolute inset-[-10px] bg-[#39ff14] rounded-full blur-xl opacity-20"></div>

                            <QrCode size={18} className="text-[#39ff14]" />
                        </div>
                        <div className="pt-1 w-full">
                            <div className="flex items-start justify-between mb-1 gap-2">
                                <h3 className="font-bold text-lg leading-tight">QR Code <br />Exchange</h3>
                                <div className="bg-[#39ff14] text-[#060812] text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_#39ff14] whitespace-nowrap animate-pulse">
                                    You Are Here
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 mb-6">Waiting for seller to scan your code.</p>

                            {/* Scan Code Box */}
                            <div className="bg-[#0c101d] border border-white/10 rounded-3xl p-5 flex items-center justify-between shadow-[0_0_30px_rgba(57,255,20,0.05)] border-b-[#39ff14]/30">
                                <div>
                                    <h4 className="font-bold mb-1">Scan Code</h4>
                                    <p className="text-xs text-slate-500">Show this to cashier</p>
                                </div>
                                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-inner">
                                    {/* Mock QR graphic */}
                                    <div className="w-full h-full border-2 border-black border-dashed flex items-center justify-center">
                                        <QrCode className="text-black/80" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/app')}
                            className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
                            <ArrowLeft size={18} />
                            <span>Çıkış</span>
                        </button>
                        <button className="flex-[2] bg-transparent border border-[#ff0055]/30 hover:border-[#ff0055]/80 hover:bg-[#ff0055]/10 text-[#ff0055] py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,0,85,0.05)]">
                            <XCircle size={18} className="stroke-[2.5px]" />
                            <span>İptal Et</span>
                        </button>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-6">
                        Yardıma mı ihtiyacınız var? <a href="#" className="text-white underline decoration-[#39ff14] underline-offset-4 font-semibold">Destek Ekibi</a>
                    </p>
                </div>
            </div>

            <style>{`
                .active-card-glow {
                    box-shadow: 0 0 40px -10px rgba(57, 255, 20, 0.15);
                    border-bottom: 1px solid rgba(57, 255, 20, 0.3);
                }
                .animate-pulse-slow {
                    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default Tracker;
