export const WhyJoin = () => {
    return (
        <section className="py-8 relative bg-background-light">
            <div className="container mx-auto px-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-center">NEDEN BU AİLEYE KATILMALISIN?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-3xl border border-success/30 hover:border-success/80 transition-all relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-[150px] text-success">savings</span>
                        </div>
                        <div className="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center mb-4 shadow-neon-success border border-success/50 float-anim">
                            <span className="material-symbols-outlined text-3xl text-success">trending_up</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-3 text-white">Birlikte Tasarruf</h3>
                        <p className="text-gray-300 text-sm mb-4">Her işlemde ortalama <span className="text-success font-bold font-display text-xl">%10 Kâr</span> elde et. Harcarken kazanmanın en akıllı yolu.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-3xl border border-accent/30 hover:border-accent/80 transition-all relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-[150px] text-accent">gpp_good</span>
                        </div>
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 shadow-neon border border-accent/50 float-anim" style={{ animationDelay: '1s' }}>
                            <span className="material-symbols-outlined text-3xl text-accent">shield</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-3 text-white">Sıfır Risk</h3>
                        <p className="text-gray-300 text-sm mb-4">Emanet sistemi ile paranız güvende. İşlem onaylanana kadar tutar havuzda bekletilir.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
