-- Drop ALL existing policies on failed_pin_attempts
DROP POLICY IF EXISTS "Users can view their own failed attempts" ON public.failed_pin_attempts;
DROP POLICY IF EXISTS "Users can insert their own failed attempts" ON public.failed_pin_attempts;
DROP POLICY IF EXISTS "No anonymous access to failed pin attempts" ON public.failed_pin_attempts;
DROP POLICY IF EXISTS "No anonymous insert to failed pin attempts" ON public.failed_pin_attempts;
DROP POLICY IF EXISTS "No direct access to failed attempts" ON public.failed_pin_attempts;
DROP POLICY IF EXISTS "No direct insert to failed attempts" ON public.failed_pin_attempts;

-- Create PERMISSIVE policies that deny all access
-- When RLS is enabled and permissive policies return false, access is blocked
CREATE POLICY "Block all select on failed_pin_attempts"
ON public.failed_pin_attempts
FOR SELECT
USING (false);

CREATE POLICY "Block all insert on failed_pin_attempts"
ON public.failed_pin_attempts
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Block all update on failed_pin_attempts"
ON public.failed_pin_attempts
FOR UPDATE
USING (false);

CREATE POLICY "Block all delete on failed_pin_attempts"
ON public.failed_pin_attempts
FOR DELETE
USING (false);