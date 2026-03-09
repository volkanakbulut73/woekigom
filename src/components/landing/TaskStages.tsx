export const TaskStages = () => {
    return (
        <section className="py-8 relative bg-[#120e1a]">
            <div className="container mx-auto px-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 glow-text">
                    <span className="material-icons text-accent text-3xl">map</span> GÖREV AŞAMALARI
                </h2>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-accent before:via-primary before:to-warning before:shadow-neon">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-accent bg-background-light shadow-neon shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <span className="material-icons text-accent text-lg">add_task</span>
                        </div>
                        <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] glass-panel p-3 rounded-xl border border-accent/50 hover:shadow-neon transition-all">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-accent font-display text-xs font-bold animate-pulse">LEVEL 1</span>
                                <h4 className="font-bold text-lg text-white">İlan Oluşturma</h4>
                            </div>
                            <p className="text-xs text-gray-300">Talebini sisteme gir ve eşleşmeyi bekle.</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background-light shadow-neon-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                            <span className="material-icons text-primary text-lg">security</span>
                        </div>
                        <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] glass-panel p-3 rounded-xl border border-primary/50 hover:shadow-neon-primary transition-all">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary font-display text-xs font-bold animate-pulse">LEVEL 2</span>
                                <h4 className="font-bold text-lg text-white">Emanet Sistemi</h4>
                            </div>
                            <p className="text-xs text-gray-300">İşlem güvenliği için tutar havuza aktarılır.</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-accent bg-background-light shadow-neon shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <span className="material-icons text-accent text-lg">qr_code_scanner</span>
                        </div>
                        <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] glass-panel p-3 rounded-xl border border-accent/50 hover:shadow-neon transition-all">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-accent font-display text-xs font-bold animate-pulse">LEVEL 3</span>
                                <h4 className="font-bold text-lg text-white">QR Kod Paylaşımı</h4>
                            </div>
                            <p className="text-xs text-gray-300">Ödeme için eşsiz QR kodunuzu taratın.</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-success bg-background-light shadow-neon-success shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <span className="material-icons text-success text-lg">verified</span>
                        </div>
                        <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] glass-panel p-3 rounded-xl border border-success/50 hover:shadow-neon-success transition-all">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-success font-display text-xs font-bold animate-pulse">LEVEL 4</span>
                                <h4 className="font-bold text-lg text-white">Ödeme ve Onay</h4>
                            </div>
                            <p className="text-xs text-gray-300">İşlemi onaylayın ve bildirimi alın.</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-warning bg-background-light shadow-neon-warning shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <span className="material-icons text-warning text-lg">currency_exchange</span>
                        </div>
                        <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] glass-panel p-3 rounded-xl border border-warning/50 hover:shadow-neon-warning transition-all">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-warning font-display text-xs font-bold animate-pulse">LEVEL 5</span>
                                <h4 className="font-bold text-lg text-white">Transfer</h4>
                            </div>
                            <p className="text-xs text-gray-300">Kazanımlarınız cüzdanınıza aktarılsın.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
