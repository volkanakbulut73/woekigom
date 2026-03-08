import React from 'react';
import { landingData } from '../../data/mockData';

export const WhyJoin: React.FC = () => {
    return (
        <section className="py-16 px-4 bg-white dark:bg-[#102216]">
            <div className="max-w-md mx-auto">
                <h2 className="text-slate-900 dark:text-white text-3xl font-extrabold mb-8 text-center">{landingData.whyJoin.title}</h2>
                <div className="space-y-4">
                    {landingData.whyJoin.reasons.map((reason, idx) => (
                        <div key={idx} className="group p-6 rounded-2xl border border-slate-100 dark:border-[#13ec5b]/5 hover:shadow-xl transition-all duration-300 dark:bg-[#102216]">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="size-10 rounded-full bg-[#13ec5b]/20 flex items-center justify-center text-[#13ec5b]">
                                    <span className="material-symbols-outlined">{reason.icon}</span>
                                </div>
                                <h3 className="text-slate-900 dark:text-white font-bold text-xl">{reason.title}</h3>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
