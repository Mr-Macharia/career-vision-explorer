
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompanySettingsProps {
  initialSettings: {
    companyName: string;
    companyDescription: string;
    website: string;
    industry: string;
    companySize: string;
    location: string;
  };
  onSettingsChange: (settings: any) => void;
}

export const CompanySettings = ({ 
  initialSettings, 
  onSettingsChange 
}: CompanySettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const handleChange = (key: string, value: string) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    onSettingsChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
          <Input 
            value={settings.companyName} 
            onChange={(e) => handleChange('companyName', e.target.value)}
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
          <Input 
            type="url"
            value={settings.website} 
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://yourcompany.com"
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Description</label>
        <Textarea 
          value={settings.companyDescription} 
          onChange={(e) => handleChange('companyDescription', e.target.value)}
          rows={3}
          placeholder="Describe your company..."
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Industry</label>
          <Select value={settings.industry} onValueChange={(value) => handleChange('industry', value)}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="Technology" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Technology</SelectItem>
              <SelectItem value="Healthcare" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Healthcare</SelectItem>
              <SelectItem value="Finance" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Finance</SelectItem>
              <SelectItem value="Education" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Education</SelectItem>
              <SelectItem value="Manufacturing" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Manufacturing</SelectItem>
              <SelectItem value="Retail" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Retail</SelectItem>
              <SelectItem value="Other" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Size</label>
          <Select value={settings.companySize} onValueChange={(value) => handleChange('companySize', value)}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="1-10" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">1-10 employees</SelectItem>
              <SelectItem value="11-50" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">11-50 employees</SelectItem>
              <SelectItem value="51-100" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">51-100 employees</SelectItem>
              <SelectItem value="101-500" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">101-500 employees</SelectItem>
              <SelectItem value="500+" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">500+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
          <Input 
            value={settings.location} 
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State/Country"
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};
