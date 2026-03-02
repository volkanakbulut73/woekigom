import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, MapPin, Tag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SwapService } from '../../lib/services';

const SwapCreate = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState(profile?.location || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setError('Lütfen geçerli bir fiyat girin.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let photoUrl = null;
            if (imageFile) {
                photoUrl = await SwapService.uploadImage(imageFile, 'images');
            }

            await SwapService.createListing({
                owner_id: profile.id,
                title,
                description,
                required_balance: parsedPrice,
                location,
                photo_url: photoUrl
            });

            navigate('/app/swap');
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('İlan oluşturulurken bir hata oluştu.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Yeni Takas İlanı</h2>
                <p className="text-gray-500 mt-1">Hemen ilan vererek eşyalarınızı değerlendirin.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Image Upload Area */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${imagePreview ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
                        }`}
                >
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    {imagePreview ? (
                        <div className="space-y-4">
                            <img src={imagePreview} alt="Önizleme" className="mx-auto max-h-48 rounded-lg shadow-sm" />
                            <p className="text-teal-600 font-medium text-sm">Fotoğrafı Değiştir</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="bg-teal-100 text-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                <UploadCloud size={32} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Ürün Fotoğrafı Yükle</p>
                                <p className="text-sm text-gray-500 mt-1">PNG, JPG veya WEBP (Max 5MB)</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">İlan Başlığı</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <Tag className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                placeholder="Örn: AirPods Pro 2. Nesil"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                        <textarea
                            rows={4}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                            placeholder="Ürünün durumu, özellikleri vs."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat / Bakiye (₺)</label>
                            <input
                                type="number"
                                required
                                min="1"
                                step="1"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <MapPin className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                    placeholder="Örn: Kadıköy, İstanbul"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-sm ${loading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5'
                        }`}
                >
                    {loading ? 'Yükleniyor...' : 'İlanı Yayınla'}
                </button>
            </form>
        </div>
    );
};

export default SwapCreate;
