
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { AnimatePresence } from "framer-motion";

// Layout Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Page Components
import Index from "@/pages/Index";
import About from "@/pages/About";
import Events from "@/pages/Events";
import Publications from "@/pages/Publications";
import Projects from "@/pages/Projects";
import Internship from "@/pages/Internship";
import Courses from "@/pages/Courses";
import Gallery from "@/pages/Gallery";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

// Protected Route Component
import { useAuth } from "@/context/AuthContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/internship" element={<Internship />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">
              <AnimatePresence mode="wait">
                <AppRoutes />
              </AnimatePresence>
            </main>
            <Footer />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
