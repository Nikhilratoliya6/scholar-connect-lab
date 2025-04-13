
import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import MessagePanel from "@/components/MessagePanel";
import useDashboardContent from "@/hooks/useDashboardContent";

// Dashboard Components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabsList from "@/components/dashboard/DashboardTabs";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import RecentContentList from "@/components/dashboard/RecentContentList";
import ContentTabSection from "@/components/dashboard/ContentTabSection";

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const { content, handleAddContent, handleEditContent, handleDeleteContent } = useDashboardContent();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader 
          userName={currentUser?.name} 
          userRole={currentUser?.role} 
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
