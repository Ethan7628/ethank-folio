-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contacts;

-- Create a new PERMISSIVE policy for public INSERT
CREATE POLICY "Anyone can submit contact form" 
ON contacts 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Ensure the SELECT policy is correct (admin-only access)
DROP POLICY IF EXISTS "Only admins can view contacts" ON contacts;

CREATE POLICY "Only admins can view contacts" 
ON contacts 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));