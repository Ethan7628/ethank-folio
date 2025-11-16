-- Fix PUBLIC_DATA_EXPOSURE: Update RLS policy to require admin role
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can view all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow reading contacts" ON public.contacts;

-- Allow anyone to insert contacts (public contact form)
CREATE POLICY "Anyone can submit contact form"
ON public.contacts
FOR INSERT
WITH CHECK (true);

-- Only admins can view contacts
CREATE POLICY "Only admins can view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add database constraints for input validation
ALTER TABLE public.contacts
  ADD CONSTRAINT check_name_length CHECK (char_length(name) > 0 AND char_length(name) <= 100),
  ADD CONSTRAINT check_email_length CHECK (char_length(email) > 0 AND char_length(email) <= 255),
  ADD CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT check_message_length CHECK (char_length(message) > 0 AND char_length(message) <= 2000),
  ADD CONSTRAINT check_phone_length CHECK (phone IS NULL OR char_length(phone) <= 20),
  ADD CONSTRAINT check_company_length CHECK (company IS NULL OR char_length(company) <= 100),
  ADD CONSTRAINT check_purpose_length CHECK (purpose IS NULL OR char_length(purpose) <= 100);