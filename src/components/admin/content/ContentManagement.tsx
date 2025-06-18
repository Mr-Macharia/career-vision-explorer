
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { useRealtimeSync } from "@/hooks/use-realtime-sync";
import { 
  Save, 
  Upload, 
  Eye, 
  Edit3, 
  Globe, 
  Image as ImageIcon,
  FileText,
  Settings
} from "lucide-react";

export const ContentManagement = () => {
  const { triggerAdminUpdate } = useRealtimeSync();
  const [activeTab, setActiveTab] = useState("homepage");
  const [isLoading, setIsLoading] = useState(false);

  // Homepage content state
  const [homepageContent, setHomepageContent] = useState({
    heroTitle: "Find Your Perfect Career Path",
    heroSubtitle: "Discover opportunities that match your skills and passions",
    heroImage: "",
    featuredJobs: 6,
    testimonialCount: 3,
  });

  // Site settings state
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Visiondrill",
    tagline: "Your Career Journey Starts Here",
    logo: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    contactEmail: "info@visiondrill.com",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  const handleSaveHomepage = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for persistence
      localStorage.setItem('visiondrillHomepageContent', JSON.stringify(homepageContent));
      
      // Trigger real-time update
      triggerAdminUpdate('content_update', { section: 'homepage', data: homepageContent });
      
      toast.success("Homepage Updated", {
        description: "Changes are now live on the website",
      });
    } catch (error) {
      toast.error("Update Failed", {
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for persistence
      localStorage.setItem('visiondrillSiteSettings', JSON.stringify(siteSettings));
      
      // Trigger real-time update
      triggerAdminUpdate('settings_update', { data: siteSettings });
      
      toast.success("Settings Updated", {
        description: "Site configuration saved successfully",
      });
    } catch (error) {
      toast.error("Update Failed", {
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Preview Site
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homepage" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Homepage
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="homepage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Homepage Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={homepageContent.heroTitle}
                    onChange={(e) => setHomepageContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Input
                    id="heroSubtitle"
                    value={homepageContent.heroSubtitle}
                    onChange={(e) => setHomepageContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroImage"
                    value={homepageContent.heroImage}
                    onChange={(e) => setHomepageContent(prev => ({ ...prev, heroImage: e.target.value }))}
                    placeholder="Enter image URL or upload below"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="featuredJobs">Featured Jobs Count</Label>
                  <Input
                    id="featuredJobs"
                    type="number"
                    value={homepageContent.featuredJobs}
                    onChange={(e) => setHomepageContent(prev => ({ ...prev, featuredJobs: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonialCount">Testimonials to Show</Label>
                  <Input
                    id="testimonialCount"
                    type="number"
                    value={homepageContent.testimonialCount}
                    onChange={(e) => setHomepageContent(prev => ({ ...prev, testimonialCount: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <Button onClick={handleSaveHomepage} disabled={isLoading} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Homepage Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Upload Media Files</p>
                <p className="text-gray-500 mb-4">Drag and drop files here or click to browse</p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">Manage individual page content and SEO settings.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['About', 'Contact', 'Privacy Policy', 'Terms of Service', 'FAQ', 'Blog'].map((page) => (
                    <Card key={page} className="p-4">
                      <h3 className="font-medium mb-2">{page}</h3>
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Page
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, tagline: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={siteSettings.primaryColor}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={siteSettings.secondaryColor}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={siteSettings.contactEmail}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                />
              </div>

              <div className="space-y-4">
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={siteSettings.socialLinks.linkedin}
                      onChange={(e) => setSiteSettings(prev => ({ 
                        ...prev, 
                        socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                      }))}
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={siteSettings.socialLinks.twitter}
                      onChange={(e) => setSiteSettings(prev => ({ 
                        ...prev, 
                        socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                      }))}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={siteSettings.socialLinks.facebook}
                      onChange={(e) => setSiteSettings(prev => ({ 
                        ...prev, 
                        socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                      }))}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveSettings} disabled={isLoading} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
