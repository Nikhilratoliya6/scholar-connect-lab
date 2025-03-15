
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, BrainCircuit, Microscope, GraduationCap, Users, Calendar } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative bg-lab-background pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-lab-primary/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-lab-primary/10 text-lab-primary text-sm font-medium mb-2 animate-fade-in">
              Advancing AI Research & Education
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in [animation-delay:200ms]">
              Welcome to the <span className="text-lab-primary">Deep Learning Lab</span>
            </h1>
            <p className="text-lg text-lab-text/80 md:text-xl max-w-2xl mx-auto animate-fade-in [animation-delay:400ms]">
              Exploring the frontiers of artificial intelligence through cutting-edge research, 
              education, and real-world applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in [animation-delay:600ms]">
              <Button size="lg" asChild>
                <Link to="/about">
                  Learn About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What We Offer</h2>
            <p className="mt-4 text-lg text-lab-text/70 max-w-2xl mx-auto">
              Our lab combines advanced research with exceptional educational opportunities
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-lab-primary/10 flex items-center justify-center mb-4">
                <Microscope className="h-6 w-6 text-lab-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Research Excellence</h3>
              <p className="text-lab-text/70">
                Pushing the boundaries of AI with innovative research projects and publications.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-lab-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-lab-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Expert Education</h3>
              <p className="text-lab-text/70">
                Comprehensive courses taught by leading professors and industry experts.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-lab-primary/10 flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-lab-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Advanced Projects</h3>
              <p className="text-lab-text/70">
                Hands-on experience with cutting-edge AI technologies and applications.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-lab-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-lab-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Community</h3>
              <p className="text-lab-text/70">
                Join a vibrant community of researchers, students, and AI enthusiasts.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-lab-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-lab-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Publications</h3>
              <p className="text-lab-text/70">
                Access our published papers and research findings in top AI conferences.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-lab-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-lab-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Events</h3>
              <p className="text-lab-text/70">
                Participate in workshops, seminars, and conferences throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research */}
      <section className="py-24 bg-gradient-to-b from-white to-lab-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest Research</h2>
            <p className="mt-4 text-lg text-lab-text/70">
              Explore our recent publications and research breakthroughs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Research Item 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-48 bg-gradient-to-r from-lab-primary to-lab-secondary flex items-center justify-center">
                <BrainCircuit className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <div className="text-sm text-lab-primary font-medium mb-2">Neural Networks</div>
                <h3 className="text-xl font-medium mb-2">Adaptive Attention Mechanisms for Transformer Models</h3>
                <p className="text-lab-text/70 text-sm mb-4">
                  A novel approach to improve transformer efficiency by dynamically adjusting attention.
                </p>
                <Link to="/publications" className="text-lab-primary text-sm font-medium inline-flex items-center hover:underline">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            {/* Research Item 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-48 bg-gradient-to-r from-lab-secondary to-lab-accent flex items-center justify-center">
                <BrainCircuit className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <div className="text-sm text-lab-primary font-medium mb-2">Computer Vision</div>
                <h3 className="text-xl font-medium mb-2">Self-Supervised Learning for Medical Image Analysis</h3>
                <p className="text-lab-text/70 text-sm mb-4">
                  Improving diagnostic accuracy with limited labeled medical imaging data.
                </p>
                <Link to="/publications" className="text-lab-primary text-sm font-medium inline-flex items-center hover:underline">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            {/* Research Item 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-lab-border transition-all duration-300 hover:shadow-md">
              <div className="h-48 bg-gradient-to-r from-lab-accent to-lab-primary flex items-center justify-center">
                <BrainCircuit className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <div className="text-sm text-lab-primary font-medium mb-2">Reinforcement Learning</div>
                <h3 className="text-xl font-medium mb-2">Multi-Agent Cooperation in Dynamic Environments</h3>
                <p className="text-lab-text/70 text-sm mb-4">
                  Novel algorithms for enabling multiple AI agents to collaborate effectively.
                </p>
                <Link to="/publications" className="text-lab-primary text-sm font-medium inline-flex items-center hover:underline">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link to="/publications">View All Publications</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-lab-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl max-w-2xl mx-auto">
            Ready to Join Our Community of AI Researchers and Students?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Connect with our team to learn more about research opportunities, courses, and events.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/login">Student Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
