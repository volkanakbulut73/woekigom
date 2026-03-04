import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Camera, Wallet, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const SwapCreate = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
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

            const { error: insertError } = await supabase
                .from('swaps')
                .insert([
                    {
                        user_id: user?.id,
                        amount: Number(amount),
                        status: 'active',
                        currency: 'TRY'
                    }
                ]);

            if (insertError) throw insertError;

            navigate('/app/market');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center animate-in fade-in duration-500">
            {/* White Modal Card */}
            <div className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-lg font-bold text-slate-800 absolute left-1/2 -translate-x-1/2">
                        İlan Oluştur
                    </h2>
                    <div className="w-10"></div> {/* Spacer to center title */}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ürün Fotoğrafı</label>
                        <div className="w-full h-48 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer cursor-not-allowed">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                <Camera size={24} className="text-slate-300" />
                            </div>
                            <span className="font-semibold text-sm text-slate-800">Fotoğraf Seç</span>
                            <span className="text-xs text-slate-400">veya sürükle bırak</span>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Başlık</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Örn: Sony Kulaklık"
                            className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
                        />
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest break-words block">
                            İstenen Yemek Kartı Bakiyesi (₺)
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Wallet size={18} />
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Açıklama</label>
                            <button type="button" className="flex items-center gap-1.5 text-[10px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 uppercase tracking-widest hover:bg-teal-100 transition-colors">
                                <Sparkles size={12} />
                                AI ile Yaz
                            </button>
                        </div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ürünün durumu hakkında bilgi ver..."
                            rows={4}
                            className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0a0b1e] hover:bg-[#16172d] text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/10 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                        >
                            {loading ? 'Yayınlanıyor...' : 'İlanı Yayınla'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SwapCreate;
