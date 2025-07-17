
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export const useAnalytics = () => {
  const trackEvent = async (eventType: string, section?: string, metadata?: Json) => {
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
  const trackInteraction = (action: string, section: string, metadata?: Json) => {
    trackEvent('interaction', section, { action, ...(metadata as object) });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);
};
