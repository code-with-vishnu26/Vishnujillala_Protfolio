-- Add PERMISSIVE policies that explicitly deny all access to profile_pins table
-- RESTRICTIVE policies alone are not sufficient - we need at least one PERMISSIVE policy

-- Add permissive policy to deny SELECT for anonymous users
CREATE POLICY "deny_anon_select_profile_pins" 
ON public.profile_pins 
FOR SELECT 
TO anon
USING (false);

-- Add permissive policy to deny SELECT for authenticated users
CREATE POLICY "deny_authenticated_select_profile_pins" 
ON public.profile_pins 
FOR SELECT 
TO authenticated
USING (false);

-- Add permissive policy to deny INSERT for anonymous users
CREATE POLICY "deny_anon_insert_profile_pins" 
ON public.profile_pins 
FOR INSERT 
TO anon
WITH CHECK (false);

-- Add permissive policy to deny INSERT for authenticated users
CREATE POLICY "deny_authenticated_insert_profile_pins" 
ON public.profile_pins 
FOR INSERT 
TO authenticated
WITH CHECK (false);

-- Add permissive policy to deny UPDATE for anonymous users
CREATE POLICY "deny_anon_update_profile_pins" 
ON public.profile_pins 
FOR UPDATE 
TO anon
USING (false);

-- Add permissive policy to deny UPDATE for authenticated users
CREATE POLICY "deny_authenticated_update_profile_pins" 
ON public.profile_pins 
FOR UPDATE 
TO authenticated
USING (false);

-- Add permissive policy to deny DELETE for anonymous users
CREATE POLICY "deny_anon_delete_profile_pins" 
ON public.profile_pins 
FOR DELETE 
TO anon
USING (false);

-- Add permissive policy to deny DELETE for authenticated users
CREATE POLICY "deny_authenticated_delete_profile_pins" 
ON public.profile_pins 
FOR DELETE 
TO authenticated
USING (false);