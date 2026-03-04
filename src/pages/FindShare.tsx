import React, { useState, useEffect, useCallback } from 'react';
import { ChefHat, CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DBService } from '../lib/services';
import type { Transaction } from '../types';
import confetti from 'canvas-confetti';

const FindShare = () => {
    const { profile } = useAuth();
    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTx, setActiveTx] = useState<Transaction | null>(null);

    const fetchActiveTx = useCallback(async () => {
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
    }, [profile]);

    useEffect(() => {
        if (profile) {
            fetchActiveTx();
        }
    }, [profile, fetchActiveTx]);

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

            // Fire confetti on completion
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#39ff14', '#ffffff', '#0a0b1e']
            });

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
                <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                    <span className="w-2 h-6 bg-[#39ff14] rounded-sm light-burst"></span>
                    Aktif Talebiniz
                </h2>

                <div className="glass-card hover-glow rounded-2xl overflow-hidden border border-gray-800">
                    <div className="bg-gray-900 bg-opacity-80 p-4 border-b border-gray-800 flex justify-between items-center text-gray-100">
                        <span className="font-semibold text-lg">{activeTx.listing_title}</span>
                        <span className="font-bold text-xl text-[#39ff14]">₺{activeTx.amount}</span>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Animated Tracker */}
                        <div className="space-y-0 pl-2">
                            {/* Step 1: Eşleşme */}
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full z-10 
                                        ${!isWaitingSupporter ? 'bg-[#39ff14] text-[#0a0b1e] light-burst' : 'bg-transparent border-2 border-[#39ff14] breathing-halo text-[#39ff14]'}`}>
                                        {!isWaitingSupporter ? <CheckCircle2 size={18} className="font-bold" /> : <Loader2 size={16} className="animate-spin" />}
                                    </div>
                                    <div className={`w-[2px] h-10 ${!isWaitingSupporter ? 'neon-pulse-stream' : 'bg-gray-800'}`}></div>
                                </div>
                                <div className="pb-6">
                                    <p className={`font-bold ${!isWaitingSupporter ? 'text-gray-200' : 'text-[#39ff14]'}`}>Eşleşme Bekleniyor</p>
                                    <p className="text-xs text-gray-500 mt-1">Biri bu talebi kabul edene kadar bekleyin.</p>
                                </div>
                            </div>

                            {/* Step 2: Nakit Ödeme */}
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full z-10 transition-colors
                                        ${isQrUploaded || isCashPaid ? 'bg-[#39ff14] text-[#0a0b1e] light-burst' : isWaitingPayment ? 'bg-transparent border-2 border-[#39ff14] breathing-halo text-[#39ff14]' : 'bg-gray-800 border-2 border-gray-700 text-gray-500'}`}>
                                        {isQrUploaded || isCashPaid ? <CheckCircle2 size={18} className="font-bold" /> : isWaitingPayment ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
                                    </div>
                                    <div className={`w-[2px] h-10 ${isQrUploaded || isCashPaid ? 'neon-pulse-stream' : 'bg-gray-800'}`}></div>
                                </div>
                                <div className="pb-6">
                                    <p className={`font-bold ${isQrUploaded || isCashPaid ? 'text-gray-200' : isWaitingPayment ? 'text-[#39ff14]' : 'text-gray-600'}`}>Ödeme Aşaması</p>
                                    <p className="text-xs text-gray-500 mt-1">Destekçiye nakit ödemeyi yapın.</p>
                                </div>
                            </div>

                            {/* Step 3: Onay ve QR */}
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full z-10 transition-colors
                                        ${isQrUploaded ? 'bg-transparent border-2 border-[#39ff14] breathing-halo text-[#39ff14]' : isCashPaid ? 'bg-transparent border-2 border-blue-400 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-800 border-2 border-gray-700 text-gray-500'}`}>
                                        {isQrUploaded ? <Loader2 size={16} className="animate-spin" /> : isCashPaid ? <Clock size={16} /> : <Clock size={16} />}
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <p className={`font-bold ${isQrUploaded ? 'text-[#39ff14]' : isCashPaid ? 'text-blue-400' : 'text-gray-600'}`}>
                                        {isQrUploaded ? 'Kanıt Yüklendi!' : 'Kanıt Bekleniyor'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {isQrUploaded ? 'Lütfen kanıtı inceleyip işlemi tamamlayın.' : 'Destekçinin ödemeyi onaylaması ve fişi yüklemesi bekleniyor.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        {isWaitingPayment && (
                            <div className="bg-[#39ff14] bg-opacity-[0.03] rounded-xl p-5 border border-[#39ff14] border-opacity-20">
                                <p className="text-sm text-gray-300 mb-4">
                                    Lütfen destekçiye <strong className="text-lg text-[#39ff14]">₺{discountedAmount.toFixed(2)}</strong> (%20 indirimli tutar) nakit olarak ödeyin ve aşağıdaki butona tıklayın.
                                </p>
                                <button
                                    onClick={markCashPaid}
                                    disabled={loading}
                                    className="w-full bg-gray-800 border border-[#39ff14] hover:bg-[#39ff14] hover:text-[#0a0b1e] text-[#39ff14] font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:shadow-[0_0_20px_rgba(57,255,20,0.6)]"
                                >
                                    {loading ? 'İşleniyor...' : 'Ödemeyi Yaptım'}
                                </button>
                            </div>
                        )}

                        {isQrUploaded && activeTx.qr_url && (
                            <div className="space-y-4">
                                <p className="font-medium text-gray-300">Yüklenen Fiş / QR Kod:</p>
                                <div className="p-1 bg-gray-800 rounded-xl border border-gray-700">
                                    <img src={activeTx.qr_url} alt="Kanıt" className="w-full max-h-64 object-contain rounded-lg" />
                                </div>
                                <button
                                    onClick={confirmCompletion}
                                    disabled={loading}
                                    className="w-full bg-[#39ff14] hover:bg-[#2fe010] text-[#0a0b1e] font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(57,255,20,0.5)] hover:shadow-[0_0_25px_rgba(57,255,20,0.8)]"
                                >
                                    {loading ? 'İşleniyor...' : 'Her Şey Tamam (İşlemi Bitir)'}
                                </button>
                            </div>
                        )}

                        {(isWaitingSupporter || isWaitingPayment) && (
                            <button onClick={cancelTx} disabled={loading} className="w-full mt-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold uppercase tracking-widest text-xs py-3 rounded-xl border border-transparent hover:border-red-500/30 transition-all">
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
                <div className="inline-flex bg-[#39ff14] bg-opacity-10 shadow-[0_0_30px_rgba(57,255,20,0.2)] p-4 rounded-full text-[#39ff14] mb-4 border border-[#39ff14] border-opacity-30">
                    <ChefHat size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-100 mt-2 tracking-tight">Yemek Ye</h2>
                <p className="text-gray-400 mt-2 text-sm max-w-sm mx-auto">
                    Hemen bir talep oluşturun, birisi yemeğinizi indirimli ısmarlasın!
                </p>
            </div>

            <form onSubmit={handleCreateRequest} className="glass-card p-6 rounded-2xl border border-gray-800 space-y-5">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Menü/Ürün Açıklaması</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-4 bg-gray-900 border border-gray-700 text-gray-100 rounded-xl focus:ring-2 focus:ring-[#39ff14] focus:border-[#39ff14] transition-colors placeholder-gray-600"
                        placeholder="Örn: X Restoran 2'li Menü"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Restoran Fiyatı</label>
                    <div className="relative">
                        <span className="absolute left-4 top-4 text-gray-500 font-bold">₺</span>
                        <input
                            type="number"
                            required
                            min="1"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-4 pl-10 bg-gray-900 border border-gray-700 text-gray-100 rounded-xl focus:ring-2 focus:ring-[#39ff14] focus:border-[#39ff14] transition-colors placeholder-gray-600"
                            placeholder="0.00"
                        />
                    </div>
                    {amount && !isNaN(parseFloat(amount)) && (
                        <div className="mt-3 bg-[#39ff14] bg-opacity-[0.05] border border-[#39ff14] border-opacity-20 p-3 rounded-lg">
                            <p className="text-sm text-[#39ff14] font-medium flex items-center">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Nakit ödeyeceğiniz tutar: <strong className="ml-1 text-lg">₺{((parseFloat(amount) * 80) / 100).toFixed(2)}</strong>
                            </p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-6 py-4 rounded-xl text-lg font-bold transition-all ${loading ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed' : 'bg-[#39ff14] hover:bg-[#2fe010] text-[#0a0b1e] shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:shadow-[0_0_25px_rgba(57,255,20,0.7)] hover:-translate-y-0.5'
                        }`}
                >
                    {loading ? 'Oluşturuluyor...' : 'TALEP OLUŞTUR'}
                </button>
            </form>
            <div className="pb-10"></div>
        </div>
    );
};

export default FindShare;
