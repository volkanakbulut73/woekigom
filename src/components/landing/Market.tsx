import React from 'react';
import { landingData } from '../../data/mockData';

export const Market: React.FC = () => {
    return (
        <section className="py-16 px-4 bg-slate-50 dark:bg-[#102216]/50">
            <div className="max-w-md mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-3xl font-extrabold">{landingData.market.title}</h2>
                        <p className="text-[#13ec5b] font-bold">{landingData.market.subtitle}</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">arrow_outward</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {landingData.market.cards.map((card, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#102216] border border-slate-200 dark:border-[#13ec5b]/10 p-5 rounded-2xl shadow-sm">
                            <div className="bg-[#13ec5b]/10 size-12 rounded-xl flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-[#13ec5b]">{card.icon}</span>
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-bold mb-1">{card.title}</h3>
                            <p className="text-slate-500 text-xs">{card.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 bg-gradient-to-r from-[#13ec5b]/20 to-[#13ec5b]/5 p-6 rounded-2xl border border-[#13ec5b]/20 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-extrabold text-lg">{landingData.market.premium.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{landingData.market.premium.description}</p>
                    </div>
                    <button className="bg-[#13ec5b] text-[#102216] px-4 py-2 rounded-lg text-xs font-black uppercase">
                        {landingData.market.premium.cta}
                    </button>
                </div>
            </div>
        </section>
    );
};
