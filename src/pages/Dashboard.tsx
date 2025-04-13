
import React, { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";
import MessagePanel from "@/components/MessagePanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContentItem } from "@/components/ContentCard";

// Dashboard Components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabsList from "@/components/dashboard/DashboardTabs";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import RecentContentList from "@/components/dashboard/RecentContentList";
import ContentTabSection from "@/components/dashboard/ContentTabSection";

const Dashboard = () => {
  const { user, profile, isAdmin } = useSupabaseAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all content data from Supabase
  useEffect(() => {
    const fetchAllContent = async () => {
      setIsLoading(true);
      try {
        // Fetch publications
        const { data: publications, error: pubError } = await supabase
          .from('publications')
          .select('*');
        
        if (pubError) throw pubError;

        // Fetch events
        const { data: events, error: eventError } = await supabase
          .from('events')
          .select('*');
        
        if (eventError) throw eventError;

        // Fetch projects
        const { data: projects, error: projectError } = await supabase
          .from('projects')
          .select('*');
        
        if (projectError) throw projectError;

        // Fetch courses
        const { data: courses, error: courseError } = await supabase
          .from('courses')
          .select('*');
        
        if (courseError) throw courseError;

        // Format data
        const formattedContent: ContentItem[] = [
          ...(publications || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description || '',
            type: 'publication',
            content: item.content,
            date: item.date,
            authorId: item.author_id || '',
            authorName: item.author_name || 'Admin',
          })),
          ...(events || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description || '',
            type: 'event',
            content: item.content,
            date: item.date,
            authorId: item.author_id || '',
            authorName: item.author_name || 'Admin',
          })),
          ...(projects || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description || '',
            type: 'project',
            content: item.content,
            date: item.date,
            authorId: item.author_id || '',
            authorName: item.author_name || 'Admin',
          })),
          ...(courses || []).map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description || '',
            type: 'course',
            content: item.content,
            date: item.date,
            authorId: item.author_id || '',
            authorName: item.author_name || 'Admin',
          })),
        ];

        // Sort content by date (newest first)
        formattedContent.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setContent(formattedContent);
      } catch (error: any) {
        console.error('Error fetching content:', error);
        toast.error(`Error fetching data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  // Handle adding content
  const handleAddContent = async (newContent: Omit<ContentItem, "id">) => {
    try {
      const { type } = newContent;
      const tableName = type === 'publication' ? 'publications' : 
                       type === 'event' ? 'events' :
                       type === 'project' ? 'projects' :
                       'courses';

      const { data, error } = await supabase
        .from(tableName)
        .insert([
          {
            title: newContent.title,
            description: newContent.description,
            content: newContent.content,
            date: new Date().toISOString(),
            author_id: user?.id || '',
            author_name: profile?.full_name || user?.email?.split('@')[0] || 'Admin',
          }
        ])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const addedContent: ContentItem = {
          id: data[0].id,
          title: data[0].title,
          description: data[0].description || '',
          type: newContent.type,
          content: data[0].content,
          date: data[0].date,
          authorId: data[0].author_id || '',
          authorName: data[0].author_name || 'Admin',
        };
        
        setContent([addedContent, ...content]);
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`);
      }
    } catch (error: any) {
      console.error(`Error adding ${newContent.type}:`, error);
      toast.error(`Failed to add ${newContent.type}: ${error.message}`);
    }
  };

  // Handle editing content
  const handleEditContent = async (updatedContent: ContentItem) => {
    try {
      const { type, id } = updatedContent;
      const tableName = type === 'publication' ? 'publications' : 
                       type === 'event' ? 'events' :
                       type === 'project' ? 'projects' :
                       'courses';

      const { error } = await supabase
        .from(tableName)
        .update({
          title: updatedContent.title,
          description: updatedContent.description,
          content: updatedContent.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      setContent(content.map(item => item.id === updatedContent.id ? updatedContent : item));
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);
    } catch (error: any) {
      console.error(`Error updating ${updatedContent.type}:`, error);
      toast.error(`Failed to update ${updatedContent.type}: ${error.message}`);
    }
  };

  // Handle deleting content
  const handleDeleteContent = async (id: string) => {
    try {
      const itemToDelete = content.find(item => item.id === id);
      if (!itemToDelete) return;

      const { type } = itemToDelete;
      const tableName = type === 'publication' ? 'publications' : 
                       type === 'event' ? 'events' :
                       type === 'project' ? 'projects' :
                       'courses';

      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContent(content.filter(item => item.id !== id));
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
    } catch (error: any) {
      console.error('Error deleting content:', error);
      toast.error(`Failed to delete item: ${error.message}`);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader 
          userName={profile?.full_name || user?.email} 
          userRole={profile?.role} 
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <DashboardTabsList activeTab={activeTab} setActiveTab={setActiveTab} />

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview content={content} />
            <RecentContentList 
              content={content} 
              onEdit={handleEditContent} 
              onDelete={handleDeleteContent} 
            />
          </TabsContent>

          <TabsContent value="publications" className="space-y-6">
            <ContentTabSection 
              contentType="publication"
              content={content}
              isAdmin={isAdmin()}
              onAddContent={handleAddContent}
              onEditContent={handleEditContent}
              onDeleteContent={handleDeleteContent}
            />
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <ContentTabSection 
              contentType="event"
              content={content}
              isAdmin={isAdmin()}
              onAddContent={handleAddContent}
              onEditContent={handleEditContent}
              onDeleteContent={handleDeleteContent}
            />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ContentTabSection 
              contentType="project"
              content={content}
              isAdmin={isAdmin()}
              onAddContent={handleAddContent}
              onEditContent={handleEditContent}
              onDeleteContent={handleDeleteContent}
            />
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <ContentTabSection 
              contentType="course"
              content={content}
              isAdmin={isAdmin()}
              onAddContent={handleAddContent}
              onEditContent={handleEditContent}
              onDeleteContent={handleDeleteContent}
            />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <MessagePanel />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
