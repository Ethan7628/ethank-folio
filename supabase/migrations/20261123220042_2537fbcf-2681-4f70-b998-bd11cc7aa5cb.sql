DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON public.contacts;
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.contacts;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contacts;
DROP POLICY IF EXISTS "Allow anonymous to view contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.contacts;
DROP POLICY IF EXISTS "contacts_select_authenticated" ON public.contacts;
DROP POLICY IF EXISTS "contacts_update_authenticated" ON public.contacts;
DROP POLICY IF EXISTS "contacts_delete_authenticated" ON public.contacts;

CREATE POLICY "Admins can read contacts" ON public.contacts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update contacts" ON public.contacts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete contacts" ON public.contacts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
REVOKE SELECT, UPDATE, DELETE ON public.contacts FROM anon;