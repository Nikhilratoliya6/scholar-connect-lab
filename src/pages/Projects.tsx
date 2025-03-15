
import React, { useState } from "react";
import { ContentItem } from "@/components/ContentCard";
import ContentCard from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/PageTransition";

const Projects = () => {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Neural Network Visualization Tool",
      description: "Interactive tool for visualizing neural network architectures",
      type: "project",
      content: "We developed an interactive web-based tool that allows users to visualize and understand neural network architectures. The tool supports various layer types and provides explanations of each component.",
      date: new Date().toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
    {
      id: "2",
      title: "Reinforcement Learning for Robotics",
      description: "Application of RL algorithms to robotic control systems",
      type: "project",
      content: "This project explores the use of deep reinforcement learning algorithms for robotic control tasks, focusing on sample efficiency and transfer learning capabilities.",
      date: new Date(Date.now() - 86400000).toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
  ]);

  const handleAddProject = (newProject: Omit<ContentItem, "id">) => {
    const id = (projects.length + 1).toString();
    setProjects([...projects, { ...newProject, id }]);
  };

  const handleEditProject = (updatedProject: ContentItem) => {
    setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project));
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Current and past research projects from our lab
          </p>
        </div>

        {isAdmin() && <AdminControls contentType="project" onAddContent={handleAddProject} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ContentCard
              key={project.id}
              item={project}
              onEdit={isAdmin() ? handleEditProject : undefined}
              onDelete={isAdmin() ? handleDeleteProject : undefined}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
