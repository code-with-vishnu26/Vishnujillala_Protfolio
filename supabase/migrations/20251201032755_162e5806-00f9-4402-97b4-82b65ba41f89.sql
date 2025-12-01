-- Drop the existing SELECT policy
DROP POLICY IF EXISTS "Users can view their own failed attempts" ON public.failed_pin_attempts;

-- Create a more explicit policy that requires authentication
CREATE POLICY "Users can view their own failed attempts"
ON public.failed_pin_attempts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Also update the INSERT policy to be explicit about authentication
DROP POLICY IF EXISTS "Users can insert their own failed attempts" ON public.failed_pin_attempts;

CREATE POLICY "Users can insert their own failed attempts"
ON public.failed_pin_attempts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);