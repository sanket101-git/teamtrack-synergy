
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Users, 
  BarChart3,
  Settings,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type NavigationItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
  { name: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> },
  { name: 'Team', path: '/team', icon: <Users size={20} /> },
  { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
];

interface NavigationProps {
  onCloseSidebar?: () => void;
}

export const Navigation = ({ onCloseSidebar }: NavigationProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-1 flex-col py-4">
      <div className="flex items-center justify-between px-4 mb-8">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold mr-2">
            TS
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">TeamSync</span>
        </div>
        {isMobile && (
          <button 
            onClick={onCloseSidebar}
            className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav className="flex-1 px-2 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "sidebar-link",
              isActive(item.path) && "active"
            )}
            onClick={isMobile ? onCloseSidebar : undefined}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="glass mx-4 my-4 p-4 rounded-lg">
        <p className="text-xs text-sidebar-foreground/70 mb-2">Pro version available</p>
        <button className="w-full bg-primary py-2 rounded-md text-primary-foreground text-sm font-medium transition-all hover:bg-primary/90">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};
