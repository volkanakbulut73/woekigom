import React, { useEffect, useState, useRef, useCallback } from 'react';
import { HeartHandshake, CheckCircle2, Search, Calendar, ChevronRight, Clock } from 'lucide-react';
import { DBService, SwapService } from '../lib/services';
import type { Transaction } from '../types';
import { useAuth } from '../context/AuthContext';

const Supporters = () => {
    const { profile } = useAuth();
    const [requests, setRequests] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTx, setActiveTx] = useState<Transaction | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    // File upload ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (profile) {
                const tx = await DBService.getUserActiveTransaction(profile.id);
                if (tx && tx.supporter_id === profile.id) {
                    setActiveTx(tx);
                } else {
                    setActiveTx(null);
                }
            }

            const pending = await DBService.getPendingTransactions();
            // Filter out our own requests
            setRequests(pending.filter(req => req.seeker_id !== profile?.id));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [profile]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAccept = async (txId: string) => {
        if (!profile) return;
        setActionLoading(true);
        try {
            await DBService.acceptTransaction(txId, profile.id);
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('İşlem kabul edilemedi. Başkası almış olabilir.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleUploadQr = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activeTx || !e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        setActionLoading(true);
        try {
            const url = await SwapService.uploadImage(file, 'qr-codes');
            await DBService.updateTransactionStatus(activeTx.id, 'qr-uploaded', {
                qr_url: url,
                qr_uploaded_at: new Date().toISOString()
            });
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Fotoğraf yüklenirken bir hata oluştu');
        } finally {
            setActionLoading(false);
        }
    };

    if (activeTx) {
        const isWaitingPayment = activeTx.status === 'waiting-cash-payment';
        const isCashPaid = activeTx.status === 'cash-paid';
        const isQrUploaded = activeTx.status === 'qr-uploaded';

        const discountedAmount = (activeTx.amount * (100 - activeTx.support_percentage)) / 100;

        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                    <span className="w-2 h-6 bg-[#39ff14] rounded-sm light-burst"></span>
                    Aktif Destek İşleminiz
                </h2>

                <div className="glass-card hover-glow rounded-2xl overflow-hidden border border-gray-800">
                    <div className="bg-gray-900 bg-opacity-80 p-4 border-b border-gray-800 text-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-lg">{activeTx.listing_title}</span>
                            <span className="font-bold text-xl text-[#39ff14]">₺{activeTx.amount} Değerinde</span>
                        </div>
                        <p className="text-sm text-gray-400">Size ödenecek miktar: <span className="font-bold text-[#39ff14]">₺{discountedAmount.toFixed(2)}</span></p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className={`flex items-center justify-center p-3 rounded-full ${isWaitingPayment ? 'bg-transparent border-2 border-[#39ff14] breathing-halo text-[#39ff14]' : 'bg-[#39ff14] text-[#0a0b1e] light-burst'}`}>
                                {isWaitingPayment ? <Clock size={24} /> : <CheckCircle2 size={24} />}
                            </div>
                            <div>
                                <p className={`font-semibold ${isWaitingPayment ? 'text-[#39ff14]' : 'text-gray-200'}`}>
                                    {isWaitingPayment && 'Nakit Ödeme Bekleniyor'}
                                    {isCashPaid && 'Ödeme Yapıldı!'}
                                    {isQrUploaded && 'Onay Bekleniyor'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {isWaitingPayment && 'Kullanıcının size nakit ödeme yapmasını bekleyin.'}
                                    {isCashPaid && 'Ödemeyi aldıysanız yemeği ısmarlayın ve fişi yükleyin.'}
                                    {isQrUploaded && 'Kullanıcının işlemi tamamlayarak onaylaması bekleniyor.'}
                                </p>
                            </div>
                        </div>

                        {isCashPaid && (
                            <div className="bg-[#39ff14] bg-opacity-[0.03] rounded-xl p-5 border border-[#39ff14] border-opacity-20 text-center">
                                <p className="text-gray-300 mb-4 font-medium">Lütfen yemeğin siparişini verin ve kanıt olarak fişi/QR kodu yükleyin.</p>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleUploadQr}
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={actionLoading}
                                    className="w-full bg-[#39ff14] hover:bg-[#2fe010] text-[#0a0b1e] font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(57,255,20,0.5)] flex items-center justify-center"
                                >
                                    {actionLoading ? 'Yükleniyor...' : 'Fiş / QR Kod Yükle'}
                                </button>
                            </div>
                        )}

                        {isQrUploaded && activeTx.qr_url && (
                            <div className="text-center p-1 bg-gray-800 rounded-xl border border-gray-700">
                                <img src={activeTx.qr_url} alt="Kanıt" className="mt-2 mb-2 mx-auto max-h-64 rounded-lg" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-100 flex items-center tracking-tight">
                        Ismarla & Nakite Çevir
                        <HeartHandshake className="ml-3 text-[#39ff14] w-8 h-8" />
                    </h2>
                    <p className="text-gray-400 mt-2 text-sm">Kart bakiyeni harcayarak nakit para kazan!</p>
                </div>
            </div>

            <div className="glass-card hover-glow rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900 bg-opacity-80">
                    <h3 className="font-semibold text-gray-200">Bekleyen Yemek Talepleri</h3>
                    <span className="bg-[#39ff14] bg-opacity-10 text-[#39ff14] border border-[#39ff14] border-opacity-30 text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                        {requests.length} Talep
                    </span>
                </div>

                {loading ? (
                    <div className="p-10 text-center text-[#39ff14] animate-pulse font-medium tracking-widest text-sm uppercase">Yükleniyor...</div>
                ) : requests.length === 0 ? (
                    <div className="p-16 text-center flex flex-col items-center justify-center">
                        <Search size={48} className="text-gray-700 mb-4" />
                        <p className="text-gray-400 font-medium tracking-wide">Şu an bekleyen bir yemek talebi yok.</p>
                        <p className="text-xs text-gray-600 mt-2 uppercase tracking-widest">Daha sonra tekrar kontrol et.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-800 bg-gray-900 bg-opacity-30">
                        {requests.map((req) => {
                            const discountedAmount = (req.amount * (100 - req.support_percentage)) / 100;
                            return (
                                <div key={req.id} className="p-5 md:p-6 hover:bg-gray-800 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                                    <div className="flex items-start md:items-center space-x-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-[#39ff14] opacity-20 rounded-full blur-md group-hover:opacity-40 transition-opacity"></div>
                                            <img
                                                src={req.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${req.profiles?.full_name}&background=1a1b2e&color=39ff14`}
                                                alt="avatar"
                                                className="relative w-12 h-12 rounded-full border-2 border-gray-700 group-hover:border-[#39ff14] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-200 group-hover:text-[#39ff14] transition-colors">{req.listing_title}</h4>
                                            <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                                                <span className="flex items-center uppercase tracking-wider"><Calendar className="w-3.5 h-3.5 mr-1" /> Bugün</span>
                                                <span className="font-semibold text-yellow-500 bg-yellow-500 bg-opacity-10 px-2 rounded-sm line-through decoration-transparent">★ {req.profiles?.rating || '5.0'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 bg-gray-900 md:bg-transparent p-4 md:p-0 rounded-xl border border-gray-800 md:border-transparent">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 line-through">Menü: ₺{req.amount}</p>
                                            <p className="font-bold text-[#39ff14] text-lg">Kazan: ₺{discountedAmount.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => handleAccept(req.id)}
                                            disabled={actionLoading}
                                            className="bg-transparent border border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14] hover:text-[#0a0b1e] px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center group/btn shadow-[0_0_10px_rgba(57,255,20,0.1)] hover:shadow-[0_0_15px_rgba(57,255,20,0.5)]"
                                        >
                                            Kabul Et <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="pb-10"></div>
        </div>
    );
};

export default Supporters;
