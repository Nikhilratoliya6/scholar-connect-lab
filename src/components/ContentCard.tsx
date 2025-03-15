
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MessageSquare, Video, FileText, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "text" | "video" | "publication" | "event" | "project" | "course";
  content: string;
  date: string;
  authorId: string;
  authorName: string;
}

interface ContentCardProps {
  item: ContentItem;
  onEdit?: (item: ContentItem) => void;
  onDelete?: (id: string) => void;
  onMessage?: (item: ContentItem) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onEdit,
  onDelete,
  onMessage,
}) => {
  const { isAdmin } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<ContentItem>(item);

  const getIcon = () => {
    switch (item.type) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "publication":
        return <FileText className="h-5 w-5" />;
      case "event":
        return <Calendar className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (onEdit) {
      onEdit(editedItem);
      setIsEditDialogOpen(false);
      toast.success("Item updated successfully");
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.id);
      toast.success("Item deleted successfully");
    }
  };

  const handleMessage = () => {
    if (onMessage) {
      onMessage(item);
      toast.success("Message panel opened");
    }
  };

  return (
    <>
      <Card className="content-card overflow-hidden hover:transform hover:scale-[1.01] transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              {getIcon()}
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </div>
            <div className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{item.description}</p>
          
          <div className="mt-4">
            {item.type === "video" ? (
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <iframe 
                  className="w-full h-full rounded-md"
                  src={item.content}
                  title={item.title}
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-sm text-lab-text">{item.content}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-sm text-muted-foreground">
            By {item.authorName}
          </div>
          <div className="flex gap-2">
            {isAdmin() && (
              <>
                <Button size="sm" variant="outline" onClick={handleEdit}>
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </>
            )}
            {!isAdmin() && (
              <Button size="sm" variant="outline" onClick={handleMessage}>
                <MessageSquare className="h-4 w-4 mr-1" /> Message
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                id="title"
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Textarea
                id="description"
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="content" className="text-right">
                Content
              </label>
              <Textarea
                id="content"
                value={editedItem.content}
                onChange={(e) => setEditedItem({ ...editedItem, content: e.target.value })}
                className="col-span-3"
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentCard;
