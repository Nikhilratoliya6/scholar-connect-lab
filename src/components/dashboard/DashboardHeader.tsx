
import React from "react";
import { User } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, userRole }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userName || 'Admin'}
        </p>
      </div>
      <div className="flex items-center gap-2 p-2 bg-lab-primary/10 rounded-lg text-sm">
        <User className="h-4 w-4 text-lab-primary" />
        <span>
          Logged in as <span className="font-medium">{userRole || 'admin'}</span>
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;
