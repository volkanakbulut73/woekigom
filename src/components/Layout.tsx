import { Outlet, NavLink, Link } from 'react-router-dom';
import { Home, Receipt, Store, User, Plus, Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { profile } = useAuth();

    const navItems = [
        { to: '/app', icon: Home, label: 'Ana Sayfa', end: true },
        { to: '/app/talepler', icon: Receipt, label: 'Talepler' },
        { to: '/app/market', icon: Store, label: 'Market' },
        { to: '/app/profile', icon: User, label: 'Profil' },
    ];

    return (
        <div className="flex h-screen bg-[#0a0b1e] text-slate-100 font-sans overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-[#0a0b1e] border-r border-[#39ff14]/10 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.2)] pb-6 relative">
                <div className="flex flex-col items-center justify-center p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#39ff14] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.4)]">
                            <span className="material-symbols-outlined text-[#0a0b1e] font-bold">account_balance_wallet</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight leading-tight">Workigom</h1>
                            <p className="text-[9px] text-[#39ff14] tracking-widest uppercase font-bold">Cyber Finance P2P</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${isActive
                                    ? 'bg-[#16172d] text-[#39ff14] shadow-lg shadow-[#39ff14]/5 border border-[#39ff14]/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Premium User Card at bottom of sidebar */}
                <div className="px-4 mt-auto">
                    <div className="bg-[#16172d] rounded-2xl p-4 border border-[#39ff14]/10">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Premium Üye</p>
                        <p className="text-sm font-bold text-white mb-3">{profile?.full_name || 'Kullanıcı'}</p>
                        <div className="w-full h-1.5 bg-[#0a0b1e] rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-[#39ff14] rounded-full shadow-[0_0_10px_#39ff14]"></div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area w/ Desktop Topbar */}
            <div className="flex-1 flex flex-col h-full relative overflow-y-auto no-scrollbar bg-[#0a0b1e]">

                {/* Desktop Topbar */}
                <header className="hidden md:flex h-24 items-center justify-between px-10 sticky top-0 bg-[#0a0b1e]/90 backdrop-blur-xl z-40 border-b border-transparent">
                    <div className="relative w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#39ff14] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Ürün, marka veya kategori ara..."
                            className="w-full bg-[#16172d] border border-white/5 rounded-full py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#39ff14]/40 focus:ring-1 focus:ring-[#39ff14]/40 transition-all placeholder:text-slate-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-12 h-12 rounded-full bg-[#16172d] border border-white/5 hover:border-[#39ff14]/30 flex items-center justify-center text-slate-400 hover:text-[#39ff14] transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#39ff14] rounded-full border-2 border-[#16172d]"></span>
                        </button>
                        <Link to="/app/profile" className="w-12 h-12 rounded-full bg-[#16172d] border border-white/5 p-1 cursor-pointer hover:border-[#39ff14]/40 transition-all">
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#39ff14]/20 to-blue-500/20 flex items-center justify-center opacity-80">
                                <User size={20} className="text-[#39ff14]" />
                            </div>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 p-5 md:p-10 w-full max-w-[1400px] mx-auto pb-32 md:pb-10">
                    <Outlet />
                </main>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[88px] bg-[#16172d]/95 backdrop-blur-xl border-t border-[#39ff14]/20 flex items-center justify-around px-2 pb-4 pt-2 z-50">
                    <NavLink to="/app" end className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#39ff14]' : 'text-slate-500'}`}>
                        <Home size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Ana Sayfa</span>
                    </NavLink>
                    <NavLink to="/app/talepler" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#39ff14]' : 'text-slate-500'}`}>
                        <Receipt size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Talepler</span>
                    </NavLink>

                    <div className="relative -top-8">
                        <Link to="/app/market/create" className="w-16 h-16 bg-[#39ff14] text-[#0a0b1e] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.4)] ring-8 ring-[#16172d] transition-transform hover:scale-105 active:scale-95">
                            <Plus size={36} />
                        </Link>
                    </div>

                    <NavLink to="/app/market" end className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#39ff14]' : 'text-slate-500'}`}>
                        <Store size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Market</span>
                    </NavLink>
                    <NavLink to="/app/profile" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#39ff14]' : 'text-slate-500'}`}>
                        <User size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Profil</span>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Layout;
