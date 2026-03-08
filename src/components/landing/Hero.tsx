import React from 'react';
import { landingData } from '../../data/mockData';

export const Hero: React.FC = () => {
    return (
        <section className="relative overflow-hidden pt-8 pb-16 px-4 dark:bg-[#102216] bg-[#f6f8f6] gradient-glow">
            <div className="max-w-md mx-auto">
                <div className="flex flex-col gap-6 items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13ec5b]/10 border border-[#13ec5b]/20">
                        <span className="material-symbols-outlined text-[#13ec5b] text-sm">{landingData.hero.badge.icon}</span>
                        <span className="text-[#13ec5b] text-xs font-bold uppercase tracking-wider">{landingData.hero.badge.text}</span>
                    </div>

                    <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold leading-[1.1] tracking-tight">
                        {landingData.hero.title}
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        {landingData.hero.subtitle}
                    </p>

                    <div className="flex flex-col w-full gap-3 mt-4">
                        <button className="w-full bg-[#13ec5b] text-[#102216] h-14 rounded-xl font-extrabold text-lg shadow-lg shadow-[#13ec5b]/20 flex items-center justify-center gap-2">
                            {landingData.hero.ctaStart} <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                        <button className="w-full border-2 border-slate-200 dark:border-[#13ec5b]/30 text-slate-900 dark:text-white h-14 rounded-xl font-extrabold text-lg">
                            {landingData.hero.ctaSecondary}
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex w-full gap-4 mt-8">
                        {landingData.hero.trustBadges.map((badge, idx) => (
                            <div key={idx} className="flex-1 glass-card p-4 rounded-xl">
                                <span className="material-symbols-outlined text-[#13ec5b] mb-2">{badge.icon}</span>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{badge.label}</p>
                                <p className="text-slate-900 dark:text-white text-sm font-bold">{badge.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
