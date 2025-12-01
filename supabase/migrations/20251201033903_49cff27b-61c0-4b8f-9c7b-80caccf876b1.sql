-- Remove the authenticated user SELECT policy - users don't need to read their failed attempts directly
DROP POLICY IF EXISTS "Users can view their own failed attempts" ON public.failed_pin_attempts;

-- Replace with a policy that blocks all authenticated user SELECT access
CREATE POLICY "No direct access to failed attempts"
ON public.failed_pin_attempts
FOR SELECT
TO authenticated
USING (false);

-- Also update INSERT - failed attempts should only be logged by service role/edge functions
DROP POLICY IF EXISTS "Users can insert their own failed attempts" ON public.failed_pin_attempts;

CREATE POLICY "No direct insert to failed attempts"
ON public.failed_pin_attempts
FOR INSERT
TO authenticated
WITH CHECK (false);