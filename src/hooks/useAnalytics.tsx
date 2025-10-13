import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { logger } from '@/utils/logger';

export const useAnalytics = () => {
  const trackEvent = async (eventType: string, section?: string, metadata?: Json) => {
    try {
      // Log analytics events to console for now
      logger.info('Analytics Event:', {
        eventType,
        section,
        metadata,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Analytics tracking failed:', error);
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
