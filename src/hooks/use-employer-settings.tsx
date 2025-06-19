
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CompanySettings {
  companyName: string;
  companyDescription: string;
  website: string;
  industry: string;
  companySize: string;
  location: string;
}

interface RecruitmentSettings {
  autoScreening: boolean;
  requireCoverLetter: boolean;
  allowRemote: boolean;
  sendApplicationUpdates: boolean;
}

interface EmployerSettingsContextType {
  companySettings: CompanySettings;
  recruitmentSettings: RecruitmentSettings;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;
  updateRecruitmentSettings: (settings: Partial<RecruitmentSettings>) => void;
  saveAllSettings: () => void;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
}

const EmployerSettingsContext = createContext<EmployerSettingsContextType | undefined>(undefined);

// Global settings state for real-time sync
let globalEmployerSettingsState = {
  company: {
    companyName: "TechCorp Solutions",
    companyDescription: "Leading technology solutions provider",
    website: "https://techcorp.com",
    industry: "Technology",
    companySize: "51-100",
    location: "San Francisco, CA"
  },
  recruitment: {
    autoScreening: true,
    requireCoverLetter: false,
    allowRemote: true,
    sendApplicationUpdates: true
  }
};

// Load from localStorage
const loadEmployerSettingsFromStorage = () => {
  try {
    const stored = localStorage.getItem('visiondrill-employer-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      globalEmployerSettingsState = { ...globalEmployerSettingsState, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load employer settings from storage:', error);
  }
};

// Save to localStorage
const saveEmployerSettingsToStorage = () => {
  try {
    localStorage.setItem('visiondrill-employer-settings', JSON.stringify(globalEmployerSettingsState));
  } catch (error) {
    console.warn('Failed to save employer settings to storage:', error);
  }
};

loadEmployerSettingsFromStorage();

const employerSettingsListeners: Set<() => void> = new Set();

const notifyEmployerSettingsListeners = () => {
  employerSettingsListeners.forEach(listener => listener());
  saveEmployerSettingsToStorage();
};

export const EmployerSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [companySettings, setCompanySettings] = useState<CompanySettings>(globalEmployerSettingsState.company);
  const [recruitmentSettings, setRecruitmentSettings] = useState<RecruitmentSettings>(globalEmployerSettingsState.recruitment);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const syncState = () => {
      setCompanySettings({ ...globalEmployerSettingsState.company });
      setRecruitmentSettings({ ...globalEmployerSettingsState.recruitment });
      setHasUnsavedChanges(false);
    };
    
    employerSettingsListeners.add(syncState);
    return () => {
      employerSettingsListeners.delete(syncState);
    };
  }, []);

  const updateCompanySettings = (newSettings: Partial<CompanySettings>) => {
    const updated = { ...globalEmployerSettingsState.company, ...newSettings };
    globalEmployerSettingsState.company = updated;
    setCompanySettings(updated);
    setHasUnsavedChanges(true);
    notifyEmployerSettingsListeners();
    
    toast({
      title: "Company Settings Updated",
      description: "Company information has been updated in real-time"
    });
  };

  const updateRecruitmentSettings = (newSettings: Partial<RecruitmentSettings>) => {
    const updated = { ...globalEmployerSettingsState.recruitment, ...newSettings };
    globalEmployerSettingsState.recruitment = updated;
    setRecruitmentSettings(updated);
    setHasUnsavedChanges(true);
    notifyEmployerSettingsListeners();
    
    toast({
      title: "Recruitment Settings Updated",
      description: "Recruitment preferences have been updated in real-time"
    });
  };

  const saveAllSettings = () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        saveEmployerSettingsToStorage();
        setHasUnsavedChanges(false);
        setIsLoading(false);
        
        toast({
          title: "Settings Saved",
          description: "All employer settings have been saved successfully"
        });
      }, 500);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <EmployerSettingsContext.Provider value={{
      companySettings,
      recruitmentSettings,
      updateCompanySettings,
      updateRecruitmentSettings,
      saveAllSettings,
      isLoading,
      hasUnsavedChanges
    }}>
      {children}
    </EmployerSettingsContext.Provider>
  );
};

export const useEmployerSettings = () => {
  const context = useContext(EmployerSettingsContext);
  if (context === undefined) {
    throw new Error("useEmployerSettings must be used within an EmployerSettingsProvider");
  }
  return context;
};
