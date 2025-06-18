
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { useLoadingState } from "@/hooks/use-loading-state";
import { useRealtimeSync } from "@/hooks/use-realtime-sync";
import { validateForm, commonRules, ValidationError } from "@/utils/admin-validation";
import { 
  Save, 
  Upload, 
  Eye, 
  Edit3, 
  Image as ImageIcon,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Undo,
  Redo
} from "lucide-react";

interface ContentData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  type: string;
  location?: string;
  publishDate?: string;
}

interface ContentEditorProps {
  initialContent?: ContentData;
  onSave: (content: ContentData) => Promise<boolean>;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export const ContentEditor = ({ initialContent, onSave, onCancel, mode }: ContentEditorProps) => {
  const { isLoading, withLoading } = useLoadingState();
  const { triggerAdminUpdate } = useRealtimeSync();
  
  const [content, setContent] = useState<ContentData>(initialContent || {
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    type: 'page',
    location: '',
    publishDate: ''
  });
  
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [undoStack, setUndoStack] = useState<ContentData[]>([]);
  const [redoStack, setRedoStack] = useState<ContentData[]>([]);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && mode === 'edit') {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 30000); // Auto-save every 30 seconds
      
      setAutoSaveTimer(timer);
    }
    
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [content, hasUnsavedChanges]);

  const handleAutoSave = async () => {
    if (content.title && content.content) {
      const autoSaveData = { ...content, status: 'draft' as const };
      const success = await onSave(autoSaveData);
      if (success) {
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        toast.success("Auto-saved", { duration: 2000 });
      }
    }
  };

  const validateContent = () => {
    const rules = {
      title: { ...commonRules.name, minLength: 3, maxLength: 100 },
      slug: { required: true, minLength: 3, pattern: /^[a-z0-9-]+$/ },
      content: { required: true, minLength: 10 },
      excerpt: { required: true, minLength: 10, maxLength: 300 },
      type: { required: true }
    };

    const validationErrors = validateForm(content, rules);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleInputChange = (field: keyof ContentData, value: string) => {
    // Save current state to undo stack
    if (undoStack.length === 0 || JSON.stringify(undoStack[undoStack.length - 1]) !== JSON.stringify(content)) {
      setUndoStack(prev => [...prev.slice(-9), content]); // Keep last 10 states
      setRedoStack([]); // Clear redo stack when new changes are made
    }

    setContent(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    
    // Auto-generate slug from title
    if (field === 'title' && !content.slug) {
      const generatedSlug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setContent(prev => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack(prev => [content, ...prev.slice(0, 9)]);
      setUndoStack(prev => prev.slice(0, -1));
      setContent(previousState);
      setHasUnsavedChanges(true);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setUndoStack(prev => [...prev, content]);
      setRedoStack(prev => prev.slice(1));
      setContent(nextState);
      setHasUnsavedChanges(true);
    }
  };

  const handleSave = async (status: 'draft' | 'published' = content.status) => {
    if (!validateContent()) {
      toast.error("Please fix validation errors", {
        description: "Check the highlighted fields and try again"
      });
      return;
    }

    const success = await withLoading('save-content', async () => {
      const saveData = { ...content, status };
      const result = await onSave(saveData);
      
      if (result) {
        triggerAdminUpdate('content_update', {
          action: mode === 'create' ? 'created' : 'updated',
          content: saveData
        });
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      }
      
      return result;
    }, {
      successMessage: status === 'published' ? "Content published successfully" : "Content saved as draft",
      errorMessage: "Failed to save content"
    });

    return success;
  };

  const handlePublish = () => handleSave('published');
  const handleSaveDraft = () => handleSave('draft');

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Preview: {content.title}</h2>
          <Button onClick={() => setIsPreviewMode(false)}>
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Mode
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{content.title}</CardTitle>
            <div className="flex gap-2">
              <Badge>{content.type}</Badge>
              <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                {content.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">{content.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: content.content.replace(/\n/g, '<br>') }} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Create New Content' : 'Edit Content'}
          </h2>
          {lastSaved && (
            <p className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
              {hasUnsavedChanges && <span className="text-orange-600 ml-2">• Unsaved changes</span>}
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(true)}
            disabled={!content.title || !content.content}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Content Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={content.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter content title"
                  className={getFieldError('title') ? 'border-red-500' : ''}
                />
                {getFieldError('title') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('title')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={content.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-friendly-slug"
                  className={getFieldError('slug') ? 'border-red-500' : ''}
                />
                {getFieldError('slug') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('slug')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="excerpt">Description/Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={content.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the content"
                  rows={3}
                  className={getFieldError('excerpt') ? 'border-red-500' : ''}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  {getFieldError('excerpt') && (
                    <span className="text-red-500">{getFieldError('excerpt')}</span>
                  )}
                  <span className="ml-auto">{content.excerpt.length}/300</span>
                </div>
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={content.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Enter the main content here..."
                  rows={12}
                  className={getFieldError('content') ? 'border-red-500' : ''}
                />
                {getFieldError('content') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('content')}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Publishing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={content.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <Label htmlFor="type">Content Type</Label>
                <select
                  id="type"
                  value={content.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="page">Page</option>
                  <option value="article">Article</option>
                  <option value="blog">Blog Post</option>
                  <option value="faq">FAQ</option>
                  <option value="hero">Hero Section</option>
                  <option value="feature">Feature Section</option>
                </select>
              </div>

              <div>
                <Label htmlFor="location">Location/Context</Label>
                <Input
                  id="location"
                  value={content.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., homepage-hero, about-page"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button
                onClick={handleSaveDraft}
                disabled={isLoading('save-content')}
                variant="outline"
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              
              <Button
                onClick={handlePublish}
                disabled={isLoading('save-content') || !content.title || !content.content}
                className="w-full"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {content.status === 'published' ? 'Update Published' : 'Publish'}
              </Button>
              
              <Button
                onClick={onCancel}
                variant="ghost"
                className="w-full"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
