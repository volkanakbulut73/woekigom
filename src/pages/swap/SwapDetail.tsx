import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, MapPin, Calendar, MessageCircle, AlertTriangle } from 'lucide-react';
import { SwapService } from '../../lib/services';
import { useAuth } from '../../context/AuthContext';
import type { SwapListing } from '../../types';

const SwapDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { profile } = useAuth();

    const [listing, setListing] = useState<SwapListing | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await SwapService.getListings();
                const found = data.find(l => l.id === id);
                if (found) {
                    setListing(found as unknown as SwapListing);
                } else {
                    navigate('/app/swap', { replace: true });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchListing();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!listing || !window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) return;

        setDeleting(true);
        try {
            await SwapService.deleteListing(listing.id);
            navigate('/app/swap', { replace: true });
        } catch (err) {
            console.error(err);
            alert('İlan silinirken bir hata oluştu.');
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (!listing) return null;

    const isOwner = profile?.id === listing.owner_id;
    const sellerInfo = listing.profiles as { full_name?: string; avatar_url?: string; rating?: number } | undefined;
    const createdDate = new Date(listing.created_at).toLocaleDateString('tr-TR');

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Link to="/app/swap" className="inline-flex items-center text-gray-500 hover:text-teal-600 font-medium transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Pazara Dön
            </Link>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                {/* Photo Container */}
                <div className="md:w-1/2 bg-gray-50 flex items-center justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-gray-100 p-8">
                    {listing.photo_url ? (
                        <img src={listing.photo_url} alt={listing.title} className="max-w-full max-h-96 object-contain rounded-xl shadow-sm" />
                    ) : (
                        <div className="text-gray-300 flex flex-col items-center">
                            <AlertTriangle className="w-16 h-16 mb-2" />
                            <p>Fotoğraf Yok</p>
                        </div>
                    )}
                </div>

                {/* Details Container */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{listing.title}</h1>
                            <span className="inline-block bg-teal-50 text-teal-700 font-bold px-4 py-1.5 rounded-full text-lg ml-4 whitespace-nowrap">
                                {listing.required_balance} ₺
                            </span>
                        </div>

                        <p className="text-gray-600 mt-4 leading-relaxed whitespace-pre-wrap">
                            {listing.description}
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="w-4 h-4 mr-2" />
                                {listing.location || 'Konum belirtilmedi'}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-2" />
                                {createdDate}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Satıcı Bilgileri</h3>
                        <div className="flex items-center">
                            <img
                                src={sellerInfo?.avatar_url || `https://ui-avatars.com/api/?name=${sellerInfo?.full_name}&background=random`}
                                alt="Satici Avatar"
                                className="w-12 h-12 rounded-full border border-gray-200"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-900">{sellerInfo?.full_name}</p>
                                <p className="text-sm text-orange-500 font-medium">★ {sellerInfo?.rating || '5.0'} / 5.0</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        {isOwner ? (
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 bg-red-50 hover:bg-red-100 text-danger-500 py-3 rounded-xl font-medium transition-colors flex items-center justify-center border border-red-100"
                            >
                                <Trash2 className="w-5 h-5 mr-2" />
                                {deleting ? 'Siliniyor...' : 'İlanı Sil'}
                            </button>
                        ) : (
                            <button
                                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center shadow-sm"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Satıcıyla İletişime Geç
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwapDetail;
