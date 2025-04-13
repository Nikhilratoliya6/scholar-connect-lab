
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentCard, ContentItem } from "@/components/ContentCard";

interface RecentContentListProps {
  content: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
}

const RecentContentList: React.FC<RecentContentListProps> = ({ content, onEdit, onDelete }) => {
  return (
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
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentContentList;
