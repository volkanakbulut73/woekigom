export const Market = () => {
    return (
        <section className="py-8 bg-[#0F0F1A] relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-1 block glow-text">WORKİGOM MARKET</span>
                    <h2 className="font-display text-2xl md:text-3xl font-black text-white glow-text drop-shadow-lg">
                        YEMEK KARTINIZLA <span className="text-accent">ALIŞVERİŞ</span> YAPABİLİRSİNİZ
                    </h2>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 w-full justify-start md:justify-center">
                        <button className="whitespace-nowrap bg-[#00F0FF] text-[#05050A] font-bold px-4 py-1.5 rounded-full text-sm border border-[#00F0FF] cursor-pointer">Tüm İlanlar</button>
                        <button className="whitespace-nowrap bg-transparent text-gray-300 px-4 py-1.5 rounded-full text-sm border border-gray-600 hover:border-accent hover:text-accent transition-colors cursor-pointer">Gıda</button>
                        <button className="whitespace-nowrap bg-transparent text-gray-300 px-4 py-1.5 rounded-full text-sm border border-gray-600 hover:border-accent hover:text-accent transition-colors cursor-pointer">Elektronik</button>
                        <button className="whitespace-nowrap bg-transparent text-gray-300 px-4 py-1.5 rounded-full text-sm border border-gray-600 hover:border-accent hover:text-accent transition-colors cursor-pointer">Tekstil</button>
                        <button className="whitespace-nowrap bg-transparent text-gray-300 px-4 py-1.5 rounded-full text-sm border border-gray-600 hover:border-accent hover:text-accent transition-colors cursor-pointer">Hediye Kartları</button>
                        <button className="whitespace-nowrap bg-transparent text-gray-300 px-4 py-1.5 rounded-full text-sm border border-gray-600 hover:border-accent hover:text-accent transition-colors cursor-pointer">Kuponlar</button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 font-display tracking-wider text-center w-full">ve daha birçok ürün kategorisi</p>
                </div>

                <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
                    {/* Item 1 */}
                    <div className="min-w-[260px] w-[260px] snap-center glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-accent/50 transition-colors">
                        <div className="relative h-40 bg-gray-800">
                            <img alt="Tripod" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeo1SVb0wxTo0ZBgFAyRADX_DPldGY1havj4npx-KzQP4UDCmDpLfTtpnBbg6uMiRu7dt7vFBIKt88hEumN7BF5w8I2JQB90sxTGWZGAXF3Qmy-2QumeWXUpDrbiJe6rPwC5mXqbbP725M1qrj_89nYS3Zxa1Yfx0tkOKfzwjxTZ40mS-1Pz2HFUzRkCsEXZhIRQgK-hEnMU8L81EjdKYUVo2JWu37V0-qGEw1ifaSS5O5CKsvAAtfSMXZ2pwROqO4m4id2St0Xg9N" />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-warning px-2 py-0.5 rounded flex items-center gap-1 text-xs font-bold">
                                <span className="material-icons text-[12px]">star</span> 5
                            </div>
                            <div className="absolute bottom-2 left-2 bg-[#1B2A3B]/80 backdrop-blur text-accent px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-accent/30">
                                İLAN
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between bg-[#151522]">
                            <h3 className="font-bold text-sm text-white mb-2 line-clamp-2">Siyah Renk Işıklı Bluetooth Kumandalı Dikey ve Yatay...</h3>
                            <div className="flex items-end justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-600 overflow-hidden">
                                        <img alt="Seller" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBroJFsjZJMvuYMIE0VnH2wJUseajPfjn2mrcy0Z4-4oOFbv0CAGm85m0YIKPAAUwjSVMP7JknJ1ZOwKq5WF8NJqOBSBMNpn9qcJ90wMHQqdF174ZtB0d1HlzvcrHMcyCnBhTIaFTeXwnLorTOkALx24cuNZmHyPzFjrTcDNRaIxoByauVeEcShSkNk-icE840wyqqkXJ_vF6i2KcfJaDnRPOy8ePe58YYoZaPXOlLopsH3E1Ybi8QzPe0Q0YD07aD-BMZLvfFrFeMF" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 uppercase">SATICI</span>
                                        <span className="text-xs font-bold text-white leading-tight">hasan iki</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-gray-500 uppercase">FİYAT</span>
                                    <span className="text-accent font-bold text-base leading-tight">₺400</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="min-w-[260px] w-[260px] snap-center glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-accent/50 transition-colors">
                        <div className="relative h-40 bg-gray-800">
                            <img alt="Jacket" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkpUwxVWOhtK8qSWvPfge16UPue6eLX3WQEA8sysWDnOH1nfRZsPeuZOmECztFEtmnA5L26EKdj-pr_eaPaNAIQ7nE-5PDLH2mVZxzzcXw3SXmwaaFMeVqlT-iTOcyOki5-R4BzDMlNHeISurZvGUGKk2Uwi1S8a8fwPY9UMp7D5VdlXOm7Kf6TvZhyyHgTitHCnSNcyJ0nHm6RN-8RyTb9vjHDkoOiDMagcO1J2IH9zmBwnKxD0QJ5GTfZus4nGEVmMQj_w3LmSTD" />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-warning px-2 py-0.5 rounded flex items-center gap-1 text-xs font-bold">
                                <span className="material-icons text-[12px]">star</span> 5
                            </div>
                            <div className="absolute bottom-2 left-2 bg-[#1B2A3B]/80 backdrop-blur text-accent px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-accent/30">
                                İLAN
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between bg-[#151522]">
                            <h3 className="font-bold text-sm text-white mb-2 line-clamp-2">ERKEK SUNNİ DERİ MONT</h3>
                            <div className="flex items-end justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-600 overflow-hidden">
                                        <img alt="Seller" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZD5m_jY8gl40HteM3pCaDLfzgWoR5z-PtFPna3kBW2LmVhjBxve6qtfv54qzF5yGooJuz6I9PQbmqdaXhI9n0swsuBJGu3DgnJCWZ5J5eBARyT8bkkrBQh9iiG2PXtcxWDp8ZcIKQOxPsx_5qrHHEUHMxr6Jb3WP9MvnkIrt8RhybyefnJN0J1z_XnYtSqsy00dvNwTHtG_0RK7qxy-saqYCx2q0KIi9cbWbRbVgEwtQxPL3-FhCcaQieVsAGsLH7GbIhnrSgkNll" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 uppercase">SATICI</span>
                                        <span className="text-xs font-bold text-white leading-tight">hasan iki</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-gray-500 uppercase">FİYAT</span>
                                    <span className="text-accent font-bold text-base leading-tight">₺6.000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="min-w-[260px] w-[260px] snap-center glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-accent/50 transition-colors">
                        <div className="relative h-40 bg-gray-800">
                            <img alt="Bracelet" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBobzTERv8KxCARXVDt1An_ihLfLV0uRJlAha2lvazrXv5oT8uPxfEMn4fMqL_PcKHKHDW5rz5xKwwCG4W6aIfPGQaZQtbMeo8E2d9TayHtDVXIzvCOtr0jodSnzpyyPo4suoivQ9hvm1pcP5ozhA70aNJ21f6mZEw4chkJOc6eHRxYz7D9cMescpVEsdEbVOALburz8VsI8NleeKHrHuTbVFHx5TKiQd3p2378epuC19JbJoSJeKxfPEmtnFp_2nf7-CMm95g3A0hA" />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-warning px-2 py-0.5 rounded flex items-center gap-1 text-xs font-bold">
                                <span className="material-icons text-[12px]">star</span> 5
                            </div>
                            <div className="absolute bottom-2 left-2 bg-[#1B2A3B]/80 backdrop-blur text-accent px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-accent/30">
                                İLAN
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between bg-[#151522]">
                            <h3 className="font-bold text-sm text-white mb-2 line-clamp-2">muhteşem bileklik</h3>
                            <div className="flex items-end justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                                        MA
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 uppercase">SATICI</span>
                                        <span className="text-xs font-bold text-white leading-tight">mehmet ahmet</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-gray-500 uppercase">FİYAT</span>
                                    <span className="text-accent font-bold text-base leading-tight">₺35.000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="min-w-[260px] w-[260px] snap-center glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-accent/50 transition-colors">
                        <div className="relative h-40 bg-gray-800">
                            <img alt="Taze Kaşar Peyniri" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPow804Bx8v_kBENsIfk8KpGA3p_J485Xwl2hvdAq182m-YZkaeW6pO80u8l-qUBfjws4l5q73PKUX90otampPfIiBWZgF8UtrK8m5-YwHEH8IviJVUFgbLz8t-6dt8nTSSyIuP9FVhGpcp-xsWqqFwj4QNkj8FtIMtw2gln72XsRmBhm1sqBWh1diLMPUxuTcYa5vws-rvlbdaeBC6Da7F04s8ZnU0wa1fzexN7n31N3BpD9jRbetb8_sRXsQwBjyLs8V3tVJuYif" />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-warning px-2 py-0.5 rounded flex items-center gap-1 text-xs font-bold">
                                <span className="material-icons text-[12px]">star</span> 5
                            </div>
                            <div className="absolute bottom-2 left-2 bg-[#1B2A3B]/80 backdrop-blur text-accent px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-accent/30">
                                İLAN
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between bg-[#151522]">
                            <h3 className="font-bold text-sm text-white mb-2 line-clamp-2">Taze Kaşar Peyniri</h3>
                            <div className="flex items-end justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                                        AY
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 uppercase">SATICI</span>
                                        <span className="text-xs font-bold text-white leading-tight">ayşe yılmaz</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-gray-500 uppercase">FİYAT</span>
                                    <span className="text-accent font-bold text-base leading-tight">₺250</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
