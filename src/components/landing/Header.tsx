import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 w-full z-50 glass-panel border-b border-accent/20">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-icons text-primary text-2xl glow-text">hub</span>
                    <span className="font-display font-bold text-lg tracking-wider">
                        WORKIGOM<span className="text-accent">.</span>
                    </span>
                </div>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-primary/20 border border-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-primary transition-colors cursor-pointer"
                >
                    Giriş
                </button>
            </div>
        </header>
    );
};
