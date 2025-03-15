
import React, { useState } from "react";
import { ContentItem } from "@/components/ContentCard";
import ContentCard from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/PageTransition";

const Publications = () => {
  const { isAdmin } = useAuth();
  const [publications, setPublications] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Advances in Transformer Models",
      description: "Research paper on recent improvements in transformer architectures",
      type: "publication",
      content: "This paper presents a comprehensive survey of recent advancements in transformer models, focusing on efficiency improvements and applications in various domains.",
      date: new Date().toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
    {
      id: "2",
      title: "Deep Learning for Medical Imaging",
      description: "Study on using CNNs for medical image analysis",
      type: "publication",
      content: "We propose a novel convolutional neural network architecture for medical image segmentation, achieving state-of-the-art results on benchmark datasets.",
      date: new Date(Date.now() - 86400000).toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
  ]);

  const handleAddPublication = (newPublication: Omit<ContentItem, "id">) => {
    const id = (publications.length + 1).toString();
    setPublications([...publications, { ...newPublication, id }]);
  };

  const handleEditPublication = (updatedPublication: ContentItem) => {
    setPublications(publications.map(pub => pub.id === updatedPublication.id ? updatedPublication : pub));
  };

  const handleDeletePublication = (id: string) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Publications</h1>
          <p className="text-muted-foreground">
            Research papers and articles from our lab
          </p>
        </div>

        {isAdmin() && <AdminControls contentType="publication" onAddContent={handleAddPublication} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication) => (
            <ContentCard
              key={publication.id}
              item={publication}
              onEdit={isAdmin() ? handleEditPublication : undefined}
              onDelete={isAdmin() ? handleDeletePublication : undefined}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Publications;
