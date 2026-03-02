import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, HeartHandshake, ArrowRightLeft, TrendingUp, Clock } from 'lucide-react';
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
            <div className="bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl p-6 text-white shadow-md">
                <h2 className="text-2xl font-bold mb-2">Merhaba, {profile?.full_name?.split(' ')[0]}! 👋</h2>
                <p className="text-primary-100 opacity-90">
                    Bugün kart bakiyeni değerlendirmek veya indirimli yemek yemek ister misin?
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg text-success-500">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Cüzdan</p>
                        <p className="text-xl font-bold text-gray-900">₺{profile?.wallet_balance || 0}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-primary-600">
                        <HeartHandshake size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Puan</p>
                        <p className="text-xl font-bold text-gray-900">{profile?.rating || '5.0'} / 5</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
                <Link to="/app/find-share" className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-primary-300 transition-colors group">
                    <div className="bg-orange-100 text-orange-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                        <Search size={24} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Yemek Ye</span>
                </Link>
                <Link to="/app/supporters" className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-primary-300 transition-colors group">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                        <HeartHandshake size={24} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Ismarla</span>
                </Link>
                <Link to="/app/swap" className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-primary-300 transition-colors group">
                    <div className="bg-teal-100 text-teal-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                        <ArrowRightLeft size={24} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Pazar Yeri</span>
                </Link>
            </div>

            {/* Active Transaction Tracker (Simplified) */}
            {!loading && activeTx && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-primary-500" />
                            Aktif İşlem
                        </h3>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                            {activeTx.status === 'waiting-supporter' && 'Eşleşme Bekleniyor'}
                            {activeTx.status === 'waiting-cash-payment' && 'Ödeme Bekleniyor'}
                            {activeTx.status === 'cash-paid' && 'Kanıt Bekleniyor'}
                            {activeTx.status === 'qr-uploaded' && 'Onay Bekleniyor'}
                        </span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-800">{activeTx.listing_title}</p>
                        <p className="text-sm text-gray-500 mt-1">Tutar: ₺{activeTx.amount}</p>

                        <Link to={`/app/${activeTx.seeker_id === profile?.id ? 'find-share' : 'supporters'}`} className="mt-3 block text-center text-sm text-primary-600 font-medium hover:underline">
                            Detaylara Git &rarr;
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
