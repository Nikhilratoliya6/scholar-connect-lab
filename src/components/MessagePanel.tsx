
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Send, User } from "lucide-react";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  isAdmin: boolean;
}

export const MessagePanel: React.FC = () => {
  const { user, profile } = useSupabaseAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to the Deep Learning Lab! How can I help you?",
      senderId: "1",
      senderName: "Admin User",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isAdmin: true,
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      senderId: user?.id || "unknown",
      senderName: profile?.full_name || user?.email?.split('@')[0] || "Unknown User",
      timestamp: new Date().toISOString(),
      isAdmin: profile?.role === "admin",
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Auto-reply if the user is not an admin
    if (profile?.role !== "admin") {
      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Thank you for your message! I'll get back to you soon.",
          senderId: "1",
          senderName: "Admin User",
          timestamp: new Date().toISOString(),
          isAdmin: true,
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 1000);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="flex flex-col h-[600px] shadow-md">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-xl">Message Professor</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                msg.isAdmin ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.isAdmin ? "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" : "https://ui-avatars.com/api/?name=Student+User&background=60A5FA&color=fff"} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.isAdmin
                      ? "bg-muted text-primary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.content}
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                  <span>{msg.senderName}</span>
                  <span>{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button 
            className="self-end"
            onClick={sendMessage}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MessagePanel;
