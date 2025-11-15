-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop and recreate the verify function to ensure it works correctly
DROP FUNCTION IF EXISTS public.verify_profile_pin(text, text);

CREATE OR REPLACE FUNCTION public.verify_profile_pin(profile_name_input text, pin_input text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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

-- Clear existing PINs and insert correct ones with proper bcrypt hashing
DELETE FROM public.profile_pins;

INSERT INTO public.profile_pins (profile_name, pin_hash) VALUES
  ('recruiter', crypt('1234', gen_salt('bf'))),
  ('adventure', crypt('5678', gen_salt('bf'))),
  ('friends', crypt('9012', gen_salt('bf'))),
  ('family', crypt('3456', gen_salt('bf')));