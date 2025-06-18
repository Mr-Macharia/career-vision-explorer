
import { useState, useCallback } from 'react';
import { toast } from "@/components/ui/sonner";

interface LoadingState {
  [key: string]: boolean;
}

interface UseLoadingStateReturn {
  isLoading: (key: string) => boolean;
  setLoading: (key: string, loading: boolean) => void;
  withLoading: <T>(key: string, asyncFn: () => Promise<T>, options?: {
    successMessage?: string;
    errorMessage?: string;
  }) => Promise<T | null>;
}

export const useLoadingState = (): UseLoadingStateReturn => {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const isLoading = useCallback((key: string): boolean => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading,
    }));
  }, []);

  const withLoading = useCallback(async <T>(
    key: string, 
    asyncFn: () => Promise<T>,
    options: {
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ): Promise<T | null> => {
    try {
      setLoading(key, true);
      const result = await asyncFn();
      
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      
      return result;
    } catch (error) {
      console.error(`Error in ${key}:`, error);
      
      const errorMessage = options.errorMessage || 
        (error instanceof Error ? error.message : 'An unexpected error occurred');
      
      toast.error('Operation Failed', {
        description: errorMessage,
      });
      
      return null;
    } finally {
      setLoading(key, false);
    }
  }, [setLoading]);

  return { isLoading, setLoading, withLoading };
};
