import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <nav className="sticky top-0 z-50 flex items-center bg-[#f6f8f6]/80 dark:bg-[#102216]/80 backdrop-blur-md p-4 border-b border-slate-200 dark:border-[#13ec5b]/10 justify-between">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#13ec5b] text-3xl">account_balance_wallet</span>
                <img src="/logo.png" alt="W" className="w-6 h-6 object-cover md:hidden" />
                <h2 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight hidden md:block">Workigom</h2>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/login" className="text-[#13ec5b] text-sm font-bold">Giriş Yap</Link>
                <Link to="/register" className="bg-[#13ec5b] text-[#102216] px-4 py-2 rounded-lg text-sm font-bold">Kaydol</Link>
            </div>
        </nav>
    );
};
