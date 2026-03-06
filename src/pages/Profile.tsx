import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Settings, CircleDollarSign, Utensils, Banknote, Edit2, Shield, Bell, LogOut, ChevronRight, Camera, Trash2, Save, X } from 'lucide-react';
import { DBService, SwapService } from '../lib/services';
import { formatProfileName } from '../utils/format';

const Profile = () => {
    const { profile, user, signOut, refreshProfile } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [city, setCity] = useState('İSTANBUL');
    const [phone, setPhone] = useState('+90 555 123 4567');
    const [email, setEmail] = useState('kullanici@workigom.com');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize local state when profile/user loads
    useEffect(() => {
        if (profile?.location) setCity(profile.location);
        if (user?.phone) setPhone(user.phone);
        if (user?.email) setEmail(user.email);
    }, [profile, user]);

    const handleSave = async () => {
        if (!user) return;
        try {
            await DBService.updateProfile(user.id, { location: city.toUpperCase() });
            // Note: Email/Phone update typically requires Supabase Auth API calls, 
            // skipping those here for safety, but updating the UI.
            await refreshProfile();
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving profile", error);
        }
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setIsUploading(true);
        try {
            // Using 'images' bucket if 'avatars' is not specifically created
            const publicUrl = await SwapService.uploadImage(file, 'images');
            await DBService.updateProfile(user.id, { avatar_url: publicUrl });
            await refreshProfile();
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteAvatar = async () => {
        if (!user) return;
        try {
            await DBService.updateProfile(user.id, { avatar_url: null });
            await refreshProfile();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="bg-[#0a0b1e] font-sans text-slate-100 min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden pb-24">

                {/* Header / Top Bar in the Dark Section */}
                <div className="relative w-full bg-[#181d2f] bg-cover bg-center" style={{ backgroundImage: "url('/profile.png')" }}>
                    {/* Dark gradient overlay so white text remains readable and blends into dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b1e]/60 via-[#0a0b1e]/40 to-[#0a0b1e]"></div>

                    <div className="flex items-center p-6 justify-between relative z-10 pt-10">
                        <button onClick={() => isEditing ? setIsEditing(false) : navigate(-1)} className="flex w-10 h-10 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors">
                            {isEditing ? <X size={28} /> : <ChevronLeft size={28} />}
                        </button>
                        <h2 className="text-xl font-bold tracking-widest text-white uppercase">Profile</h2>
                        <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="flex w-10 h-10 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors">
                            {isEditing ? <Save size={24} className="text-[#3ff91a]" /> : <Settings size={28} />}
                        </button>
                    </div>

                    {/* Profile Header Content */}
                    <div className="flex flex-col items-center pb-8 pt-4 relative z-10 w-full">
                        <div className="relative group">
                            <div className={`w-28 h-28 rounded-full border-[3px] border-white/10 p-1 mb-4 ${isUploading ? 'opacity-50' : ''}`}>
                                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${profile?.avatar_url || 'https://ui-avatars.com/api/?name=' + (profile?.full_name?.replace(' ', '+') || 'User') + '&background=16172d&color=fff&rounded=true'}')` }}></div>
                            </div>
                            {isEditing && (
                                <div className="absolute inset-0 top-1 left-1 w-[104px] h-[104px] rounded-full bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => fileInputRef.current?.click()} className="text-white hover:text-[#3ff91a] transition-colors p-1" title="Fotoğraf Yükle">
                                        <Camera size={20} />
                                    </button>
                                    <button onClick={handleDeleteAvatar} className="text-white hover:text-rose-500 transition-colors p-1" title="Fotoğrafı Sil">
                                        <Trash2 size={20} />
                                    </button>
                                    <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
                                </div>
                            )}
                        </div>
                        <div className="text-center w-full px-4">
                            <h1 className="text-[28px] font-medium tracking-wide text-white mb-1 drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {formatProfileName(profile?.full_name)}
                            </h1>
                            <p className="text-white/70 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                                {isEditing ? city : (profile?.location || 'İSTANBUL')}
                            </p>
                            <div className="flex flex-col items-center gap-1.5 px-4 text-white/60 text-xs font-semibold tracking-wide">
                                <p>{isEditing ? phone : (user?.phone || '+90 555 123 4567')}</p>
                                <p>{isEditing ? email : (user?.email || 'kullanici@workigom.com')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 px-6 py-2 flex justify-center w-full">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#16172d] border border-white/5 shadow-lg">
                        <CircleDollarSign className="text-[#3ff91a]" size={16} />
                        <span className="text-[#3ff91a] font-bold text-sm">{profile?.rating ? profile.rating * 500 : 2450} Puan</span>
                        <span className="text-slate-500 mx-2">|</span>
                        <span className="text-slate-400 font-bold text-xs uppercase">Elit Paylaşımcı</span>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">İşlem Geçmişi</h3>
                        <button className="text-[#3ff91a] text-xs font-bold uppercase tracking-wider hover:underline">Tümünü Gör</button>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#3ff91a]/10 flex items-center justify-center">
                                    <Utensils className="text-[#3ff91a]" size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Sushi Master P2P</p>
                                    <p className="text-xs text-slate-400">Bugün, 12:45</p>
                                </div>
                            </div>
                            <p className="text-[#3ff91a] font-bold">+₺24.00</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center">
                                    <Banknote className="text-slate-400" size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Cüzdan Yüklemesi</p>
                                    <p className="text-xs text-slate-400">Dün, 20:20</p>
                                </div>
                            </div>
                            <p className="font-bold text-white">+₺100.00</p>
                        </div>
                    </div>
                </div>

                {/* Settings & Editable Inputs */}
                <div className="px-6 py-4">
                    {/* User Edit Inputs */}
                    {isEditing ? (
                        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-[#3ff91a]/30 mb-8 space-y-4">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-[#3ff91a] font-bold mb-2 block">İl (Şehir)</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-[#0a0b1e] border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-slate-300 focus:border-[#3ff91a]/50 focus:outline-none transition-colors"
                                    placeholder="İSTANBUL"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-[#3ff91a] font-bold mb-2 block">Telefon Numarası</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-[#0a0b1e] border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-slate-300 focus:border-[#3ff91a]/50 focus:outline-none transition-colors"
                                    placeholder="+90 555 123 4567"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-[#3ff91a] font-bold mb-2 block">E-Posta Adresi</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#0a0b1e] border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-slate-300 focus:border-[#3ff91a]/50 focus:outline-none transition-colors"
                                    placeholder="kullanici@workigom.com"
                                />
                            </div>
                            <button onClick={handleSave} className="w-full mt-4 bg-[#3ff91a] text-[#0a0b1e] font-bold py-3 rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2">
                                <Save size={18} />
                                Profili Kaydet
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold mb-4">Ayarlar</h3>

                            <div className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/5 mb-8">
                                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Ödeme Alınacak IBAN</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-[#0a0b1e] border border-white/10 rounded-lg px-4 py-3 flex items-center overflow-hidden">
                                        <span className="text-sm font-mono text-slate-300 truncate">TR76 3000 1234 5678 9012 345</span>
                                    </div>
                                    <button className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-[#3ff91a]/10 text-[#3ff91a] border border-[#3ff91a]/20 rounded-lg transition-colors hover:bg-[#3ff91a]/20">
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                                <button className="w-full mt-3 text-[#3ff91a] text-xs font-bold uppercase tracking-wider text-left hover:underline">IBAN Güncelle</button>
                            </div>

                            <div className="space-y-2">
                                <button className="w-full bg-white/5 backdrop-blur-xl p-4 rounded-xl flex items-center justify-between group border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Shield className="text-slate-400" size={20} />
                                        <span className="text-sm font-medium">Güvenlik ve Gizlilik</span>
                                    </div>
                                    <ChevronRight className="text-slate-500 group-hover:text-[#3ff91a] transition-colors" size={20} />
                                </button>

                                <button className="w-full bg-white/5 backdrop-blur-xl p-4 rounded-xl flex items-center justify-between group border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Bell className="text-slate-400" size={20} />
                                        <span className="text-sm font-medium">Bildirim Ayarları</span>
                                    </div>
                                    <ChevronRight className="text-slate-500 group-hover:text-[#3ff91a] transition-colors" size={20} />
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 text-rose-500 bg-rose-500/5 border border-rose-500/10 font-bold hover:bg-rose-500/10 transition-colors"
                                >
                                    <LogOut size={20} />
                                    Çıkış Yap
                                </button>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Profile;
