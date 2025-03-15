
import React, { useState } from "react";
import { ContentItem } from "@/components/ContentCard";
import ContentCard from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/PageTransition";

const Gallery = () => {
  const { isAdmin } = useAuth();
  const [videos, setVideos] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Introduction to Neural Networks",
      description: "A beginner-friendly guide to understanding neural networks",
      type: "video",
      content: "https://www.youtube.com/embed/aircAruvnKk",
      date: new Date().toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
    {
      id: "2",
      title: "Deep Learning Research Highlights",
      description: "Overview of recent breakthroughs in deep learning research",
      type: "video",
      content: "https://www.youtube.com/embed/0VH1Lim8gL8",
      date: new Date(Date.now() - 86400000).toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
  ]);

  const handleAddVideo = (newVideo: Omit<ContentItem, "id">) => {
    const id = (videos.length + 1).toString();
    setVideos([...videos, { ...newVideo, id }]);
  };

  const handleEditVideo = (updatedVideo: ContentItem) => {
    setVideos(videos.map(video => video.id === updatedVideo.id ? updatedVideo : video));
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
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
      </div>
    </PageTransition>
  );
};

export default Gallery;
