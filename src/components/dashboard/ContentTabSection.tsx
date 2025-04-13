
import React from "react";
import AdminControls from "@/components/AdminControls";
import { ContentCard, ContentItem } from "@/components/ContentCard";

interface ContentTabSectionProps {
  contentType: ContentItem["type"];
  content: ContentItem[];
  isAdmin: boolean;
  onAddContent: (newContent: Omit<ContentItem, "id">) => void;
  onEditContent: (item: ContentItem) => void;
  onDeleteContent: (id: string) => void;
}

const ContentTabSection: React.FC<ContentTabSectionProps> = ({
  contentType,
  content,
  isAdmin,
  onAddContent,
  onEditContent,
  onDeleteContent,
}) => {
  const filteredContent = content.filter(item => item.type === contentType);

  return (
    <div className="space-y-6">
      {isAdmin && <AdminControls contentType={contentType} onAddContent={onAddContent} />}
      {filteredContent.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No {contentType}s found. {isAdmin && "Add one to get started."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContent.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onEdit={onEditContent}
              onDelete={onDeleteContent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentTabSection;
