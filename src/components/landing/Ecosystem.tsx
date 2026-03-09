export const Ecosystem = () => {
    return (
        <section className="py-8 relative bg-background-light dark:bg-background-dark">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-1 block glow-text">Ekosistem</span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold">AKILLI TAKAS MODELİ</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent z-0 opacity-50"></div>

                    <div className="glass-panel p-5 rounded-2xl relative z-10 hover:border-accent transition-colors group">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center font-display font-bold border-2 border-background-light">1</div>
                        <div className="h-32 bg-black/40 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-white/10 group-hover:border-accent/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full border-2 border-accent p-1 float-anim">
                                    <img alt="User Avatar" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBroJFsjZJMvuYMIE0VnH2wJUseajPfjn2mrcy0Z4-4oOFbv0CAGm85m0YIKPAAUwjSVMP7JknJ1ZOwKq5WF8NJqOBSBMNpn9qcJ90wMHQqdF174ZtB0d1HlzvcrHMcyCnBhTIaFTeXwnLorTOkALx24cuNZmHyPzFjrTcDNRaIxoByauVeEcShSkNk-icE840wyqqkXJ_vF6i2KcfJaDnRPOy8ePe58YYoZaPXOlLopsH3E1Ybi8QzPe0Q0YD07aD-BMZLvfFrFeMF" />
                                </div>
                                <span className="material-icons text-accent animate-pulse">sync_alt</span>
                                <div className="w-14 h-14 rounded-full border-2 border-primary p-1 float-anim" style={{ animationDelay: '1s' }}>
                                    <img alt="User Avatar" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZD5m_jY8gl40HteM3pCaDLfzgWoR5z-PtFPna3kBW2LmVhjBxve6qtfv54qzF5yGooJuz6I9PQbmqdaXhI9n0swsuBJGu3DgnJCWZ5J5eBARyT8bkkrBQh9iiG2PXtcxWDp8ZcIKQOxPsx_5qrHHEUHMxr6Jb3WP9MvnkIrt8RhybyefnJN0J1z_XnYtSqsy00dvNwTHtG_0RK7qxy-saqYCx2q0KIi9cbWbRbVgEwtQxPL3-FhCcaQieVsAGsLH7GbIhnrSgkNll" />
                                </div>
                            </div>
                        </div>
                        <h3 className="font-display text-lg font-bold mb-2 text-center">Talep &amp; Eşleşme</h3>
                        <p className="text-gray-400 text-xs text-center">Restoranda ödeme yapacak kişi ile yemek kartı bakiyesi olan kullanıcı anında eşleşir.</p>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl relative z-10 hover:border-success transition-colors group">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-success text-black rounded-full flex items-center justify-center font-display font-bold border-2 border-background-light">2</div>
                        <div className="h-32 bg-black/40 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-white/10 group-hover:border-success/50 transition-colors">
                            <div className="w-20 h-28 bg-white rounded-xl flex flex-col items-center justify-center p-2 float-anim shadow-neon">
                                <span className="material-icons text-black text-4xl">qr_code_2</span>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-success/20 border border-success text-success px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
                                <span className="material-icons text-[10px]">check_circle</span> Onaylandı
                            </div>
                        </div>
                        <h3 className="font-display text-lg font-bold mb-2 text-center">QR ile Ödeme</h3>
                        <p className="text-gray-400 text-xs text-center">Sistem üzerinden paylaşılan QR kod ile POS cihazından işlem güvenle tamamlanır.</p>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl relative z-10 hover:border-warning transition-colors group">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-warning text-black rounded-full flex items-center justify-center font-display font-bold border-2 border-background-light">3</div>
                        <div className="h-32 bg-black/40 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-white/10 group-hover:border-warning/50 transition-colors">
                            <div className="relative float-anim">
                                <span className="material-icons text-5xl text-white/50">account_balance_wallet</span>
                                <div className="absolute -top-2 -right-6 bg-warning text-black font-display font-bold px-2 py-0.5 rounded-lg shadow-lg rotate-12 text-sm">
                                    + ₺800
                                </div>
                            </div>
                        </div>
                        <h3 className="font-display text-lg font-bold mb-2 text-center">Güvenli Transfer</h3>
                        <p className="text-gray-400 text-xs text-center">İşlem kanıtlandığında, tutar alıcının cüzdanına anında aktarılır.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
