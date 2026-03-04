import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Info, Utensils, Zap, Home, PlusSquare, Wallet, User as UserIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const SwapCreate = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
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
        } catch (err: any) {
            setError(err.message || 'Hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0b1e] font-sans text-slate-100 min-h-screen flex flex-col items-center">
            <div className="relative flex min-h-screen w-full max-w-[430px] flex-col bg-[#0a0b1e] overflow-hidden shadow-2xl border-x border-[#39ff14]/10">
                {/* Cyber Grid Background */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(57, 255, 20, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.05) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                ></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#39ff14]/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 flex items-center p-4 pt-8 justify-between">
                    <button onClick={() => navigate(-1)} className="text-slate-100 flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-[#39ff14]/10 border border-[#39ff14]/20 transition-colors hover:bg-[#39ff14]/20">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">TALEP OLUŞTUR</h2>
                    <div className="flex w-10 items-center justify-end">
                        <button className="flex items-center justify-center text-[#39ff14] hover:text-[#39ff14]/80 transition-colors">
                            <Info size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative z-10 flex-1 px-6 pt-10 pb-6 overflow-y-auto flex flex-col">
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#39ff14]/20 to-transparent flex items-center justify-center border border-[#39ff14]/30 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                            <Utensils className="text-[#39ff14]" size={40} />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                        <div className="space-y-2 mb-10 text-center">
                            <p className="text-[#39ff14]/60 text-xs font-bold uppercase tracking-widest">İşlem Değeri</p>
                            <h1 className="text-slate-100 tracking-tight text-[40px] font-bold leading-tight mb-2">Menü Tutarı</h1>

                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                            <div className="relative flex items-center justify-center">
                                <input
                                    className="w-full bg-transparent border-none text-center text-5xl font-bold text-[#39ff14] focus:ring-0 placeholder:text-[#39ff14]/20 outline-none"
                                    placeholder="0.00"
                                    step="0.01"
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    required
                                />
                                <div className="absolute right-0 text-[#39ff14]/40 font-medium">TL</div>
                            </div>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#39ff14]/30 to-transparent mt-2"></div>
                        </div>

                        <div className="mt-auto pb-4">
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-[#39ff14] hover:bg-[#39ff14]/90 text-[#0a0b1e] py-5 rounded-xl text-lg font-bold tracking-tight shadow-[0_10px_30px_rgba(57,255,20,0.3)] flex items-center justify-center gap-3 transition-transform active:scale-[0.98] uppercase disabled:opacity-50"
                            >
                                {loading ? 'Oluşturuluyor...' : 'PAYLAŞIM TALEBİ OLUŞTUR'}
                                {!loading && <Zap size={24} className="font-bold fill-current" />}
                            </button>
                            <p className="text-center text-[#39ff14]/40 text-[10px] mt-4 font-medium uppercase tracking-[0.2em]">P2P Protokolü: Yemeğiniz Güvende</p>
                        </div>
                    </form>

                    <div className="relative z-10 bg-white/5 backdrop-blur-md border border-[#39ff14]/20 border-t-[#39ff14]/40 p-4 rounded-xl mt-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39ff14]"></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-[#39ff14] uppercase">Ağ Durumu</span>
                                <span className="text-slate-300 text-xs">Yakınlarda 42 paylaşımcı aktif</span>
                            </div>
                        </div>
                        <div className="flex -space-x-2">
                            <img alt="User" className="w-6 h-6 rounded-full border border-[#0a0b1e]" src="https://ui-avatars.com/api/?name=Ali+V&background=random&color=fff&rounded=true" />
                            <img alt="User" className="w-6 h-6 rounded-full border border-[#0a0b1e]" src="https://ui-avatars.com/api/?name=Ayşe+Y&background=random&color=fff&rounded=true" />
                            <img alt="User" className="w-6 h-6 rounded-full border border-[#0a0b1e]" src="https://ui-avatars.com/api/?name=Can+O&background=random&color=fff&rounded=true" />
                        </div>
                    </div>
                </div>

                {/* Bottom Nav */}
                <div className="relative z-10 flex h-auto w-full flex-col bg-[#0a0b1e] overflow-x-hidden border-t border-[#39ff14]/20">
                    <div className="flex gap-2 bg-[#39ff14]/5 px-4 pb-8 pt-4">
                        <Link to="/app" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#39ff14]/60 hover:text-[#39ff14] transition-colors">
                            <div className="flex h-8 items-center justify-center">
                                <Home size={24} />
                            </div>
                            <p className="text-xs font-medium leading-normal tracking-tight">Ana Sayfa</p>
                        </Link>
                        <Link to="/app/olustur" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#39ff14]">
                            <div className="flex h-8 items-center justify-center">
                                <PlusSquare size={24} className="fill-current text-[#39ff14]/20" />
                            </div>
                            <p className="text-xs font-bold leading-normal tracking-tight">Talepler</p>
                        </Link>
                        <Link to="/app/market" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#39ff14]/60 hover:text-[#39ff14] transition-colors">
                            <div className="flex h-8 items-center justify-center">
                                <Wallet size={24} />
                            </div>
                            <p className="text-xs font-medium leading-normal tracking-tight">Cüzdan</p>
                        </Link>
                        <Link to="/app/profile" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#39ff14]/60 hover:text-[#39ff14] transition-colors">
                            <div className="flex h-8 items-center justify-center">
                                <UserIcon size={24} />
                            </div>
                            <p className="text-xs font-medium leading-normal tracking-tight">Profil</p>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SwapCreate;
