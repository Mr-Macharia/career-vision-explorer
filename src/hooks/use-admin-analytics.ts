import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: 'admin' | 'user_management' | 'content' | 'settings';
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export const useAdminAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    const analyticsData = {
      ...event,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem('visiondrillCurrentUser') ? 
        JSON.parse(localStorage.getItem('visiondrillCurrentUser') || '{}').id : null,
      sessionId: sessionStorage.getItem('visiondrillSessionId') || 'anonymous',
    };

    // Log to console for development
    console.log('Admin Analytics Event:', analyticsData);

    // Store in localStorage for now (in production, this would send to analytics service)
    const existingEvents = JSON.parse(localStorage.getItem('visiondrillAnalytics') || '[]');
    existingEvents.push(analyticsData);
    
    // Keep only last 100 events to prevent storage bloat
    if (existingEvents.length > 100) {
      existingEvents.splice(0, existingEvents.length - 100);
    }
    
    localStorage.setItem('visiondrillAnalytics', JSON.stringify(existingEvents));
  }, []);

  const trackUserAction = useCallback((action: string, details?: Record<string, any>) => {
    trackEvent({
      action,
      category: 'user_management',
      metadata: details,
    });
  }, [trackEvent]);

  const trackContentAction = useCallback((action: string, details?: Record<string, any>) => {
    trackEvent({
      action,
      category: 'content',
      metadata: details,
    });
  }, [trackEvent]);

  const trackAdminAction = useCallback((action: string, details?: Record<string, any>) => {
    trackEvent({
      action,
      category: 'admin',
      metadata: details,
    });
  }, [trackEvent]);

  const getAnalytics = useCallback(() => {
    return JSON.parse(localStorage.getItem('visiondrillAnalytics') || '[]');
  }, []);

  return {
    trackEvent,
    trackUserAction,
    trackContentAction,
    trackAdminAction,
    getAnalytics,
  };
};
