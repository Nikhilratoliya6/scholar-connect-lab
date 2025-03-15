
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { ContentItem } from "./ContentCard";
import { useAuth } from "@/context/AuthContext";

interface AdminControlsProps {
  contentType: ContentItem["type"];
  onAddContent: (newContent: Omit<ContentItem, "id">) => void;
}

const AdminControls: React.FC<AdminControlsProps> = ({ contentType, onAddContent }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { currentUser } = useAuth();
  
  const [newContent, setNewContent] = useState<Omit<ContentItem, "id">>({
    title: "",
    description: "",
    type: contentType,
    content: "",
    date: new Date().toISOString(),
    authorId: currentUser?.id || "",
    authorName: currentUser?.name || "",
  });

  const handleAddContent = () => {
    if (!newContent.title || !newContent.description || !newContent.content) {
      toast.error("Please fill all required fields");
      return;
    }

    onAddContent({
      ...newContent,
      date: new Date().toISOString(),
      authorId: currentUser?.id || "",
      authorName: currentUser?.name || "",
    });

    setNewContent({
      title: "",
      description: "",
      type: contentType,
      content: "",
      date: new Date().toISOString(),
      authorId: currentUser?.id || "",
      authorName: currentUser?.name || "",
    });

    setIsDialogOpen(false);
    toast.success("Content added successfully");
  };

  const getDialogTitle = () => {
    switch (contentType) {
      case "publication":
        return "Add Publication";
      case "event":
        return "Add Event";
      case "project":
        return "Add Project";
      case "course":
        return "Add Course";
      case "video":
        return "Add Video";
      default:
        return "Add Content";
    }
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add New
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                id="title"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Textarea
                id="description"
                value={newContent.description}
                onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            {contentType === "video" ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="videoUrl" className="text-right">
                  Video URL
                </label>
                <Input
                  id="videoUrl"
                  value={newContent.content}
                  onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  className="col-span-3"
                />
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="content" className="text-right">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={newContent.content}
                  onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                  className="col-span-3"
                  rows={6}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddContent}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminControls;
