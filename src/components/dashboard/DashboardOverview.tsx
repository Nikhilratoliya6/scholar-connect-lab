
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, FileEdit } from "lucide-react";
import { ContentItem } from "@/components/ContentCard";

interface DashboardOverviewProps {
  content: ContentItem[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ content }) => {
  const filteredContent = (type: ContentItem["type"]) => {
    return content.filter(item => item.type === type);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getRecentUpdates = () => {
    // Sort content by date (newest first) and take the first 3
    const sortedContent = [...content].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return sortedContent.slice(0, 3).map(item => ({
      message: `New ${item.type} added: ${item.title}`,
      date: item.date
    }));
  };

  const recentUpdates = getRecentUpdates();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Bell className="h-4 w-4 mr-2 text-lab-primary" /> Recent Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUpdates.length > 0 ? (
              recentUpdates.map((update, index) => (
                <div key={index} className="border-l-2 border-lab-primary pl-4 py-2">
                  <p className="text-sm font-medium">{update.message}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(update.date)}</p>
                </div>
              ))
            ) : (
              <div className="border-l-2 border-lab-primary pl-4 py-2">
                <p className="text-sm">No recent updates</p>
              </div>
            )}
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
            {filteredContent("event").slice(0, 3).length > 0 ? (
              filteredContent("event").slice(0, 3).map((event) => (
                <div key={event.id} className="border-l-2 border-lab-primary pl-4 py-2">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(event.date)}
                  </p>
                </div>
              ))
            ) : (
              <div className="border-l-2 border-lab-primary pl-4 py-2">
                <p className="text-sm">No upcoming events</p>
              </div>
            )}
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
            {content.slice(0, 3).length > 0 ? (
              content.slice(0, 3).map((item) => (
                <div key={item.id} className="border-l-2 border-lab-primary pl-4 py-2">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.type} • {formatDate(item.date)}
                  </p>
                </div>
              ))
            ) : (
              <div className="border-l-2 border-lab-primary pl-4 py-2">
                <p className="text-sm">No recent content</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
