import { Bell, Check, Lock, Trophy, Grid, CreditCard, ArrowRightLeft, User, Search } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-[#0a0b1e] min-h-screen text-gray-100 font-sans pb-24 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39ff14] opacity-[0.02] rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-md mx-auto p-5 space-y-8 relative z-10">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-[#39ff14]/30 flex items-center justify-center p-1 relative z-10">
                            <div className="w-full h-full rounded-full border border-[#39ff14] flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                                <Search size={20} className="text-[#39ff14]" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="text-xl font-black text-[#39ff14] italic tracking-wider">WORKIGOM</h1>
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-[0.2em] mt-0.5">Cyber-Finance Hub</p>
                    </div>

                    <button className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all">
                        <Bell size={20} className="text-[#39ff14]" />
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Savings Card */}
                    <div className="glass-card rounded-2xl p-5 hover-glow border-[#39ff14]/20 group relative overflow-hidden">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Total Savings</p>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-3">$1,240.50</h2>
                        <div className="flex items-center text-[#39ff14] text-xs font-bold">
                            <ArrowRightLeft className="w-3 h-3 mr-1 -rotate-45" /> +12.4%
                        </div>
                        {/* Subtle inner glow */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#39ff14] opacity-5 rounded-full blur-2xl group-hover:opacity-[0.07]"></div>
                    </div>

                    {/* Points Card */}
                    <div className="glass-card rounded-2xl p-5 hover-glow border-gray-800 group relative overflow-hidden">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Active Points</p>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-3 flex items-baseline">
                            4,850 <span className="text-xs font-bold text-[#39ff14] ml-1 tracking-widest">WP</span>
                        </h2>
                        <div className="flex items-center text-[#39ff14] text-xs font-bold">
                            <span className="w-2.5 h-3 mr-1">⚡</span> +520
                        </div>
                    </div>
                </div>

                {/* Tracking Timeline */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-100 flex items-center">
                            Active Transaction Tracker
                        </h3>
                        <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-md bg-[#39ff14] bg-opacity-[0.05] text-[#39ff14] border border-[#39ff14]/30 shadow-[0_0_10px_rgba(57,255,20,0.1)]">
                            LIVE_FEED
                        </span>
                    </div>

                    <div className="glass-card border-gray-800 rounded-3xl p-6 relative overflow-hidden text-sm">
                        {/* Stream 1 - Completed */}
                        <div className="flex gap-4 relative">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-[#39ff14] flex items-center justify-center text-[#0a0b1e] light-burst z-10 shrink-0">
                                    <Check size={18} strokeWidth={3} />
                                </div>
                                <div className="w-[2px] h-14 neon-pulse-stream"></div>
                            </div>
                            <div className="pt-1 pb-6 w-full">
                                <p className="font-bold text-gray-100 text-base">Order Confirmed</p>
                                <p className="text-[13px] text-gray-500 font-medium">Sushi Hub • 14:02 PM</p>
                            </div>
                        </div>

                        {/* Stream 2 - Active */}
                        <div className="flex gap-4 relative">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-transparent border-[2.5px] border-[#39ff14] flex items-center justify-center text-[#39ff14] breathing-halo z-10 shrink-0 relative bg-[#0a0b1e]">
                                    <div className="w-2.5 h-2.5 bg-[#39ff14] rounded-full"></div>
                                </div>
                                <div className="w-[2px] h-14 bg-gray-800/80"></div>
                            </div>
                            <div className="pt-1 pb-6 w-full">
                                <p className="font-bold text-[#39ff14] text-base">Card Sharing Network</p>
                                <p className="text-[13px] text-gray-500 font-medium mb-3">In progress • 4 Peers matching...</p>

                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-[#39ff14] w-[60%] shadow-[0_0_10px_rgba(57,255,20,0.8)]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Stream 3 - Locked */}
                        <div className="flex gap-4 relative">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-transparent border-2 border-gray-700 flex items-center justify-center text-gray-600 z-10 shrink-0 bg-[#0a0b1e]">
                                    <Lock size={14} />
                                </div>
                            </div>
                            <div className="pt-1 w-full">
                                <p className="font-bold text-gray-600 text-base">Cashback Settlement</p>
                                <p className="text-[13px] text-gray-700 font-medium tracking-wide">Locked until confirmation</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard */}
                <div>
                    <h3 className="text-xl text-gray-100 font-bold tracking-tight mb-5 flex items-center gap-2">
                        <Trophy className="text-[#ffd700] w-5 h-5" />
                        Global Leaderboard
                    </h3>

                    <div className="space-y-3">
                        {/* 1st Place */}
                        <div className="flex items-center gap-4 p-4 rounded-xl glass-card border-[#ffd700]/30 hover-glow group transition-all">
                            <div className="w-6 text-xl font-black italic text-[#ffd700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">1</div>
                            <img className="w-11 h-11 rounded-full border-2 border-[#ffd700] object-cover" alt="User 1" src="https://ui-avatars.com/api/?name=CyberRunner+99&background=0a0b1e&color=fff&rounded=true" />
                            <div className="flex-1">
                                <p className="text-gray-100 font-bold text-[15px]">CyberRunner_99</p>
                                <p className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase">Diamond Tier</p>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-[15px] text-[#ffd700]">24.5k<span className="text-[9px] text-gray-500 uppercase ml-1 block mt-0.5">Saved</span></p>
                            </div>
                        </div>

                        {/* 2nd Place */}
                        <div className="flex items-center gap-4 p-4 rounded-xl glass-card border-[#c0c0c0]/20 hover-glow group transition-all">
                            <div className="w-6 text-xl font-black italic text-[#c0c0c0] drop-shadow-[0_0_8px_rgba(192,192,192,0.3)]">2</div>
                            <img className="w-11 h-11 rounded-full border-2 border-[#c0c0c0] object-cover bg-teal-900/30 p-1" alt="User 2" src="https://ui-avatars.com/api/?name=NeonGhost&background=10b981&color=fff&rounded=true" />
                            <div className="flex-1">
                                <p className="text-gray-100 font-bold text-[15px]">NeonGhost</p>
                                <p className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase">Platinum Tier</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-200 font-black text-[15px]">19.2k<span className="text-[9px] text-gray-500 uppercase ml-1 block mt-0.5">Saved</span></p>
                            </div>
                        </div>

                        {/* 3rd Place */}
                        <div className="flex items-center gap-4 p-4 rounded-xl glass-card border-[#cd7f32]/20 hover-glow group transition-all">
                            <div className="w-6 text-xl font-black italic text-[#cd7f32] drop-shadow-[0_0_8px_rgba(205,127,50,0.3)]">3</div>
                            <img className="w-11 h-11 rounded-full border-2 border-[#cd7f32] object-cover bg-orange-900/30 p-1" alt="User 3" src="https://ui-avatars.com/api/?name=TokyoSlicer&background=F59E0B&color=fff&rounded=true" />
                            <div className="flex-1">
                                <p className="text-gray-100 font-bold text-[15px]">TokyoSlicer</p>
                                <p className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase">Gold Tier</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[#cd7f32] font-black text-[15px]">15.8k<span className="text-[9px] text-gray-500 uppercase ml-1 block mt-0.5">Saved</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Navbar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-card rounded-[2rem] px-8 py-4 flex items-center justify-between z-50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border-gray-800">
                <div className="w-12 h-12 bg-[#39ff14] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:scale-105 transition-transform cursor-pointer cursor-pointer">
                    <Grid size={22} className="text-[#0a0b1e]" />
                </div>
                <CreditCard size={22} className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer" />
                <ArrowRightLeft size={22} className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer" />
                <User size={22} className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer" />
            </div>

        </div>
    );
};

export default Home;
