
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, HeartHandshake, ArrowRightLeft, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const navItems = [
        { to: '/app', icon: Home, label: 'Ana Sayfa', end: true },
        { to: '/app/find-share', icon: Search, label: 'Yemek Ye' },
        { to: '/app/supporters', icon: HeartHandshake, label: 'Ismarla' },
        { to: '/app/swap', icon: ArrowRightLeft, label: 'Takas' },
        { to: '/app/profile', icon: UserCircle, label: 'Profil' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 pb-16 md:pb-0 md:pl-64">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50">
                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-primary-600">Workigom</h1>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive
                                            ? 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-danger-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full">
                {/* Mobile Header (optional based on page, but good for branding consistency) */}
                <div className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 sticky top-0 z-40">
                    <h1 className="text-xl font-bold text-primary-600">Workigom</h1>
                </div>

                <div className="p-4 md:p-8 max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                <ul className="flex justify-around">
                    {navItems.map((item) => (
                        <li key={item.to} className="flex-1">
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex flex-col items-center py-2 text-xs font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
                                    }`
                                }
                            >
                                <item.icon className="w-6 h-6 mb-1" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Layout;
