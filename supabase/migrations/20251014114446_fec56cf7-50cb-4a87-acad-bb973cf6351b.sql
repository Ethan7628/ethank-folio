-- Drop the problematic trigger that causes JSON parsing errors
DROP TRIGGER IF EXISTS on_contact_created ON public.contacts;

-- Drop the notify_new_contact function as it has incorrect implementation
DROP FUNCTION IF EXISTS public.notify_new_contact();

-- Note: Email notifications should be handled through direct edge function calls from the client
-- or through a properly configured database webhook instead of using triggers with http_post