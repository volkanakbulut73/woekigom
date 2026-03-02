import React, { useState } from 'react';
import { User, MapPin, CreditCard, ChevronRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DBService } from '../lib/services';

const Profile = () => {
    const { profile, refreshProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [fullName, setFullName] = useState(profile?.full_name || '');
    const [location, setLocation] = useState(profile?.location || '');
    const [iban, setIban] = useState(profile?.iban || '');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;

        setLoading(true);
        try {
            await DBService.updateProfile(profile.id, {
                full_name: fullName,
                location,
                iban
            });
            await refreshProfile();
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert('Profil güncellenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Profilim</h2>

            {/* Avatar Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-6">
                <div className="relative">
                    <img
                        src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name}&background=random`}
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full border-4 border-primary-50 shadow-sm"
                    />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{profile?.full_name}</h3>
                    <div className="flex items-center text-gray-500 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profile?.location || 'Konum eklenmemiş'}
                    </div>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        <ShieldCheck className="w-4 h-4 mr-1" />
                        Onaylı Kullanıcı
                    </div>
                </div>
            </div>

            {/* Editing Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center px-6 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800">Hesap Bilgileri</h3>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-primary-600 text-sm font-medium hover:underline"
                    >
                        {isEditing ? 'İptal' : 'Düzenle'}
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <User className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:opacity-70 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:opacity-70 transition-colors"
                                    placeholder="Örn: İstanbul"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">IBAN (Nakit Ödeme Almak İçin)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <CreditCard className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={iban}
                                    onChange={(e) => setIban(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:opacity-70 transition-colors"
                                    placeholder="TR00 0000 0000 0000 0000 0000 00"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">İşlem tutarları bu hesaba gönderilecektir.</p>
                        </div>

                        {isEditing && (
                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Settings Menu List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-700">Güvenlik ve Şifre</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-700">Bildirim Ayarları</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <span className="font-medium justify-between text-danger-500">Hesabımı Sil</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Profile;
