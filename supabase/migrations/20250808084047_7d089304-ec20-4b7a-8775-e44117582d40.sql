-- Create trigger to automatically send email notifications when new contacts are inserted
CREATE TRIGGER notify_new_contact_trigger
  AFTER INSERT ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_contact();