-- Workigom Supabase Schema Initialization

-- 1. Create tables

-- Profiles Table
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name text NOT NULL,
  avatar_url text,
  rating numeric DEFAULT 5.0,
  location text,
  wallet_balance numeric DEFAULT 0,
  total_earnings numeric DEFAULT 0,
  iban text,
  referral_code text UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Transactions Table
CREATE TABLE public.transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  seeker_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  supporter_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  listing_title text NOT NULL,
  status text NOT NULL CHECK (status IN ('waiting-supporter', 'waiting-cash-payment', 'cash-paid', 'qr-uploaded', 'completed', 'cancelled', 'dismissed')),
  support_percentage int DEFAULT 20,
  qr_url text,
  created_at timestamptz DEFAULT now(),
  qr_uploaded_at timestamptz,
  completed_at timestamptz
);

-- Swap Listings Table
CREATE TABLE public.swap_listings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  required_balance numeric NOT NULL,
  photo_url text,
  location text,
  created_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swap_listings ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Transactions Policies
CREATE POLICY "Seeker can insert a transaction"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = seeker_id);

CREATE POLICY "Users can view transactions they are part of, or waiting ones"
  ON public.transactions FOR SELECT
  USING (
    auth.uid() = seeker_id OR 
    auth.uid() = supporter_id OR 
    status = 'waiting-supporter'
  );

CREATE POLICY "Users can update transactions they are part of"
  ON public.transactions FOR UPDATE
  USING (auth.uid() = seeker_id OR auth.uid() = supporter_id);

-- Swap Listings Policies
CREATE POLICY "Swap listings are viewable by everyone"
  ON public.swap_listings FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own swap listings"
  ON public.swap_listings FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own swap listings"
  ON public.swap_listings FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own swap listings"
  ON public.swap_listings FOR DELETE
  USING (auth.uid() = owner_id);

-- 4. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('qr-codes', 'qr-codes', true) ON CONFLICT DO NOTHING;

-- Storage Policies (Images)
CREATE POLICY "Images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Anyone can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.uid() = owner);
CREATE POLICY "Users can delete their images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.uid() = owner);

-- Storage Policies (QR Codes)
CREATE POLICY "QR Codes are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'qr-codes');
CREATE POLICY "Anyone can upload QR codes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'qr-codes' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their QR codes" ON storage.objects FOR UPDATE USING (bucket_id = 'qr-codes' AND auth.uid() = owner);
CREATE POLICY "Users can delete their QR codes" ON storage.objects FOR DELETE USING (bucket_id = 'qr-codes' AND auth.uid() = owner);
