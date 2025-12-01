-- Block anonymous users from reading failed_pin_attempts
CREATE POLICY "No anonymous access to failed pin attempts"
ON public.failed_pin_attempts
FOR SELECT
TO anon
USING (false);

-- Block anonymous users from inserting
CREATE POLICY "No anonymous insert to failed pin attempts"
ON public.failed_pin_attempts
FOR INSERT
TO anon
WITH CHECK (false);