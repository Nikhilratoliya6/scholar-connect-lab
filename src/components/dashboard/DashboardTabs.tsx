
import React from "react";
import { 
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  FileText, BookOpen, Calendar, Code, 
  GraduationCap, MessageSquare, ClipboardCheck 
} from "lucide-react";

interface DashboardTabsListProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabsList: React.FC<DashboardTabsListProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <TabsList className="bg-lab-background flex flex-wrap h-auto p-1 overflow-x-auto">
      <TabsTrigger 
        value="overview" 
        className="flex items-center gap-1 data-[state=active]:bg-white"
        onClick={() => setActiveTab("overview")}
      >
        <ClipboardCheck className="h-4 w-4" /> Overview
      </TabsTrigger>
      <TabsTrigger 
        value="publications" 
        className="flex items-center gap-1 data-[state=active]:bg-white"
        onClick={() => setActiveTab("publications")}
      >
        <FileText className="h-4 w-4" /> Publications
      </TabsTrigger>
      <TabsTrigger 
        value="events" 
        className="flex items-center gap-1 data-[state=active]:bg-white"
        onClick={() => setActiveTab("events")}
      >
        <Calendar className="h-4 w-4" /> Events
      </TabsTrigger>
      <TabsTrigger 
        value="projects" 
        className="flex items-center gap-1 data-[state=active]:bg-white"
        onClick={() => setActiveTab("projects")}
      >
        <Code className="h-4 w-4" /> Projects
      </TabsTrigger>
      <TabsTrigger 
        value="courses" 
        className="flex items-center gap-1 data-[state=active]:bg-white"
        onClick={() => setActiveTab("courses")}
      >
        <GraduationCap className="h-4 w-4" /> Courses
      </TabsTrigger>
      <TabsTrigger 
        value="messages" 
        className="flex items-center gap-1 data-[state=active]:bg-white"
        onClick={() => setActiveTab("messages")}
      >
        <MessageSquare className="h-4 w-4" /> Messages
      </TabsTrigger>
    </TabsList>
  );
};

export default DashboardTabsList;
