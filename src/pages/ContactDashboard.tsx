import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCard, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Building, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { CONTACT_INFO } from '@/config/constants';
import type { User } from '@supabase/supabase-js';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  created_at: string;
  status?: string;
}

export const ContactDashboard: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchContacts = React.useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setContacts(data || []);
    } catch (error) {
      logger.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Check authentication and admin role
  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the dashboard.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setUser(user);

      // Check if user has admin role
      const { data: hasAdminRole, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin'
      });

      if (error || !hasAdminRole) {
        toast({
          title: "Unauthorized",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsAuthorized(true);
    };

    checkAccess();
  }, [navigate, toast]);

  useEffect(() => {
    if (isAuthorized) {
      fetchContacts();
    }
  }, [fetchContacts, isAuthorized]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">
            {!isAuthorized ? 'Verifying access...' : 'Loading contact submissions...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <Helmet>
        <title>Contact Dashboard — Ethan Kusasirakwe</title>
        <meta name="description" content="Admin dashboard for reviewing portfolio contact form submissions from visitors of Ethan Kusasirakwe's portfolio." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://ethans-future-folio.lovable.app/dashboard" />
        <meta property="og:title" content="Contact Dashboard — Ethan Kusasirakwe" />
        <meta property="og:description" content="Admin dashboard for portfolio contact submissions." />
        <meta property="og:url" content="https://ethans-future-folio.lovable.app/dashboard" />
      </Helmet>
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact Dashboard</h1>
          <p className="text-muted-foreground">
            Portfolio contact form submissions ({contacts.length} total)
          </p>
        </div>

        {contacts.length === 0 ? (
          <EnhancedCard>
            <EnhancedCardContent className="p-8 text-center">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">No Contact Submissions</h2>
              <p className="text-muted-foreground">
                Contact form submissions will appear here when visitors use your portfolio contact form.
              </p>
            </EnhancedCardContent>
          </EnhancedCard>
        ) : (
          <div className="space-y-6">
            {contacts.map((contact) => (
              <EnhancedCard key={contact.id} variant="glass">
                <EnhancedCardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-lg font-semibold text-foreground">
                          {contact.name}
                        </h2>
                        <Badge variant="secondary" className="text-xs">
                          {contact.status || 'New'}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-primary hover:underline"
                          >
                            {contact.email}
                          </a>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6"
                            onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>

                        {contact.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <a 
                              href={`tel:${contact.phone}`}
                              className="text-primary hover:underline"
                            >
                              {contact.phone}
                            </a>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-6 w-6"
                              onClick={() => window.open(`tel:${contact.phone}`, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        )}

                        {contact.company && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span>{contact.company}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(contact.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your Portfolio Contact&body=Hi ${contact.name},%0D%0A%0D%0AThank you for reaching out through my portfolio...`, '_blank')}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="font-medium text-foreground mb-2">Message:</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed bg-muted/30 p-3 rounded-md">
                      {contact.message}
                    </p>
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
