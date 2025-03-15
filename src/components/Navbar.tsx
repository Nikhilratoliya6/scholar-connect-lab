
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, LogOut, User, LucideIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Publications", href: "/publications" },
  { title: "Projects", href: "/projects" },
  { title: "Internship", href: "/internship" },
  { title: "Courses", href: "/courses" },
  { title: "Gallery", href: "/gallery" },
  { title: "Team", href: "/team" },
  { title: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 font-medium text-lg"
          >
            <span className="text-lab-primary font-semibold">DEEP</span>
            <span>LEARNING LAB</span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-lab-primary relative py-2",
                  location.pathname === item.href
                    ? "text-lab-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-lab-primary after:content-['']"
                    : "text-lab-text"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={currentUser.photoURL} />
                      <AvatarFallback>
                        {currentUser.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{currentUser.name}</span>
                      <span className="text-xs text-muted-foreground">{currentUser.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto py-4 px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block py-2 text-sm font-medium",
                  location.pathname === item.href
                    ? "text-lab-primary"
                    : "text-lab-text hover:text-lab-primary"
                )}
              >
                {item.title}
              </Link>
            ))}
            
            <div className="pt-4 border-t mt-4">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={currentUser.photoURL} />
                      <AvatarFallback>
                        {currentUser.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{currentUser.name}</div>
                      <div className="text-xs text-muted-foreground">{currentUser.role}</div>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full justify-start" size="sm">
                    <Link to="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <Button asChild className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
