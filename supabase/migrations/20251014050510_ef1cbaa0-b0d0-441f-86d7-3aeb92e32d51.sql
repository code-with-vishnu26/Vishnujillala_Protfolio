-- Ensure pgcrypto extension is enabled for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Clear existing PIN data and re-insert with proper hashing
TRUNCATE TABLE public.profile_pins;

-- Insert profile PINs with proper bcrypt hashing
-- recruiter: 1234
-- adventure: 5678
-- friends: 9012
-- family: 3456
INSERT INTO public.profile_pins (profile_name, pin_hash) VALUES
  ('recruiter', crypt('1234', gen_salt('bf'))),
  ('adventure', crypt('5678', gen_salt('bf'))),
  ('friends', crypt('9012', gen_salt('bf'))),
  ('family', crypt('3456', gen_salt('bf')));