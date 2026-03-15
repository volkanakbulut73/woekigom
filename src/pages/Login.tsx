import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff, Key, Repeat } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
            if (signInError) throw signInError;
            navigate('/app');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0b1e] font-sans text-slate-100 min-h-screen flex flex-col items-center justify-center p-0 m-0">
            <div className="relative flex h-full min-h-screen w-full max-w-[430px] flex-col bg-[#0a0b1e] overflow-x-hidden shadow-2xl">

                {/* Header Image Area */}
                <div className="relative w-full h-[35vh] flex flex-col items-center justify-center pt-8">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#39ff14]/10 to-transparent opacity-50"></div>
                    <div className="relative z-10 w-full px-6">
                        <div className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-xl border border-[#39ff14]/20 flex items-center justify-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')" }}>
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                            <div className="relative z-20 flex flex-col items-center">
                                <div className="p-4 bg-[#39ff14]/20 rounded-full border border-[#39ff14]/50 mb-4">
                                    <Repeat className="text-[#39ff14]" size={48} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 text-center -mt-6 z-30 flex flex-col items-center">
                    <img src="/logo.png" alt="Workigom Logo" className="w-24 h-24 rounded-2xl mb-2 object-cover shadow-lg border border-white/20" />
                    <h1 className="text-white tracking-tight text-4xl font-bold leading-tight drop-shadow-md">Workigom</h1>
                    <p className="text-[#39ff14]/80 text-sm font-medium uppercase tracking-[0.2em] mt-2 drop-shadow-sm">P2P Paylaşım platformu</p>
                </div>

                {/* Form Area */}
                <div className="flex-1 px-6 py-8">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
                            {error}
                        </div>
                    )}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative z-20">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-300 text-sm font-medium ml-1">E-posta</span>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-[#39ff14]/20 rounded-xl h-14 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-[#39ff14] focus:border-[#39ff14] outline-none transition-all"
                                        placeholder="ad@siber.com"
                                    />
                                </div>
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-slate-300 text-sm font-medium ml-1">Şifre</span>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-[#39ff14]/20 rounded-xl h-14 pl-12 pr-12 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-[#39ff14] focus:border-[#39ff14] outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 text-slate-500 hover:text-[#39ff14] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </label>

                            <div className="flex justify-end">
                                <a className="text-[#39ff14] text-xs font-medium hover:underline cursor-pointer">Şifremi Unuttum</a>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-[#39ff14] hover:bg-[#39ff14]/90 text-[#0a0b1e] font-bold text-lg h-14 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                                {!loading && <Key size={20} />}
                            </button>
                        </form>

                        <div className="relative flex items-center py-4 mt-2">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium uppercase tracking-widest">veya</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium h-14 rounded-xl transition-all flex items-center justify-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
                            </svg>
                            Google ile Giriş Yap
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center pb-8 relative z-20">
                    <p className="text-slate-400 text-sm">
                        Ağda yeni misiniz?
                        <Link to="/register" className="text-[#39ff14] font-bold hover:underline ml-1">Kayıt Ol</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
