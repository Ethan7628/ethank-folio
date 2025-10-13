-- Fix security: Set immutable search_path for notify_new_contact function
DROP FUNCTION IF EXISTS public.notify_new_contact() CASCADE;

CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $function$
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
      'purpose', NEW.purpose,
      'created_at', NEW.created_at
    )::text
  );
  
  RETURN NEW;
END;
$function$;

-- Recreate the trigger
CREATE TRIGGER on_contact_created
  AFTER INSERT ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_contact();