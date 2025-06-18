
import { useState, useEffect, useCallback } from 'react';
import { toast } from "@/components/ui/sonner";
import { useAdminAnalytics } from './use-admin-analytics';

export interface SyncEvent {
  type: 'content_update' | 'user_update' | 'job_update' | 'settings_update';
  data: any;
  timestamp: number;
  source?: string;
}

interface SyncStatus {
  isConnected: boolean;
  lastSync: number;
  syncCount: number;
  errorCount: number;
}

export const useRealtimeSync = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isConnected: false,
    lastSync: Date.now(),
    syncCount: 0,
    errorCount: 0,
  });
  const { trackAdminAction } = useAdminAnalytics();

  // Simulate WebSocket connection for real-time updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 3;

    const startSync = () => {
      interval = setInterval(() => {
        try {
          // Check for updates from localStorage (simulating real-time updates)
          const lastAdminUpdate = localStorage.getItem('visiondrillLastAdminUpdate');
          if (lastAdminUpdate && parseInt(lastAdminUpdate) > syncStatus.lastSync) {
            handleSyncUpdate();
            setSyncStatus(prev => ({
              ...prev,
              lastSync: parseInt(lastAdminUpdate),
              syncCount: prev.syncCount + 1,
            }));
            retryCount = 0; // Reset retry count on successful sync
          }
        } catch (error) {
          console.error('Sync error:', error);
          setSyncStatus(prev => ({
            ...prev,
            errorCount: prev.errorCount + 1,
          }));
          
          retryCount++;
          if (retryCount >= maxRetries) {
            console.error('Max sync retries reached, stopping sync');
            clearInterval(interval);
            setSyncStatus(prev => ({ ...prev, isConnected: false }));
            
            toast.error("Sync Connection Lost", {
              description: "Real-time updates temporarily unavailable",
              duration: 5000,
            });
          }
        }
      }, 1000);

      setSyncStatus(prev => ({ ...prev, isConnected: true }));
    };

    startSync();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      setSyncStatus(prev => ({ ...prev, isConnected: false }));
    };
  }, [syncStatus.lastSync]);

  const handleSyncUpdate = useCallback(() => {
    try {
      // Get the latest sync event
      const syncEventData = localStorage.getItem('visiondrillSyncEvent');
      const syncEvent: SyncEvent | null = syncEventData ? JSON.parse(syncEventData) : null;

      // Trigger a re-render of components that depend on admin data
      window.dispatchEvent(new CustomEvent('adminDataUpdate', { 
        detail: syncEvent 
      }));
      
      // Track the sync event
      trackAdminAction('realtime_sync_received', {
        eventType: syncEvent?.type,
        timestamp: syncEvent?.timestamp,
      });
      
      toast.success("Content Updated", {
        description: "Latest changes from admin panel applied",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error handling sync update:', error);
      toast.error("Sync Error", {
        description: "Failed to apply latest changes",
        duration: 3000,
      });
    }
  }, [trackAdminAction]);

  const triggerAdminUpdate = useCallback((eventType: SyncEvent['type'], data: any, source?: string) => {
    try {
      const syncEvent: SyncEvent = {
        type: eventType,
        data,
        timestamp: Date.now(),
        source: source || 'admin_panel',
      };
      
      localStorage.setItem('visiondrillLastAdminUpdate', syncEvent.timestamp.toString());
      localStorage.setItem('visiondrillSyncEvent', JSON.stringify(syncEvent));
      
      // Track the sync trigger
      trackAdminAction('realtime_sync_triggered', {
        eventType,
        source,
        dataSize: JSON.stringify(data).length,
      });
      
      console.log('Admin update triggered:', syncEvent);
    } catch (error) {
      console.error('Error triggering admin update:', error);
      toast.error("Sync Failed", {
        description: "Failed to broadcast changes",
        duration: 3000,
      });
    }
  }, [trackAdminAction]);

  const reconnectSync = useCallback(() => {
    setSyncStatus(prev => ({
      ...prev,
      isConnected: false,
      errorCount: 0,
    }));
    
    // This will trigger the useEffect to restart the sync
    setTimeout(() => {
      setSyncStatus(prev => ({ ...prev, lastSync: Date.now() }));
    }, 1000);
  }, []);

  return {
    isConnected: syncStatus.isConnected,
    triggerAdminUpdate,
    lastSync: syncStatus.lastSync,
    syncStatus,
    reconnectSync,
  };
};
