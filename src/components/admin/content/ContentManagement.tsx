
import { useState } from "react";
import { ContentList } from "./ContentList";
import { ContentEditor } from "./ContentEditor";
import { useRealtimeSync } from "@/hooks/use-realtime-sync";
import { toast } from "@/components/ui/sonner";

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

export const ContentManagement = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingContent, setEditingContent] = useState<any>(null);
  const { triggerAdminUpdate } = useRealtimeSync();

  const handleCreateNew = () => {
    setEditingContent(null);
    setCurrentView('create');
  };

  const handleEdit = (item: any) => {
    // Convert the list item to editor format
    const editorContent: ContentData = {
      id: item.id,
      title: item.title,
      slug: item.title.toLowerCase().replace(/\s+/g, '-'),
      content: `Content for ${item.title}`, // In real app, this would be fetched
      excerpt: `Description for ${item.title}`,
      status: item.status,
      type: item.type,
      location: '',
      publishDate: item.lastModified
    };
    
    setEditingContent(editorContent);
    setCurrentView('edit');
  };

  const handleSave = async (contentData: ContentData): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for persistence
      const existingContent = JSON.parse(localStorage.getItem('visiondrillContent') || '[]');
      
      if (currentView === 'create') {
        const newContent = { ...contentData, id: Date.now().toString() };
        existingContent.push(newContent);
      } else {
        const index = existingContent.findIndex((item: any) => item.id === contentData.id);
        if (index >= 0) {
          existingContent[index] = contentData;
        }
      }
      
      localStorage.setItem('visiondrillContent', JSON.stringify(existingContent));
      
      // Trigger real-time update
      triggerAdminUpdate('content_update', {
        action: currentView === 'create' ? 'created' : 'updated',
        content: contentData
      });
      
      // Return to list view
      setCurrentView('list');
      setEditingContent(null);
      
      return true;
    } catch (error) {
      console.error('Save error:', error);
      return false;
    }
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingContent(null);
  };

  if (currentView === 'create') {
    return (
      <ContentEditor
        mode="create"
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (currentView === 'edit' && editingContent) {
    return (
      <ContentEditor
        mode="edit"
        initialContent={editingContent}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <ContentList
      onEdit={handleEdit}
      onCreate={handleCreateNew}
    />
  );
};
