
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-medium text-lg">
              <span className="text-lab-primary font-semibold">DEEP</span>
              <span>LEARNING LAB</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Advancing the frontiers of deep learning research and education. Join us on our quest for innovation and discovery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-lab-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-lab-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-lab-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-lab-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-lab-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/publications" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/internship" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-lab-primary transition-colors text-sm">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start text-sm">
                <MapPin className="h-5 w-5 mr-3 text-lab-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 AI Boulevard, Tech Campus,<br />
                  Deep Learning City, 10110
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-5 w-5 mr-3 text-lab-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-5 w-5 mr-3 text-lab-primary" />
                <span className="text-muted-foreground">contact@deeplearninglab.edu</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Deep Learning Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
