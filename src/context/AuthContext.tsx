import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// User types
export type UserRole = "admin" | "student" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isStudent: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This would normally use Firebase, but for now we're creating a mock implementation
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock users for demo
  const mockUsers = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@deeplearninglab.com",
      password: "admin123",
      role: "admin" as UserRole,
      photoURL: "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
    },
    {
      id: "2",
      name: "Student User",
      email: "student@deeplearninglab.com",
      password: "student123",
      role: "student" as UserRole,
      photoURL: "https://ui-avatars.com/api/?name=Student+User&background=60A5FA&color=fff"
    }
  ];

  useEffect(() => {
    // Check if there's a user in localStorage (simulating persistent auth)
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Find user in our mock database
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      
      toast.success(`Welcome back, ${user.name}!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed: Invalid email or password");
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate Google login with the student account
      const studentUser = mockUsers.find(u => u.role === "student");
      if (studentUser) {
        const { password: _, ...userWithoutPassword } = studentUser;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        
        toast.success(`Welcome, ${studentUser.name}!`);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Google login failed");
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast.success("You have been logged out");
    navigate("/");
  };

  const isAdmin = () => {
    return currentUser?.role === "admin";
  };

  const isStudent = () => {
    return currentUser?.role === "student";
  };

  const value = {
    currentUser,
    isLoading,
    login,
    loginWithGoogle,
    logout,
    isAdmin,
    isStudent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
