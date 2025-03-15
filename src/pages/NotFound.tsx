
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-lab-background px-4">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-lab-primary mb-4">404</h1>
          <p className="text-2xl font-medium mb-6">Page not found</p>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/" className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" /> Return Home
            </Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
