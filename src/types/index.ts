export type Profile = {
    id: string;
    full_name: string;
    avatar_url: string | null;
    rating: number;
    location: string | null;
    wallet_balance: number;
    total_earnings: number;
    iban: string | null;
    referral_code: string | null;
    created_at: string;
};

export type TransactionStatus =
    | 'waiting-supporter'
    | 'waiting-cash-payment'
    | 'cash-paid'
    | 'qr-uploaded'
    | 'completed'
    | 'cancelled'
    | 'dismissed';

export type Transaction = {
    id: string;
    seeker_id: string;
    supporter_id: string | null;
    amount: number;
    listing_title: string;
    status: TransactionStatus;
    support_percentage: number;
    qr_url: string | null;
    created_at: string;
    qr_uploaded_at: string | null;
    completed_at: string | null;
    profiles?: Partial<Profile>;
};

export type SwapListing = {
    id: string;
    owner_id: string;
    title: string;
    description: string | null;
    required_balance: number;
    photo_url: string | null;
    location: string | null;
    created_at: string;
    profiles?: Partial<Profile>;
};

export type Message = {
    id: string;
    swap_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    read: boolean;
    created_at: string;
    sender?: Partial<Profile>;
    receiver?: Partial<Profile>;
    listing?: Partial<SwapListing>;
};

export type Notification = {
    id: string;
    user_id: string;
    type: 'new_message' | 'system' | 'transaction';
    title: string;
    content: string;
    link?: string;
    read: boolean;
    created_at: string;
};
