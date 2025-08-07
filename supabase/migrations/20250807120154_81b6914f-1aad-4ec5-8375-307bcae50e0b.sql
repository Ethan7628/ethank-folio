-- Update RLS policies for contacts table to allow reading
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contacts;

-- Allow inserting contact forms
CREATE POLICY "Anyone can submit contact forms" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Allow reading contacts (for dashboard access)
CREATE POLICY "Allow reading contacts" 
ON public.contacts 
FOR SELECT 
USING (true);

-- Create function to send email notification via edge function
CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function to send email notification
  PERFORM net.http_post(
    url := 'https://jhsboffiiylfiqakjkri.supabase.co/functions/v1/send-contact-notification',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
    body := json_build_object(
      'id', NEW.id,
      'name', NEW.name,
      'email', NEW.email,
      'message', NEW.message,
      'phone', NEW.phone,
      'company', NEW.company,
      'created_at', NEW.created_at
    )::text
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;