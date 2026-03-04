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

            await DBService.createTransactionRequest(
                user!.id,
                Number(amount),
                description || 'Paylaşım Talebi'
            );

            navigate('/app/talepler');
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

            {/* White Card Content */}
            <div className="flex-1 bg-white rounded-t-[32px] md:rounded-[40px] px-6 py-8 md:p-12 shadow-2xl relative w-full overflow-y-auto mt-2">
                <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-10">

                    {/* Amount Input */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">
                            MENÜ TUTARI (TL)
                        </label>
                        <div className="relative overflow-hidden rounded-2xl bg-[#f8fafc] border border-slate-200/60 transition-all focus-within:ring-2 focus-within:ring-slate-300 focus-within:border-slate-300">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full bg-transparent py-5 px-6 text-3xl font-black text-slate-800 placeholder:text-slate-300 focus:outline-none"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl pointer-events-none">
                                ₺
                            </div>
                        </div>
                    </div>

                    {/* Description Input */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">
                            AÇIKLAMA
                        </label>
                        <div className="rounded-2xl bg-[#f8fafc] border border-slate-200/60 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-slate-300 focus-within:border-slate-300">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Örn: Burger King menü, Kadıköy şubesi..."
                                rows={4}
                                className="w-full bg-transparent py-5 px-6 text-sm font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Info Alert */}
                    <div className="flex items-start gap-4 bg-[#f0f9ff] text-blue-900 px-5 py-4 rounded-2xl border border-blue-100/50">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-blue-500 text-blue-500 shrink-0 mt-0.5">
                            <Info size={14} className="font-bold" />
                        </div>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed pt-0.5">
                            Talep oluşturduğunuzda destekçiler sizi görecektir. Eşleşme sağlandığında bildirim alırsınız.
                        </p>
                    </div>

                    {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">{error}</p>}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-5 rounded-2xl text-sm font-black tracking-wide shadow-xl shadow-slate-900/10 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
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
