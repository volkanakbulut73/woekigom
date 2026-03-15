import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Camera, Wallet, Sparkles, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { SwapService } from '../../lib/services';

const SwapCreate = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const remainingSlots = 5 - images.length;
            const filesToAdd = newFiles.slice(0, remainingSlots);

            const newImageUrls = filesToAdd.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImageUrls]);
            setImageFiles(prev => [...prev, ...filesToAdd]);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
        setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Lütfen bir başlık girin');
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setError('Lütfen geçerli bir tutar girin');
            return;
        }

        try {
            setLoading(true);
            setError('');

            let mainPhotoUrl: string | null = null;
            if (imageFiles.length > 0) {
                try {
                    const uploadedUrls = [];
                    for (const file of imageFiles) {
                        const url = await SwapService.uploadImage(file, 'images');
                        uploadedUrls.push(url);
                    }
                    mainPhotoUrl = uploadedUrls.join(',');
                    console.log('Images successfully uploaded:', mainPhotoUrl);
                } catch (err) {
                    const uploadErr = err as { message?: string, error?: string };
                    console.error('Upload Error Details:', uploadErr);
                    const errMsg = uploadErr?.message || uploadErr?.error || 'Bilinmeyen Yükleme Hatası (RLS Policy Olabilir)';
                    setError(`Fotoğraflar yüklenemedi: ${errMsg}`);
                    alert(`HATA: Lütfen Supabase Storage'da 'images' kovası için INSERT (Yükleme) izinlerinin açık olduğundan emin olun.\n\nDetay: ${errMsg}`);
                    setLoading(false);
                    return;
                }
            } else {
                console.log('No images selected for upload.');
            }

            const { error: insertError } = await supabase
                .from('swap_listings')
                .insert([
                    {
                        owner_id: user?.id,
                        title: title,
                        description: description,
                        required_balance: Number(amount),
                        photo_url: mainPhotoUrl
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
                    {/* Image Upload (Multi) */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ürün Fotoğrafları ({images.length}/5)</label>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                            {images.map((img, index) => (
                                <div key={index} className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden border border-slate-200 group">
                                    <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                    {index === 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-[9px] font-bold text-center py-1 tracking-widest uppercase">
                                            VİTRİN RESMİ
                                        </div>
                                    )}
                                </div>
                            ))}

                            {images.length < 5 && (
                                <label className="w-28 h-28 shrink-0 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                        <Camera size={16} className="text-slate-400" />
                                    </div>
                                    <span className="font-semibold text-[10px] text-slate-600">Fotoğraf Ekle</span>
                                </label>
                            )}
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
