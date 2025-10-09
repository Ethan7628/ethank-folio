import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCard, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Building, Calendar, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { CONTACT_INFO } from '@/config/constants';

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
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
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
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
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
              <h3 className="text-lg font-semibold mb-2">No Contact Submissions</h3>
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
                        <h3 className="text-lg font-semibold text-foreground">
                          {contact.name}
                        </h3>
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
                    <h4 className="font-medium text-foreground mb-2">Message:</h4>
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
