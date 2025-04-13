
import { useState } from "react";
import { ContentItem } from "@/components/ContentCard";

// Sample content data generator
const generateSampleContent = (): ContentItem[] => {
  return [
    {
      id: "1",
      title: "Introduction to Neural Networks",
      description: "A comprehensive introduction to neural network architectures",
      type: "course",
      content: "This course covers the fundamentals of neural networks, including perceptrons, activation functions, backpropagation, and deep architectures.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      authorId: "1",
      authorName: "Prof. Alan Turing",
    },
    {
      id: "2",
      title: "Advanced Transformer Architectures",
      description: "Research publication on new transformer models",
      type: "publication",
      content: "In this paper, we propose novel improvements to transformer architectures that enhance performance on natural language tasks while reducing computational requirements.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      authorId: "1",
      authorName: "Dr. Grace Hopper",
    },
    {
      id: "3",
      title: "Annual AI Conference",
      description: "Our annual gathering of AI researchers",
      type: "event",
      content: "Join us for our annual conference featuring keynote speakers, workshops, and networking opportunities with leading AI researchers from around the world.",
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      authorId: "1",
      authorName: "Event Committee",
    },
    {
      id: "4",
      title: "Computer Vision Project Demo",
      description: "Demo video of our latest CV project",
      type: "video",
      content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      authorId: "1",
      authorName: "Prof. Ada Lovelace",
    },
    {
      id: "5",
      title: "Reinforcement Learning for Robotics",
      description: "Project on applying RL to robotic control",
      type: "project",
      content: "This project explores how reinforcement learning algorithms can be applied to improve robotic control systems in uncertain environments.",
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      authorId: "1",
      authorName: "Dr. John McCarthy",
    },
  ];
};

export const useDashboardContent = () => {
  const [content, setContent] = useState<ContentItem[]>(generateSampleContent());

  const handleAddContent = (newContent: Omit<ContentItem, "id">) => {
    const newItem: ContentItem = {
      ...newContent,
      id: Date.now().toString(),
    };
    setContent([newItem, ...content]);
  };

  const handleEditContent = (updatedItem: ContentItem) => {
    setContent(content.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleDeleteContent = (id: string) => {
    setContent(content.filter(item => item.id !== id));
  };

  return {
    content,
    handleAddContent,
    handleEditContent,
    handleDeleteContent
  };
};

export default useDashboardContent;
