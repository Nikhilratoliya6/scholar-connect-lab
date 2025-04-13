
import React, { useState, useEffect } from "react";
import { ContentItem } from "@/components/ContentCard";
import ContentCard from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Gallery = () => {
  const { isAdmin } = useSupabaseAuth();
  const [videos, setVideos] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        const formattedVideos: ContentItem[] = data.map(video => ({
          id: video.id,
          title: video.title,
          description: video.description || '',
          type: 'video',
          content: video.content,
          date: video.date,
          authorId: video.author_id || '',
          authorName: video.author_name || 'Admin',
        }));
        setVideos(formattedVideos);
      }
    } catch (error: any) {
      console.error('Error fetching videos:', error);
      toast.error(`Failed to load videos: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVideo = async (newVideo: Omit<ContentItem, "id">) => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .insert([
          {
            title: newVideo.title,
            description: newVideo.description,
            content: newVideo.content,
            date: new Date().toISOString(),
            author_id: newVideo.authorId,
            author_name: newVideo.authorName,
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      if (data && data[0]) {
        const addedVideo: ContentItem = {
          id: data[0].id,
          title: data[0].title,
          description: data[0].description || '',
          type: 'video',
          content: data[0].content,
          date: data[0].date,
          authorId: data[0].author_id || '',
          authorName: data[0].author_name || 'Admin',
        };
        
        setVideos([addedVideo, ...videos]);
        toast.success('Video added successfully');
      }
    } catch (error: any) {
      console.error('Error adding video:', error);
      toast.error(`Failed to add video: ${error.message}`);
    }
  };

  const handleEditVideo = async (updatedVideo: ContentItem) => {
    try {
      const { error } = await supabase
        .from('videos')
        .update({
          title: updatedVideo.title,
          description: updatedVideo.description,
          content: updatedVideo.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedVideo.id);

      if (error) {
        throw error;
      }

      setVideos(videos.map(video => video.id === updatedVideo.id ? updatedVideo : video));
      toast.success('Video updated successfully');
    } catch (error: any) {
      console.error('Error updating video:', error);
      toast.error(`Failed to update video: ${error.message}`);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setVideos(videos.filter(video => video.id !== id));
      toast.success('Video deleted successfully');
    } catch (error: any) {
      console.error('Error deleting video:', error);
      toast.error(`Failed to delete video: ${error.message}`);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Video Gallery</h1>
          <p className="text-muted-foreground">
            Educational videos and research presentations from our lab
          </p>
        </div>

        {isAdmin() && <AdminControls contentType="video" onAddContent={handleAddVideo} />}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((skeleton) => (
              <div key={skeleton} className="shadow-md h-80 animate-pulse bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No videos found. {isAdmin() && "Add one to get started."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <ContentCard
                key={video.id}
                item={video}
                onEdit={isAdmin() ? handleEditVideo : undefined}
                onDelete={isAdmin() ? handleDeleteVideo : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Gallery;
