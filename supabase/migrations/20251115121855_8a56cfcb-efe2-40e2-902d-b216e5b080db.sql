-- Recreate the verify function with explicit pgcrypto schema reference
DROP FUNCTION IF EXISTS public.verify_profile_pin(text, text);

CREATE OR REPLACE FUNCTION public.verify_profile_pin(profile_name_input text, pin_input text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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
  
  -- Use explicit extensions schema reference
  RETURN (stored_hash = extensions.crypt(pin_input, stored_hash));
END;
$$;