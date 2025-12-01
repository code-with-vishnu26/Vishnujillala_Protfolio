-- Create an explicit SELECT policy that blocks all direct access
-- The verify_profile_pin() SECURITY DEFINER function bypasses RLS and handles verification securely
CREATE POLICY "No direct access to PIN hashes"
ON public.profile_pins
FOR SELECT
TO authenticated
USING (false);

-- Also block anonymous access explicitly
CREATE POLICY "No anonymous access to PIN hashes"
ON public.profile_pins
FOR SELECT
TO anon
USING (false);