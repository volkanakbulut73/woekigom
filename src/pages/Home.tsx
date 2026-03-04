import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, HeartHandshake, ArrowRightLeft, TrendingUp, Clock, Zap, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DBService } from '../lib/services';
import type { Transaction } from '../types';

const Home = () => {
    const { profile } = useAuth();
    const [activeTx, setActiveTx] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile) {
            DBService.getUserActiveTransaction(profile.id)
                .then(tx => setActiveTx(tx))
                .catch(err => console.error('Error fetching active transaction:', err))
                .finally(() => setLoading(false));
        }
    }, [profile]);

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2 mb-1">
                        Merhaba, {profile?.full_name?.split(' ')[0]}!
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Bugün kart bakiyeni değerlendirmek veya indirimli yemek yemek ister misin?
                    </p>
                </div>
            </div>

            {/* Stats Grid - Neomorphic Glow */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card hover-glow p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#39ff14] opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all"></div>
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Cüzdan</p>
                        <div className="bg-[#39ff14] bg-opacity-10 p-1.5 rounded-lg text-[#39ff14]">
                            <TrendingUp size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-100">₺{profile?.wallet_balance || 0}</p>
                    </div>
                </div>

                <div className="glass-card hover-glow p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#39ff14] opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all"></div>
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Puan</p>
                        <div className="bg-[#39ff14] bg-opacity-10 p-1.5 rounded-lg text-[#39ff14]">
                            <Zap size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-100">{profile?.rating || '5.0'} <span className="text-sm font-normal text-gray-500">/ 5</span></p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
                <Link to="/app/find-share" className="flex flex-col items-center justify-center glass-card hover-glow p-4 rounded-xl transition-all group">
                    <div className="bg-gray-800 text-gray-300 p-3 rounded-full mb-3 group-hover:text-[#39ff14] transition-colors border border-gray-700 group-hover:border-[#39ff14] shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                        <Search size={22} />
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-gray-100">Yemek Ye</span>
                </Link>
                <Link to="/app/supporters" className="flex flex-col items-center justify-center glass-card hover-glow p-4 rounded-xl transition-all group">
                    <div className="bg-gray-800 text-gray-300 p-3 rounded-full mb-3 group-hover:text-[#39ff14] transition-colors border border-gray-700 group-hover:border-[#39ff14] shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                        <HeartHandshake size={22} />
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-gray-100">Ismarla</span>
                </Link>
                <Link to="/app/swap" className="flex flex-col items-center justify-center glass-card hover-glow p-4 rounded-xl transition-all group">
                    <div className="bg-gray-800 text-gray-300 p-3 rounded-full mb-3 group-hover:text-[#39ff14] transition-colors border border-gray-700 group-hover:border-[#39ff14] shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                        <ArrowRightLeft size={22} />
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-gray-100">Pazar Yeri</span>
                </Link>
            </div>

            {/* Active Transaction Tracker (Simplified) */}
            {!loading && activeTx && (
                <div className="glass-card hover-glow rounded-xl p-5 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-100 flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-[#39ff14]" />
                            Aktif İşlem
                        </h3>
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm bg-[#39ff14] bg-opacity-10 text-[#39ff14] border border-[#39ff14] border-opacity-30">
                            {activeTx.status === 'waiting-supporter' && 'Eşleşme Bekleniyor'}
                            {activeTx.status === 'waiting-cash-payment' && 'Ödeme Bekleniyor'}
                            {activeTx.status === 'cash-paid' && 'Kanıt Bekleniyor'}
                            {activeTx.status === 'qr-uploaded' && 'Onay Bekleniyor'}
                        </span>
                    </div>
                    <div className="p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-800">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-200">{activeTx.listing_title}</p>
                                <p className="text-xs text-gray-500 mt-1">Tutar: ₺{activeTx.amount}</p>
                            </div>
                            <div className="breathing-halo w-2 h-2 rounded-full bg-[#39ff14]"></div>
                        </div>

                        <Link to={`/app/${activeTx.seeker_id === profile?.id ? 'find-share' : 'supporters'}`} className="mt-4 flex items-center justify-center w-full py-2 text-xs text-[#39ff14] font-bold uppercase tracking-wider border border-[#39ff14] border-opacity-20 rounded-md hover:bg-[#39ff14] hover:bg-opacity-10 transition-colors">
                            Detaylara Git &rarr;
                        </Link>
                    </div>
                </div>
            )}

            {/* Leaderboard Section */}
            <div className="mt-8">
                <h3 className="text-gray-100 text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                    <Trophy className="text-yellow-400 w-5 h-5" />
                    Liderlik Tablosu
                </h3>
                <div className="space-y-3">
                    {/* Rank 1 */}
                    <div className="flex items-center gap-4 p-4 rounded-xl glass-card border-yellow-500 border-opacity-30 relative overflow-hidden group hover:bg-gray-800 transition-colors">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffd700_0%,_transparent_70%)] group-hover:opacity-20 transition-opacity"></div>
                        <div className="text-xl font-black text-yellow-500 w-6 italic">1</div>
                        <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-yellow-500 overflow-hidden shrink-0 shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                            <img className="w-full h-full object-cover" alt="User 1" src="https://ui-avatars.com/api/?name=Zeynep&background=0D8ABC&color=fff" />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-100 font-bold text-sm">Zeynep K.</p>
                            <p className="text-yellow-500 text-[10px] uppercase tracking-tighter font-semibold">Elmas Seviye ✨</p>
                        </div>
                        <div className="text-right">
                            <p className="text-yellow-500 font-black text-sm">24.5k</p>
                            <p className="text-[9px] text-gray-500 uppercase">Puan</p>
                        </div>
                    </div>
                    {/* Rank 2 */}
                    <div className="flex items-center gap-4 p-4 rounded-xl glass-card border-slate-300 border-opacity-20 relative overflow-hidden group hover:bg-gray-800 transition-colors">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#c0c0c0_0%,_transparent_70%)] group-hover:opacity-20 transition-opacity"></div>
                        <div className="text-xl font-black text-slate-300 w-6 italic">2</div>
                        <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-slate-300 overflow-hidden shrink-0 shadow-[0_0_10px_rgba(192,192,192,0.2)]">
                            <img className="w-full h-full object-cover" alt="User 2" src="https://ui-avatars.com/api/?name=Ahmet+Y&background=10b981&color=fff" />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-100 font-bold text-sm">Ahmet Y.</p>
                            <p className="text-slate-300 text-[10px] uppercase tracking-tighter font-semibold">Platin Seviye ✨</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-300 font-black text-sm">19.2k</p>
                            <p className="text-[9px] text-gray-500 uppercase">Puan</p>
                        </div>
                    </div>
                    {/* Rank 3 */}
                    <div className="flex items-center gap-4 p-4 rounded-xl glass-card border-orange-700 border-opacity-30 relative overflow-hidden group hover:bg-gray-800 transition-colors">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#cd7f32_0%,_transparent_70%)] group-hover:opacity-20 transition-opacity"></div>
                        <div className="text-xl font-black text-orange-700 w-6 italic">3</div>
                        <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-orange-700 overflow-hidden shrink-0 shadow-[0_0_10px_rgba(205,127,50,0.3)]">
                            <img className="w-full h-full object-cover" alt="User 3" src="https://ui-avatars.com/api/?name=Mehmet&background=F59E0B&color=fff" />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-100 font-bold text-sm">Mehmet T.</p>
                            <p className="text-orange-700 text-[10px] uppercase tracking-tighter font-semibold">Altın Seviye ✨</p>
                        </div>
                        <div className="text-right">
                            <p className="text-orange-700 font-black text-sm">15.8k</p>
                            <p className="text-[9px] text-gray-500 uppercase">Puan</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-10"></div>
        </div>
    );
};

export default Home;
