
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Market } from '../components/landing/Market';
import { WhyJoin } from '../components/landing/WhyJoin';

const Landing = () => {
    return (
        <div className="font-sans antialiased overflow-x-hidden min-h-screen transition-colors duration-300 bg-[#f6f8f6] dark:bg-[#102216]">
            <style>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .gradient-glow {
                    background: radial-gradient(circle at top right, rgba(19, 236, 91, 0.15), transparent 40%);
                }
            `}</style>

            <Header />
            <main>
                <Hero />
                <HowItWorks />
                <Market />
                <WhyJoin />
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-[#13ec5b]/10 py-12 px-4 bg-white dark:bg-[#102216]">
                <div className="max-w-md mx-auto flex flex-col items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#13ec5b]/20 rounded-lg p-1">
                            <span className="material-symbols-outlined text-[#13ec5b] text-sm font-bold">sync_alt</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Workigom</span>
                    </div>
                    <div className="flex gap-4 text-sm text-slate-500">
                        <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#">Koşullar</a>
                        <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#">Gizlilik</a>
                        <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#">Destek</a>
                    </div>
                    <p className="text-slate-400 text-xs font-medium">
                        © {new Date().getFullYear()} Workigom. Tüm hakları saklıdır.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
