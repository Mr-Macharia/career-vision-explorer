
import { useState, useEffect, useCallback } from 'react';
import { toast } from "@/components/ui/sonner";

export interface SyncEvent {
  type: 'content_update' | 'user_update' | 'job_update' | 'settings_update';
  data: any;
  timestamp: number;
}

export const useRealtimeSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState<number>(Date.now());

  // Simulate WebSocket connection for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Check for updates from localStorage (simulating real-time updates)
      const lastAdminUpdate = localStorage.getItem('visiondrillLastAdminUpdate');
      if (lastAdminUpdate && parseInt(lastAdminUpdate) > lastSync) {
        handleSyncUpdate();
        setLastSync(parseInt(lastAdminUpdate));
      }
    }, 1000);

    setIsConnected(true);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [lastSync]);

  const handleSyncUpdate = useCallback(() => {
    // Trigger a re-render of components that depend on admin data
    window.dispatchEvent(new CustomEvent('adminDataUpdate'));
    
    toast.success("Content Updated", {
      description: "Latest changes from admin panel applied",
      duration: 2000,
    });
  }, []);

  const triggerAdminUpdate = useCallback((eventType: SyncEvent['type'], data: any) => {
    const syncEvent: SyncEvent = {
      type: eventType,
      data,
      timestamp: Date.now(),
    };
    
    localStorage.setItem('visiondrillLastAdminUpdate', syncEvent.timestamp.toString());
    localStorage.setItem('visiondrillSyncEvent', JSON.stringify(syncEvent));
    
    console.log('Admin update triggered:', syncEvent);
  }, []);

  return {
    isConnected,
    triggerAdminUpdate,
    lastSync,
  };
};
