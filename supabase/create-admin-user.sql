
-- This SQL script can be run in the Supabase SQL Editor to create an admin user
-- Replace 'admin@example.com' and 'secure_password' with actual values

-- First, create a user in auth.users
-- Note: Running this directly might not work due to auth schema restrictions
-- Use the Supabase dashboard or API to create the user first, then run:

-- After creating the user via UI or API, update their profile to have admin role
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@example.com');

-- Alternatively, if your auth service supports it, use:
-- SELECT set_config('request.jwt.claim.role', 'service_role', true);
-- INSERT INTO auth.users (email, password) VALUES ('admin@example.com', 'secure_password');
-- UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'admin@example.com';
-- INSERT INTO public.profiles (id, role, full_name) 
-- VALUES ((SELECT id FROM auth.users WHERE email = 'admin@example.com'), 'admin', 'Admin User');
