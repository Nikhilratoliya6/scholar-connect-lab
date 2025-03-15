
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentItem } from "@/components/ContentCard";
import ContentCard from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/PageTransition";

const Events = () => {
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Deep Learning Workshop 2024",
      description: "Annual workshop on the latest advances in deep learning",
      type: "event",
      content: "Join us for our annual workshop featuring speakers from industry and academia. Topics include transformer models, graph neural networks, and reinforcement learning.",
      date: new Date().toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
    {
      id: "2",
      title: "Neural Networks Conference",
      description: "International conference for researchers and practitioners",
      type: "event",
      content: "The conference will cover various aspects of neural networks, from theory to practice. Special sessions on computer vision, natural language processing, and robotics.",
      date: new Date(Date.now() - 86400000).toISOString(),
      authorId: "1",
      authorName: "Admin User",
    },
  ]);

  const handleAddEvent = (newEvent: Omit<ContentItem, "id">) => {
    const id = (events.length + 1).toString();
    setEvents([...events, { ...newEvent, id }]);
  };

  const handleEditEvent = (updatedEvent: ContentItem) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Events</h1>
          <p className="text-muted-foreground">
            Upcoming and past events from the Deep Learning Lab
          </p>
        </div>

        {isAdmin() && <AdminControls contentType="event" onAddContent={handleAddEvent} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <ContentCard
              key={event.id}
              item={event}
              onEdit={isAdmin() ? handleEditEvent : undefined}
              onDelete={isAdmin() ? handleDeleteEvent : undefined}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Events;
