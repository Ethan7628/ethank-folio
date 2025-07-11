
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAnalytics = () => {
  const trackEvent = async (eventType: string, section?: string, metadata?: any) => {
    try {
      const { error } = await supabase
        .from('analytics')
        .insert({
          event_type: eventType,
          section: section,
          user_agent: navigator.userAgent,
          metadata: metadata
        });
      
      if (error) {
        console.error('Analytics tracking error:', error);
      }
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  };

  const trackPageView = (section: string) => {
    trackEvent('page_view', section);
  };

  const trackInteraction = (action: string, section: string, metadata?: any) => {
    trackEvent('interaction', section, { action, ...metadata });
  };

  const trackFormSubmission = (formType: string, success: boolean) => {
    trackEvent('form_submission', formType, { success });
  };

  return {
    trackEvent,
    trackPageView,
    trackInteraction,
    trackFormSubmission
  };
};

export const usePageAnalytics = (section: string) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(section);
  }, [section, trackPageView]);
};
