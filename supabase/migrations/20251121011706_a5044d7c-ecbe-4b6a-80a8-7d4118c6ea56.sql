-- Fix RLS policies for contacts table to allow public anonymous submissions
-- Drop the restrictive authenticated-only policies that are blocking anonymous inserts
DROP POLICY IF EXISTS "Allow authenticated inserts" ON contacts;
DROP POLICY IF EXISTS "contacts_insert_authenticated" ON contacts;

-- The contacts_insert_anon_public policy already has good validation and should work
-- Make sure RLS is enabled
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Verify the existing anonymous insert policy is permissive (not restrictive)
-- If it exists, we're good. If not, create it.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contacts' 
    AND policyname = 'contacts_insert_anon_public'
  ) THEN
    CREATE POLICY "contacts_insert_anon_public"
      ON contacts
      FOR INSERT
      WITH CHECK (
        (name IS NOT NULL) AND 
        (char_length(name) > 0) AND 
        (char_length(name) <= 100) AND 
        (email IS NOT NULL) AND 
        (char_length(email) > 0) AND 
        (char_length(email) <= 255) AND 
        (message IS NOT NULL) AND 
        (char_length(message) > 0) AND 
        (char_length(message) <= 2000) AND 
        ((phone IS NULL) OR (char_length(phone) <= 20)) AND 
        ((company IS NULL) OR (char_length(company) <= 100)) AND 
        ((purpose IS NULL) OR (char_length(purpose) <= 100)) AND 
        ((status IS NULL) OR (status = 'new'::text))
      );
  END IF;
END $$;