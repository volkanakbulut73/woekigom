import { Star, Shield, Diamond } from 'lucide-react';

export type BadgeType = 'silver' | 'gold' | 'diamond' | 'none';

export interface BadgeInfo {
    type: BadgeType;
    label: string;
    icon: React.ReactNode;
    colorClasses: string;
    bgClasses: string;
    borderClasses: string;
}

export const getSupporterBadge = (transactionCount: number): BadgeInfo => {
    if (transactionCount >= 40) {
        return {
            type: 'diamond',
            label: 'Pırlanta Kalpli Üye',
            icon: <Diamond size={14} className="fill-current" />,
            colorClasses: 'text-cyan-400',
            bgClasses: 'bg-cyan-500/10',
            borderClasses: 'border-cyan-500/20'
        };
    } else if (transactionCount >= 20) {
        return {
            type: 'gold',
            label: 'Altın Kalpli Üye',
            icon: <Star size={14} className="fill-current" />,
            colorClasses: 'text-yellow-400',
            bgClasses: 'bg-yellow-500/10',
            borderClasses: 'border-yellow-500/20'
        };
    } else if (transactionCount >= 1) {
        return {
            type: 'silver',
            label: 'Gümüş Kalpli Üye',
            icon: <Shield size={14} className="fill-current" />,
            colorClasses: 'text-slate-300',
            bgClasses: 'bg-slate-400/10',
            borderClasses: 'border-slate-400/20'
        };
    }

    return {
        type: 'none',
        label: 'Yeni Üye',
        icon: null,
        colorClasses: 'text-slate-500',
        bgClasses: 'bg-slate-500/10',
        borderClasses: 'border-slate-500/20'
    };
};

// Temporary mock function for UI development
export const getMockTransactionCount = (userId: string | undefined): number => {
    if (!userId) return 0;

    // Create a deterministic pseudo-random number based on the user ID string
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Map to a reasonable number between 0 and 80
    return Math.abs(hash) % 80;
};
