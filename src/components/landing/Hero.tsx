export const Hero = () => {
    return (
        <section className="relative pt-20 pb-4 min-h-[500px] flex flex-col items-center justify-center bg-background-light overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGgtdi0waDIwdjIwaC0yMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-opacity-30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F1A]/80 to-[#0F0F1A]"></div>
            <div className="absolute top-1/4 left-4 w-12 h-12 bg-warning rounded-full blur-xl opacity-40 float-anim mix-blend-screen"></div>
            <div className="absolute bottom-1/4 right-8 w-16 h-16 bg-accent rounded-full blur-xl opacity-30 float-anim mix-blend-screen" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-4 relative z-10 text-center w-full">
                <div className="inline-flex mb-2 px-3 py-0.5 rounded-full border border-accent/50 bg-black/60 backdrop-blur-md">
                    <span className="text-accent text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        Sistem Aktif
                    </span>
                </div>

                <h1 className="font-display text-2xl md:text-3xl font-black mb-1 leading-tight drop-shadow-2xl">
                    SOSYAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-primary">DAYANIŞMA</span><br />
                    VE AKILLI YEMEK PAYLAŞIMI
                </h1>

                <p className="text-xs text-gray-400 mb-4 max-w-md mx-auto font-body">
                    Nakit akışını yönet, kullanım hakkını güvenle paylaş.
                </p>

                <div className="relative w-full max-w-sm mx-auto h-32 mb-6 mt-2 flex items-center justify-between px-2">
                    <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gradient-to-r from-accent via-primary to-warning opacity-50 z-0">
                        <div className="absolute top-0 left-0 h-full w-1/3 bg-white/50 blur-[2px] animate-pulse-glow"></div>
                    </div>

                    <div className="relative z-10 float-anim group">
                        <div className="w-14 h-14 rounded-full border-2 border-accent bg-black p-1 shadow-neon overflow-hidden">
                            <img alt="Saver Avatar" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBroJFsjZJMvuYMIE0VnH2wJUseajPfjn2mrcy0Z4-4oOFbv0CAGm85m0YIKPAAUwjSVMP7JknJ1ZOwKq5WF8NJqOBSBMNpn9qcJ90wMHQqdF174ZtB0d1HlzvcrHMcyCnBhTIaFTeXwnLorTOkALx24cuNZmHyPzFjrTcDNRaIxoByauVeEcShSkNk-icE840wyqqkXJ_vF6i2KcfJaDnRPOy8ePe58YYoZaPXOlLopsH3E1Ybi8QzPe0Q0YD07aD-BMZLvfFrFeMF" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
                            Tasarrufçu
                        </div>
                        <div className="absolute -top-3 -right-3 bg-black/80 border border-accent text-accent text-[10px] font-bold px-1 rounded-full">
                            ₺300
                        </div>
                        <div className="absolute top-0 -left-4 w-4 h-4 text-warning opacity-70 animate-bounce" style={{ animationDelay: '0.2s' }}>
                            <span className="material-icons text-sm">monetization_on</span>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl border border-primary/50 shadow-neon-primary flex items-center justify-center spin-3d preserve-3d">
                            <span className="material-icons text-white text-3xl">qr_code_2</span>
                        </div>
                        <div className="mt-2 text-[10px] text-primary font-bold animate-pulse">
                            TAKAS
                        </div>
                    </div>

                    <div className="relative z-10 float-anim group" style={{ animationDelay: '1.5s' }}>
                        <div className="w-14 h-14 rounded-full border-2 border-warning bg-black p-1 shadow-neon-warning overflow-hidden">
                            <img alt="Provider Avatar" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZD5m_jY8gl40HteM3pCaDLfzgWoR5z-PtFPna3kBW2LmVhjBxve6qtfv54qzF5yGooJuz6I9PQbmqdaXhI9n0swsuBJGu3DgnJCWZ5J5eBARyT8bkkrBQh9iiG2PXtcxWDp8ZcIKQOxPsx_5qrHHEUHMxr6Jb3WP9MvnkIrt8RhybyefnJN0J1z_XnYtSqsy00dvNwTHtG_0RK7qxy-saqYCx2q0KIi9cbWbRbVgEwtQxPL3-FhCcaQieVsAGsLH7GbIhnrSgkNll" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-warning text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
                            Paylaşımcı
                        </div>
                        <div className="absolute -top-3 -left-3 bg-black/80 border border-warning text-warning flex items-center justify-center w-6 h-6 rounded-full shadow-neon-warning">
                            <span className="material-icons text-[12px]">account_balance_wallet</span>
                        </div>
                        <div className="absolute top-4 -right-4 w-4 h-4 text-warning opacity-70 animate-bounce" style={{ animationDelay: '0.5s' }}>
                            <span className="material-icons text-sm">monetization_on</span>
                        </div>
                    </div>
                </div>

                <button className="btn-pulse bg-primary text-white font-display font-bold text-sm px-6 py-2.5 rounded-xl uppercase tracking-widest border-2 border-white/20 hover:border-white transition-all w-full max-w-[200px] mx-auto flex items-center justify-center gap-2 cursor-pointer">
                    HEMEN BAŞLA <span className="material-icons text-sm">rocket_launch</span>
                </button>
            </div>
        </section>
    );
};
