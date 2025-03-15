
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/context/AuthContext";

const About = () => {
  const { isAdmin } = useAuth();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Our Lab</h1>
            <p className="text-xl text-lab-text/70">
              Advancing the frontiers of deep learning through research and education
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 relative inline-flex flex-col">
              Our Mission
              <span className="w-1/2 h-1 bg-lab-primary mt-2 rounded-full"></span>
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              The Deep Learning Lab is dedicated to pushing the boundaries of artificial intelligence 
              through innovative research, exceptional education, and real-world applications. We believe 
              in the transformative power of deep learning to solve complex problems and create positive 
              impact across disciplines.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our team of researchers, professors, and students works collaboratively to develop novel 
              algorithms, architectures, and applications in areas such as computer vision, natural 
              language processing, reinforcement learning, and more. We are committed to sharing our 
              knowledge through publications, courses, and community engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="content-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4">Research Focus</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Advanced neural network architectures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Computer vision and image understanding</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Natural language processing and generation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Reinforcement learning and decision making</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Multimodal learning and representation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Interpretable and explainable AI</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="content-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4">Educational Approach</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Comprehensive courses from fundamentals to advanced topics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Hands-on projects with real-world applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Research opportunities for students at all levels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Workshops and seminars with industry experts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Internship placements with partner organizations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lab-primary mr-2">•</span>
                    <span>Collaborative learning environment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 relative inline-flex flex-col">
              Our History
              <span className="w-1/2 h-1 bg-lab-primary mt-2 rounded-full"></span>
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Founded in 2015, the Deep Learning Lab began as a small research group focused on neural 
              network architectures. Over the years, we have grown into a comprehensive center for AI 
              research and education, with dozens of researchers, hundreds of students, and numerous 
              industry partnerships.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our work has been published in top-tier conferences and journals, including NeurIPS, ICML, 
              CVPR, and ICLR. Our graduates have gone on to leadership positions in academia and industry, 
              continuing to advance the field of artificial intelligence around the world.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 relative inline-flex flex-col">
              Lab Facilities
              <span className="w-1/2 h-1 bg-lab-primary mt-2 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-lab-primary/5 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">Computing Infrastructure</h3>
                <p className="text-lab-text/80">
                  Our lab is equipped with state-of-the-art computing resources, including GPU clusters, 
                  high-performance computing servers, and specialized hardware for AI research.
                </p>
              </div>
              <div className="bg-lab-primary/5 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">Research Spaces</h3>
                <p className="text-lab-text/80">
                  Dedicated spaces for collaborative research, individual work, and team meetings, 
                  designed to foster creativity and productivity.
                </p>
              </div>
              <div className="bg-lab-primary/5 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">Teaching Labs</h3>
                <p className="text-lab-text/80">
                  Specialized classrooms and laboratories for hands-on learning, equipped with the 
                  latest software and hardware for deep learning education.
                </p>
              </div>
              <div className="bg-lab-primary/5 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">Collaboration Spaces</h3>
                <p className="text-lab-text/80">
                  Open areas designed for interdisciplinary collaboration, informal discussions, 
                  and community events related to AI research and education.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 relative inline-flex flex-col">
              Join Our Community
              <span className="w-1/2 h-1 bg-lab-primary mt-2 rounded-full"></span>
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Whether you're a student interested in learning about deep learning, a researcher looking 
              to collaborate, or an industry partner seeking innovative solutions, we welcome you to 
              join our community. Explore our courses, research projects, events, and opportunities 
              to get involved.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
