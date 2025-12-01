-- Drop the overly permissive SELECT policy that exposes all PIN hashes
DROP POLICY IF EXISTS "Authenticated users can read profile pins" ON public.profile_pins;

-- No SELECT policy is needed because:
-- 1. PIN verification is handled by the verify_profile_pin() SECURITY DEFINER function
-- 2. Users should never directly read PIN hashes
-- 3. The security definer function bypasses RLS to perform verification securely