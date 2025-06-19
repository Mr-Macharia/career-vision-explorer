
import { CompanySettings, RecruitmentSettings, EmployerSettingsState } from "@/types/employer-settings";

// Global state for employer settings
export const globalEmployerSettingsState: EmployerSettingsState = {
  company: {
    companyName: "",
    companyDescription: "",
    website: "",
    industry: "",
    companySize: "",
    location: ""
  },
  recruitment: {
    autoScreening: false,
    requireCoverLetter: false,
    allowRemote: false,
    sendApplicationUpdates: true
  }
};

// Listeners for state changes
export const employerSettingsListeners = new Set<() => void>();

// Initialize from localStorage on load
const initializeEmployerSettings = () => {
  try {
    const stored = localStorage.getItem('employer-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.assign(globalEmployerSettingsState, parsed);
    }
  } catch (error) {
    console.error('Failed to load employer settings from localStorage:', error);
  }
};

// Save to localStorage
export const saveEmployerSettingsToStorage = () => {
  try {
    localStorage.setItem('employer-settings', JSON.stringify(globalEmployerSettingsState));
  } catch (error) {
    console.error('Failed to save employer settings to localStorage:', error);
  }
};

// Update global state
export const updateGlobalEmployerSettings = (updates: Partial<EmployerSettingsState>) => {
  Object.assign(globalEmployerSettingsState, updates);
};

// Notify all listeners
export const notifyEmployerSettingsListeners = () => {
  employerSettingsListeners.forEach(listener => listener());
};

// Initialize on module load
initializeEmployerSettings();
