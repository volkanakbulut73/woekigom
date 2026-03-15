import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Info } from 'lucide-react';
import { DBService } from '../../lib/services';

const TaleplerCreate = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setError('Lütfen geçerli bir tutar girin');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const newTx = await DBService.createTransactionRequest(
                user!.id,
                Number(amount),
                description || 'Paylaşım Talebi'
            );

            navigate(`/app/tracker/${newTx.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col animate-in fade-in duration-500">
            {/* Header Area matching screenshot */}
            <div className="px-4 py-6 md:px-8 md:py-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors shrink-0"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-white font-bold text-lg md:text-xl tracking-wide shrink-0">
                        Paylaşım Talebi Oluştur
                    </h2>
                </div>

            </div>

            {/* Dark Card Content */}
            <div className="flex-1 bg-[#16172d] border-t border-white/5 rounded-t-[32px] md:rounded-[40px] px-6 py-8 md:p-12 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] relative w-full overflow-y-auto mt-2 flex justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 pb-10">

                    {/* Amount Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                            MENÜ TUTARI (TL)
                        </label>
                        <div className="relative overflow-hidden rounded-2xl bg-[#0a0b1e]/50 border border-white/10 transition-all focus-within:ring-1 focus-within:ring-[#39ff14]/50 focus-within:border-[#39ff14]/50">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full bg-transparent py-4 px-5 text-2xl font-black text-white placeholder:text-slate-600 focus:outline-none"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg pointer-events-none">
                                ₺
                            </div>
                        </div>

                        {/* Dynamic Discount Alert Box */}
                        {Number(amount) > 0 && (
                            <div className="mt-2 bg-[#39ff14]/10 border border-[#39ff14]/20 rounded-xl p-4 transition-all animate-in fade-in zoom-in-95 duration-300 shadow-[0_0_15px_rgba(57,255,20,0.05)]">
                                <p className="text-white font-medium text-sm mb-1">
                                    Sizin ödeyeceğiniz tutar <span className="text-[#39ff14] font-black">{Math.round(Number(amount) * 0.90)} TL</span>'dir.
                                </p>
                                <p className="text-slate-400 text-[11px] leading-relaxed">
                                    Eşleşme tamamlandığında ödeme sayfasına otomatik yönlendirileceksiniz.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                            AÇIKLAMA
                        </label>
                        <div className="rounded-2xl bg-[#0a0b1e]/50 border border-white/10 overflow-hidden transition-all focus-within:ring-1 focus-within:ring-[#39ff14]/50 focus-within:border-[#39ff14]/50">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Örn: Burger King menü, Kadıköy şubesi..."
                                rows={3}
                                className="w-full bg-transparent py-4 px-5 text-sm font-medium text-slate-300 placeholder:text-slate-600 focus:outline-none resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Info Alert */}
                    <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-2xl">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                            <Info size={12} className="font-bold" />
                        </div>
                        <p className="text-[11px] md:text-sm font-medium text-slate-300 leading-relaxed pt-0.5">
                            Talep oluşturduğunuzda destekçiler sizi görecektir. Eşleşme sağlandığında bildirim alırsınız.
                        </p>
                    </div>

                    {error && <p className="text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">{error}</p>}

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#39ff14] hover:bg-[#39ff14]/90 text-[#0a0b1e] py-4 rounded-2xl text-sm font-black tracking-wide shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center"
                        >
                            {loading ? 'Oluşturuluyor...' : 'Paylaşım Talebi Oluştur'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaleplerCreate;
