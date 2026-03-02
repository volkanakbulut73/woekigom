import React, { useState, useEffect } from 'react';
import { ChefHat, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DBService } from '../lib/services';
import type { Transaction } from '../types';

const FindShare = () => {
    const { profile } = useAuth();
    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTx, setActiveTx] = useState<Transaction | null>(null);

    useEffect(() => {
        if (profile) {
            fetchActiveTx();
        }
    }, [profile]);

    const fetchActiveTx = async () => {
        try {
            if (!profile) return;
            const tx = await DBService.getUserActiveTransaction(profile.id);
            if (tx && tx.seeker_id === profile.id) {
                setActiveTx(tx);
            } else {
                setActiveTx(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        setLoading(true);
        setError('');

        try {
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                throw new Error('Geçerli bir tutar giriniz.');
            }

            await DBService.createTransactionRequest(profile.id, parsedAmount, title);
            await fetchActiveTx();
            setAmount('');
            setTitle('');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Talep oluşturulamadı.');
            }
        } finally {
            setLoading(false);
        }
    };

    const markCashPaid = async () => {
        if (!activeTx) return;
        setLoading(true);
        try {
            await DBService.updateTransactionStatus(activeTx.id, 'cash-paid');
            await fetchActiveTx();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const confirmCompletion = async () => {
        if (!activeTx) return;
        setLoading(true);
        try {
            await DBService.updateTransactionStatus(activeTx.id, 'completed', { completed_at: new Date().toISOString() });
            await fetchActiveTx();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const cancelTx = async () => {
        if (!activeTx) return;
        setLoading(true);
        try {
            await DBService.updateTransactionStatus(activeTx.id, 'cancelled');
            await fetchActiveTx();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (activeTx) {
        const isWaitingSupporter = activeTx.status === 'waiting-supporter';
        const isWaitingPayment = activeTx.status === 'waiting-cash-payment';
        const isCashPaid = activeTx.status === 'cash-paid';
        const isQrUploaded = activeTx.status === 'qr-uploaded';

        const discountedAmount = (activeTx.amount * (100 - activeTx.support_percentage)) / 100;

        return (
            <div className="max-w-xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Aktif Talebiniz</h2>

                <div className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden">
                    <div className="bg-primary-50 p-4 border-b border-primary-100 flex justify-between items-center">
                        <span className="font-semibold text-primary-800">{activeTx.listing_title}</span>
                        <span className="font-bold text-lg text-primary-600">₺{activeTx.amount}</span>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Status Indicator */}
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${isWaitingSupporter ? 'bg-orange-100 text-orange-500' : 'bg-primary-100 text-primary-500'}`}>
                                {isWaitingSupporter ? <Clock size={24} /> : <CheckCircle2 size={24} />}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {isWaitingSupporter && 'Eşleşme Bekleniyor'}
                                    {isWaitingPayment && 'Eşleşme Sağlandı!'}
                                    {isCashPaid && 'Ödeme Teyidi Bekleniyor'}
                                    {isQrUploaded && 'Fiş/QR Yüklendi!'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {isWaitingSupporter && 'Biri bu talebi kabul edene kadar bekleyin.'}
                                    {isWaitingPayment && 'Destekçiye nakit ödemeyi yapın.'}
                                    {isCashPaid && 'Destekçinin ödemeyi onaylaması ve fişi yüklemesi bekleniyor.'}
                                    {isQrUploaded && 'Lütfen kanıtı inceleyip işlemi tamamlayın.'}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        {isWaitingPayment && (
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-sm text-gray-700 mb-4">
                                    Lütfen destekçiye <strong className="text-lg">₺{discountedAmount.toFixed(2)}</strong> (%20 indirimli tutar) nakit olarak ödeyin ve aşağıdaki butona tıklayın.
                                </p>
                                <button
                                    onClick={markCashPaid}
                                    disabled={loading}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    {loading ? 'İşleniyor...' : 'Ödemeyi Yaptım'}
                                </button>
                            </div>
                        )}

                        {isQrUploaded && activeTx.qr_url && (
                            <div className="space-y-4">
                                <p className="font-medium text-gray-800">Yüklenen Fiş / QR Kod:</p>
                                <img src={activeTx.qr_url} alt="Kanıt" className="w-full max-h-64 object-contain rounded-lg border border-gray-200" />
                                <button
                                    onClick={confirmCompletion}
                                    disabled={loading}
                                    className="w-full bg-success-500 hover:bg-success-600 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    Her Şey Tamam (İşlemi Bitir)
                                </button>
                            </div>
                        )}

                        {(isWaitingSupporter || isWaitingPayment) && (
                            <button onClick={cancelTx} disabled={loading} className="w-full mt-4 text-danger-500 hover:bg-red-50 font-medium py-2 rounded-lg transition-colors">
                                Talebi İptal Et
                            </button>
                        )}

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <div className="inline-flex bg-orange-100 p-4 rounded-full text-orange-500 mb-4">
                    <ChefHat size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Yemek Ye</h2>
                <p className="text-gray-500 mt-2">
                    Hemen bir talep oluşturun, birisi yemeğinizi %20 indirimli ısmarlasın!
                </p>
            </div>

            <form onSubmit={handleCreateRequest} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Menü/Ürün Açıklaması</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Örn: Burger King 2'li Menü"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Restoran Fiyatı (₺)</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500 font-medium">₺</span>
                        <input
                            type="number"
                            required
                            min="1"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="0.00"
                        />
                    </div>
                    {amount && !isNaN(parseFloat(amount)) && (
                        <p className="text-sm text-success-500 mt-2 font-medium flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Nakit ödeyeceğiniz tutar: ₺{((parseFloat(amount) * 80) / 100).toFixed(2)}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all ${loading ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                >
                    {loading ? 'Oluşturuluyor...' : 'Talep Oluştur'}
                </button>
            </form>
        </div>
    );
};

export default FindShare;
