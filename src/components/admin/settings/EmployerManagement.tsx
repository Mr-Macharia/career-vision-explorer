
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const EmployerManagement = () => {
  const { toast } = useToast();
  const [defaultSettings, setDefaultSettings] = useState({
    company: {
      companyName: "",
      companyDescription: "",
      website: "",
      industry: "Technology",
      companySize: "1-10",
      location: ""
    },
    recruitment: {
      autoScreening: false,
      requireCoverLetter: false,
      allowRemote: true,
      sendApplicationUpdates: true
    }
  });

  const handleCompanyChange = (key: string, value: string) => {
    setDefaultSettings(prev => ({
      ...prev,
      company: { ...prev.company, [key]: value }
    }));
  };

  const handleRecruitmentChange = (key: string, value: boolean) => {
    setDefaultSettings(prev => ({
      ...prev,
      recruitment: { ...prev.recruitment, [key]: value }
    }));
  };

  const saveDefaultSettings = () => {
    try {
      localStorage.setItem('admin-employer-defaults', JSON.stringify(defaultSettings));
      toast({
        title: "Default Settings Saved",
        description: "New employers will use these default settings"
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save default settings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Default Company Settings</CardTitle>
          <CardDescription>
            These settings will be used as defaults for new employer accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Industry</label>
              <Select value={defaultSettings.company.industry} onValueChange={(value) => handleCompanyChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Default Company Size</label>
              <Select value={defaultSettings.company.companySize} onValueChange={(value) => handleCompanyChange('companySize', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-100">51-100 employees</SelectItem>
                  <SelectItem value="101-500">101-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default Recruitment Settings</CardTitle>
          <CardDescription>
            Default recruitment preferences for new employers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Auto-Screening</p>
              <p className="text-sm text-muted-foreground">Enable automatic application screening by default</p>
            </div>
            <Switch 
              checked={defaultSettings.recruitment.autoScreening} 
              onCheckedChange={(checked) => handleRecruitmentChange('autoScreening', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Require Cover Letter</p>
              <p className="text-sm text-muted-foreground">Make cover letters mandatory by default</p>
            </div>
            <Switch 
              checked={defaultSettings.recruitment.requireCoverLetter} 
              onCheckedChange={(checked) => handleRecruitmentChange('requireCoverLetter', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Allow Remote Work</p>
              <p className="text-sm text-muted-foreground">Include remote work options by default</p>
            </div>
            <Switch 
              checked={defaultSettings.recruitment.allowRemote} 
              onCheckedChange={(checked) => handleRecruitmentChange('allowRemote', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Application Updates</p>
              <p className="text-sm text-muted-foreground">Send email updates to applicants by default</p>
            </div>
            <Switch 
              checked={defaultSettings.recruitment.sendApplicationUpdates} 
              onCheckedChange={(checked) => handleRecruitmentChange('sendApplicationUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={saveDefaultSettings} className="w-full">
        Save Default Settings
      </Button>
    </div>
  );
};
