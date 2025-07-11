
-- Create contacts table for form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  source TEXT DEFAULT 'portfolio_form'
);

-- Create analytics table for tracking user interactions
CREATE TABLE public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  section TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts (public can insert, admin can view all)
CREATE POLICY "Anyone can submit contact forms" 
  ON public.contacts 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can insert analytics" 
  ON public.analytics 
  FOR INSERT 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX contacts_created_at_idx ON public.contacts(created_at DESC);
CREATE INDEX contacts_status_idx ON public.contacts(status);
CREATE INDEX analytics_event_type_idx ON public.analytics(event_type);
CREATE INDEX analytics_created_at_idx ON public.analytics(created_at DESC);
