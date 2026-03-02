import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MapPin, Package } from 'lucide-react';
import { SwapService } from '../../lib/services';
import type { SwapListing } from '../../types';

const SwapList = () => {
    const [listings, setListings] = useState<SwapListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setLoading(true);
        try {
            const data = await SwapService.getListings();
            setListings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredListings = listings.filter(l =>
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (l.description && l.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                        Takas Pazarı <Package className="ml-3 text-teal-500 w-8 h-8" />
                    </h2>
                    <p className="text-gray-500 mt-1">Eşyalarını veya bakiyeni değerlendir.</p>
                </div>
                <Link
                    to="/app/swap/create"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center shadow-sm"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Yeni İlan Ver
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-all shadow-sm"
                    placeholder="İlanlarda ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100"></div>
                    ))}
                </div>
            ) : filteredListings.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">İlan bulunamadı</h3>
                    <p className="text-gray-500 mt-1">Şu anda gösterilecek bir ilan yok veya aramanızla eşleşmiyor.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map(listing => (
                        <Link
                            key={listing.id}
                            to={`/app/swap/${listing.id}`}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                        >
                            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                {listing.photo_url ? (
                                    <img src={listing.photo_url} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Package size={48} />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-teal-700 shadow-sm">
                                    {listing.required_balance} ₺
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-teal-600 transition-colors">
                                    {listing.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">
                                    {listing.description}
                                </p>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                    <span className="flex items-center">
                                        <MapPin className="w-3.5 h-3.5 mr-1" />
                                        {listing.location || 'Bilinmiyor'}
                                    </span>
                                    <span className="font-medium">
                                        {listing.profiles?.full_name?.split(' ')[0] || 'Kullanıcı'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SwapList;
