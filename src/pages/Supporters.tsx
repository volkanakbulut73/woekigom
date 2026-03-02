import React, { useEffect, useState, useRef } from 'react';
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

    useEffect(() => {
        fetchData();
    }, [profile]);

    const fetchData = async () => {
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
    };

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
                <h2 className="text-2xl font-bold text-gray-900">Aktif Destek İşleminiz</h2>

                <div className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden">
                    <div className="bg-primary-50 p-4 border-b border-primary-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-primary-800">{activeTx.listing_title}</span>
                            <span className="font-bold text-lg text-primary-600">₺{activeTx.amount} Değerinde</span>
                        </div>
                        <p className="text-sm text-primary-700">Size ödenecek miktar: <span className="font-bold">₺{discountedAmount.toFixed(2)}</span></p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className={`p-3 rounded-full ${isWaitingPayment ? 'bg-orange-100 text-orange-500' : 'bg-primary-100 text-primary-500'}`}>
                                {isWaitingPayment ? <Clock size={24} /> : <CheckCircle2 size={24} />}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">
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
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                                <p className="text-gray-700 mb-4 font-medium">Lütfen yemeğin siparişini verin ve kanıt olarak fişi/QR kodu yükleyin.</p>

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
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    {actionLoading ? 'Yükleniyor...' : 'Fiş / QR Kod Yükle'}
                                </button>
                            </div>
                        )}

                        {isQrUploaded && activeTx.qr_url && (
                            <div className="text-center">
                                <img src={activeTx.qr_url} alt="Kanıt" className="mt-4 mx-auto max-h-64 rounded-lg shadow-sm border border-gray-100" />
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
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                        Ismarla & Nakite Çevir
                        <HeartHandshake className="ml-3 text-primary-500 w-8 h-8" />
                    </h2>
                    <p className="text-gray-500 mt-2">Kart bakiyeni harcayarak nakit para kazan!</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
                    <h3 className="font-semibold text-gray-700">Bekleyen Yemek Talepleri</h3>
                    <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-full">
                        {requests.length} Talep
                    </span>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-400">Yükleniyor...</div>
                ) : requests.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center">
                        <Search size={48} className="text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">Şu an bekleyen bir yemek talebi yok.</p>
                        <p className="text-sm text-gray-400 mt-1">Daha sonra tekrar kontrol et.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {requests.map((req) => {
                            const discountedAmount = (req.amount * (100 - req.support_percentage)) / 100;
                            return (
                                <div key={req.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start md:items-center space-x-4">
                                        <img
                                            src={req.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${req.profiles?.full_name}&background=random`}
                                            alt="avatar"
                                            className="w-12 h-12 rounded-full border border-gray-200"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{req.listing_title}</h4>
                                            <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> Bugün</span>
                                                <span className="font-medium text-orange-500">★ {req.profiles?.rating || '5.0'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2 bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-lg">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 line-through">Menü: ₺{req.amount}</p>
                                            <p className="font-bold text-primary-600 text-lg">Kazan: ₺{discountedAmount.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => handleAccept(req.id)}
                                            disabled={actionLoading}
                                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm"
                                        >
                                            Kabul Et <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Supporters;
