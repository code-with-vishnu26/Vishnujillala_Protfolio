-- Force RLS even for table owner
ALTER TABLE public.failed_pin_attempts FORCE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Block all select on failed_pin_attempts" ON public.failed_pin_attempts;
DROP POLICY IF EXISTS "Block all insert on failed_pin_attempts" ON public.failed_pin_attempts;
DROP POLICY IF EXISTS "Block all update on failed_pin_attempts" ON public.failed_pin_attempts;
DROP POLICY IF EXISTS "Block all delete on failed_pin_attempts" ON public.failed_pin_attempts;

-- Create explicit policies for anon role
CREATE POLICY "Deny anon select failed_pin_attempts"
ON public.failed_pin_attempts
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Deny anon insert failed_pin_attempts"
ON public.failed_pin_attempts
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Deny anon update failed_pin_attempts"
ON public.failed_pin_attempts
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Deny anon delete failed_pin_attempts"
ON public.failed_pin_attempts
FOR DELETE
TO anon
USING (false);

-- Create explicit policies for authenticated role
CREATE POLICY "Deny authenticated select failed_pin_attempts"
ON public.failed_pin_attempts
FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "Deny authenticated insert failed_pin_attempts"
ON public.failed_pin_attempts
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "Deny authenticated update failed_pin_attempts"
ON public.failed_pin_attempts
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "Deny authenticated delete failed_pin_attempts"
ON public.failed_pin_attempts
FOR DELETE
TO authenticated
USING (false);