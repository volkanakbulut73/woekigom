export const Footer = () => {
    return (
        <footer className="bg-[#0a0a12] pt-8 pb-6 border-t border-accent/20 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-warning"></div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-3">
                        <span className="material-icons text-primary text-3xl glow-text">hub</span>
                        <span className="font-display font-black text-xl tracking-widest text-white">
                            WORKIGOM<span className="text-accent">.</span>
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent hover:shadow-neon transition-all" href="#">
                            <span className="material-icons text-sm">share</span>
                        </a>
                        <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary hover:shadow-neon-primary transition-all" href="#">
                            <span className="material-icons text-sm">chat</span>
                        </a>
                        <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-warning hover:text-warning hover:shadow-neon-warning transition-all" href="#">
                            <span className="material-icons text-sm">mail</span>
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-gray-400 font-display tracking-widest text-xs glow-text">© COPYRIGHT WORKIGOM CYBER SYSTEMS {new Date().getFullYear()}. ALL RIGHTS RESERVED.</p>
                </div>
            </div>

            <div className="absolute top-10 right-20 w-8 h-8 bg-warning rounded-full blur-sm opacity-50 float-anim"></div>
            <div className="absolute bottom-10 left-10 w-6 h-6 bg-accent rounded-full blur-sm opacity-50 float-anim" style={{ animationDelay: '2s' }}></div>
        </footer>
    );
};
