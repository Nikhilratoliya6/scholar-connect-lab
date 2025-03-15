
import React, { useState } from "react";
import { ContentItem } from "@/components/ContentCard";
import ContentCard from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/PageTransition";

const Courses = () => {
  const { isAdmin } = useAuth();
  const [courses, setCourses] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Introduction to Deep Learning",
      description: "Foundational course covering neural network basics",
      type: "course",
      content: "This course introduces the fundamental concepts of deep learning, including neural networks, backpropagation, and optimization techniques. Practical implementation using PyTorch and TensorFlow.",
      date: new Date().toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
    {
      id: "2",
      title: "Advanced Computer Vision",
      description: "Deep learning approaches for computer vision tasks",
      type: "course",
      content: "This course covers advanced topics in computer vision, focusing on deep learning approaches. Topics include object detection, segmentation, and generative models for image synthesis.",
      date: new Date(Date.now() - 86400000).toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
  ]);

  const handleAddCourse = (newCourse: Omit<ContentItem, "id">) => {
    const id = (courses.length + 1).toString();
    setCourses([...courses, { ...newCourse, id }]);
  };

  const handleEditCourse = (updatedCourse: ContentItem) => {
    setCourses(courses.map(course => course.id === updatedCourse.id ? updatedCourse : course));
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Courses</h1>
          <p className="text-muted-foreground">
            Educational courses offered by the Deep Learning Lab
          </p>
        </div>

        {isAdmin() && <AdminControls contentType="course" onAddContent={handleAddCourse} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <ContentCard
              key={course.id}
              item={course}
              onEdit={isAdmin() ? handleEditCourse : undefined}
              onDelete={isAdmin() ? handleDeleteCourse : undefined}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Courses;
