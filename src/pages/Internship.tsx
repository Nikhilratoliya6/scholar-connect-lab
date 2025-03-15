
import React, { useState } from "react";
import { ContentItem } from "@/components/ContentCard";
import ContentCard from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/PageTransition";

const Internship = () => {
  const { isAdmin } = useAuth();
  const [internships, setInternships] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Summer Internship Program 2024",
      description: "Research internship opportunities for undergraduate students",
      type: "text",
      content: "Applications are now open for our 2024 Summer Internship Program. Selected students will work on cutting-edge deep learning research projects under the guidance of faculty members and graduate students.",
      date: new Date().toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
    {
      id: "2",
      title: "Industry Collaboration Internship",
      description: "Joint internship program with leading tech companies",
      type: "text",
      content: "We are excited to announce our collaboration with several tech companies to offer internship opportunities that bridge academic research and industry applications. Interns will spend time in both academic and corporate settings.",
      date: new Date(Date.now() - 86400000).toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
  ]);

  const handleAddInternship = (newInternship: Omit<ContentItem, "id">) => {
    const id = (internships.length + 1).toString();
    setInternships([...internships, { ...newInternship, id }]);
  };

  const handleEditInternship = (updatedInternship: ContentItem) => {
    setInternships(internships.map(internship => internship.id === updatedInternship.id ? updatedInternship : internship));
  };

  const handleDeleteInternship = (id: string) => {
    setInternships(internships.filter(internship => internship.id !== id));
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Internship Opportunities</h1>
          <p className="text-muted-foreground">
            Explore internship opportunities at our Deep Learning Lab
          </p>
        </div>

        {isAdmin() && <AdminControls contentType="text" onAddContent={handleAddInternship} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <ContentCard
              key={internship.id}
              item={internship}
              onEdit={isAdmin() ? handleEditInternship : undefined}
              onDelete={isAdmin() ? handleDeleteInternship : undefined}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Internship;
