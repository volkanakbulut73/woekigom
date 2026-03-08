import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { landingData } from '../../data/mockData';

export const HowItWorks: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    return (
        <section className="bg-white dark:bg-[#102216] py-20 px-4 overflow-hidden relative" ref={ref}>
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 dark:bg-blue-900 animate-blob"></div>
            <div className="absolute top-40 left-0 -ml-20 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 dark:bg-pink-900 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 dark:bg-green-900 animate-blob animation-delay-4000"></div>

            <div className="max-w-xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-bold text-sm tracking-wide">
                        Sistem
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black mb-2 tracking-tight">
                        {landingData.howItWorks.title}
                    </h2>
                    <p className="text-slate-500 text-lg max-w-sm mx-auto">
                        {landingData.howItWorks.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-12 relative"
                >
                    {/* Timeline Line */}
                    <div className="absolute left-[2.25rem] top-8 bottom-8 w-1 bg-gradient-to-b from-blue-100 via-green-100 to-pink-100 dark:from-blue-900/30 dark:via-green-900/30 dark:to-pink-900/30 rounded-full"></div>

                    {landingData.howItWorks.steps.map((step) => (
                        <motion.div
                            key={step.number}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="relative flex gap-6 items-center group cursor-pointer"
                        >
                            <div className={`z-10 flex size-[4.5rem] shrink-0 items-center justify-center rounded-2xl font-black text-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-rotate-3 ${step.color}`}>
                                {step.number}
                            </div>
                            <div className="bg-white dark:bg-[#102216] border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm group-hover:shadow-md transition-shadow flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`size-10 rounded-xl flex items-center justify-center ${step.color.replace('shadow-md', '')}`}>
                                        <span className="material-symbols-outlined text-[20px]">
                                            {step.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-xl">{step.title}</h3>
                                </div>
                                <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
