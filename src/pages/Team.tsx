
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageTransition from "@/components/PageTransition";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Dr. Jane Smith",
      role: "Lab Director",
      bio: "Dr. Smith is a professor of Computer Science with expertise in deep learning and computer vision. She has published over 100 papers in top-tier conferences and journals.",
      imageUrl: "https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff",
    },
    {
      id: "2",
      name: "Dr. Michael Johnson",
      role: "Senior Researcher",
      bio: "Dr. Johnson specializes in natural language processing and reinforcement learning. He leads several projects focused on multimodal learning and transfer learning approaches.",
      imageUrl: "https://ui-avatars.com/api/?name=Michael+Johnson&background=60A5FA&color=fff",
    },
    {
      id: "3",
      name: "Dr. Sarah Williams",
      role: "Assistant Professor",
      bio: "Dr. Williams works on applications of deep learning in healthcare, focusing on medical image analysis and clinical decision support systems.",
      imageUrl: "https://ui-avatars.com/api/?name=Sarah+Williams&background=10B981&color=fff",
    },
    {
      id: "4",
      name: "Robert Chen",
      role: "PhD Student",
      bio: "Robert's research focuses on graph neural networks and their applications to molecular modeling and drug discovery.",
      imageUrl: "https://ui-avatars.com/api/?name=Robert+Chen&background=F59E0B&color=fff",
    },
    {
      id: "5",
      name: "Lisa Washington",
      role: "PhD Student",
      bio: "Lisa works on generative models and their applications to create synthetic data for privacy-preserving machine learning.",
      imageUrl: "https://ui-avatars.com/api/?name=Lisa+Washington&background=8B5CF6&color=fff",
    },
    {
      id: "6",
      name: "James Wilson",
      role: "Laboratory Manager",
      bio: "James oversees the lab operations, manages resources, and coordinates collaborations with industry partners.",
      imageUrl: "https://ui-avatars.com/api/?name=James+Wilson&background=EC4899&color=fff",
    },
  ];

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Our Team</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the researchers, faculty, and students that make up the Deep Learning Lab
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square w-full overflow-hidden bg-muted flex items-center justify-center">
                <Avatar className="h-48 w-48">
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Team;
