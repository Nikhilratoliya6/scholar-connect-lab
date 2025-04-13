
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentItem } from "@/components/ContentCard";
import ContentCard from "@/components/ContentCard";
import AdminControls from "@/components/AdminControls";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Events = () => {
  const { isAdmin } = useSupabaseAuth();
  const [events, setEvents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        const formattedEvents: ContentItem[] = data.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description || '',
          type: 'event',
          content: event.content,
          date: event.date,
          authorId: event.author_id || '',
          authorName: event.author_name || 'Admin',
        }));
        setEvents(formattedEvents);
      }
    } catch (error: any) {
      console.error('Error fetching events:', error);
      toast.error(`Failed to load events: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (newEvent: Omit<ContentItem, "id">) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title: newEvent.title,
            description: newEvent.description,
            content: newEvent.content,
            date: new Date().toISOString(),
            author_id: newEvent.authorId,
            author_name: newEvent.authorName,
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      if (data && data[0]) {
        const addedEvent: ContentItem = {
          id: data[0].id,
          title: data[0].title,
          description: data[0].description || '',
          type: 'event',
          content: data[0].content,
          date: data[0].date,
          authorId: data[0].author_id || '',
          authorName: data[0].author_name || 'Admin',
        };
        
        setEvents([addedEvent, ...events]);
        toast.success('Event added successfully');
      }
    } catch (error: any) {
      console.error('Error adding event:', error);
      toast.error(`Failed to add event: ${error.message}`);
    }
  };

  const handleEditEvent = async (updatedEvent: ContentItem) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({
          title: updatedEvent.title,
          description: updatedEvent.description,
          content: updatedEvent.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedEvent.id);

      if (error) {
        throw error;
      }

      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
      toast.success('Event updated successfully');
    } catch (error: any) {
      console.error('Error updating event:', error);
      toast.error(`Failed to update event: ${error.message}`);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setEvents(events.filter(event => event.id !== id));
      toast.success('Event deleted successfully');
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast.error(`Failed to delete event: ${error.message}`);
    }
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((skeleton) => (
              <Card key={skeleton} className="shadow-md h-64 animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found. {isAdmin() && "Add one to get started."}</p>
          </div>
        ) : (
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
        )}
      </div>
    </PageTransition>
  );
};

export default Events;
