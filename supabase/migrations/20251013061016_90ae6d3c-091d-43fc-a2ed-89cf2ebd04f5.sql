-- Create table for storing OTP codes
CREATE TABLE public.otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '10 minutes'),
  verified BOOLEAN DEFAULT FALSE
);

-- Index for faster lookups
CREATE INDEX idx_otp_codes_user_id ON public.otp_codes(user_id);
CREATE INDEX idx_otp_codes_email ON public.otp_codes(email);

-- Enable RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- RLS policies for otp_codes
CREATE POLICY "Users can view their own OTP codes"
  ON public.otp_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own OTP codes"
  ON public.otp_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create table for profile PINs
CREATE TABLE public.profile_pins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_name TEXT UNIQUE NOT NULL,
  pin_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default PINs (hashed)
INSERT INTO public.profile_pins (profile_name, pin_hash) VALUES
  ('recruiter', crypt('2026', gen_salt('bf'))),
  ('adventure', crypt('2025', gen_salt('bf'))),
  ('friends', crypt('2025', gen_salt('bf'))),
  ('family', crypt('2025', gen_salt('bf')));

-- Enable RLS
ALTER TABLE public.profile_pins ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read PINs (for verification)
CREATE POLICY "Authenticated users can read profile pins"
  ON public.profile_pins FOR SELECT
  TO authenticated
  USING (true);

-- Create table for tracking failed PIN attempts
CREATE TABLE public.failed_pin_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  profile_name TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  attempt_count INTEGER DEFAULT 1,
  last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_failed_attempts_user_id ON public.failed_pin_attempts(user_id);
CREATE INDEX idx_failed_attempts_email ON public.failed_pin_attempts(email);

-- Enable RLS
ALTER TABLE public.failed_pin_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own attempts
CREATE POLICY "Users can view their own failed attempts"
  ON public.failed_pin_attempts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own attempts
CREATE POLICY "Users can insert their own failed attempts"
  ON public.failed_pin_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to verify PIN
CREATE OR REPLACE FUNCTION public.verify_profile_pin(
  profile_name_input TEXT,
  pin_input TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT pin_hash INTO stored_hash
  FROM public.profile_pins
  WHERE profile_name = LOWER(profile_name_input);
  
  IF stored_hash IS NULL THEN
    RETURN FALSE;
  END IF;
  
  RETURN (stored_hash = crypt(pin_input, stored_hash));
END;
$$;