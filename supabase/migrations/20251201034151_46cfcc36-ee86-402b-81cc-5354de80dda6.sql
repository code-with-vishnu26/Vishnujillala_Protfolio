-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can view their own OTP codes" ON public.otp_codes;

-- Block all SELECT operations - OTP verification happens via edge function only
CREATE POLICY "Block all select on otp_codes"
ON public.otp_codes
FOR SELECT
USING (false);

-- Also block direct INSERT - OTP codes should only be created by edge functions
DROP POLICY IF EXISTS "Users can insert their own OTP codes" ON public.otp_codes;

CREATE POLICY "Block all insert on otp_codes"
ON public.otp_codes
FOR INSERT
WITH CHECK (false);