
import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { ContentItem, ContentCard } from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import MessagePanel from "@/components/MessagePanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, BookOpen, Calendar, Code, Briefcase, 
  GraduationCap, ImageIcon, Users, MessageSquare, User, 
  FileEdit, ClipboardCheck, Bell
} from "lucide-react";

// Sample content data
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

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const [content, setContent] = useState<ContentItem[]>(generateSampleContent());
  const [activeTab, setActiveTab] = useState("overview");

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

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "publications":
        return <FileText className="h-4 w-4" />;
      case "events":
        return <Calendar className="h-4 w-4" />;
      case "projects":
        return <Code className="h-4 w-4" />;
      case "internship":
        return <Briefcase className="h-4 w-4" />;
      case "courses":
        return <GraduationCap className="h-4 w-4" />;
      case "gallery":
        return <ImageIcon className="h-4 w-4" />;
      case "team":
        return <Users className="h-4 w-4" />;
      case "messages":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <ClipboardCheck className="h-4 w-4" />;
    }
  };

  const filteredContent = (type: ContentItem["type"]) => {
    return content.filter(item => item.type === type);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {currentUser?.name}
            </p>
          </div>
          <div className="flex items-center gap-2 p-2 bg-lab-primary/10 rounded-lg text-sm">
            <User className="h-4 w-4 text-lab-primary" />
            <span>
              Logged in as <span className="font-medium">{currentUser?.role}</span>
            </span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-lab-background flex flex-wrap h-auto p-1 overflow-x-auto">
            <TabsTrigger value="overview" className="flex items-center gap-1 data-[state=active]:bg-white">
              <ClipboardCheck className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-1 data-[state=active]:bg-white">
              <FileText className="h-4 w-4" /> Publications
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1 data-[state=active]:bg-white">
              <Calendar className="h-4 w-4" /> Events
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1 data-[state=active]:bg-white">
              <Code className="h-4 w-4" /> Projects
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-1 data-[state=active]:bg-white">
              <GraduationCap className="h-4 w-4" /> Courses
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-1 data-[state=active]:bg-white">
              <MessageSquare className="h-4 w-4" /> Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Bell className="h-4 w-4 mr-2 text-lab-primary" /> Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-lab-primary pl-4 py-2">
                      <p className="text-sm font-medium">New publication added</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="border-l-2 border-lab-primary pl-4 py-2">
                      <p className="text-sm font-medium">Course materials updated</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                    <div className="border-l-2 border-lab-primary pl-4 py-2">
                      <p className="text-sm font-medium">New event scheduled</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-lab-primary" /> Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredContent("event").slice(0, 3).map((event) => (
                      <div key={event.id} className="border-l-2 border-lab-primary pl-4 py-2">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileEdit className="h-4 w-4 mr-2 text-lab-primary" /> Recent Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.slice(0, 3).map((item) => (
                      <div key={item.id} className="border-l-2 border-lab-primary pl-4 py-2">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.type} • {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.slice(0, 4).map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        onEdit={handleEditContent}
                        onDelete={handleDeleteContent}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="publications" className="space-y-6">
            {isAdmin() && <AdminControls contentType="publication" onAddContent={handleAddContent} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredContent("publication").map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditContent}
                  onDelete={handleDeleteContent}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            {isAdmin() && <AdminControls contentType="event" onAddContent={handleAddContent} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredContent("event").map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditContent}
                  onDelete={handleDeleteContent}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            {isAdmin() && <AdminControls contentType="project" onAddContent={handleAddContent} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredContent("project").map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditContent}
                  onDelete={handleDeleteContent}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            {isAdmin() && <AdminControls contentType="course" onAddContent={handleAddContent} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredContent("course").map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditContent}
                  onDelete={handleDeleteContent}
                />
              ))}
            </div>
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
