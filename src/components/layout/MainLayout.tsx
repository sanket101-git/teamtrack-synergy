
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../ui/Navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar } from '../common/Avatar';

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // On mobile, sidebar is closed by default
  React.useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen overflow-hidden bg-background/50 backdrop-blur-sm text-foreground">
      {/* Sidebar with enhanced styling */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-sidebar shadow-xl transition-all duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Navigation onCloseSidebar={() => isMobile && setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div 
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          isSidebarOpen ? "md:ml-64" : "ml-0"
        )}
      >
        {/* Top Bar with glassmorphism */}
        <div className="flex h-16 items-center border-b border-border bg-background/40 backdrop-blur-xl px-4 sticky top-0 z-10 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">TeamTrack Synergy</h1>
          </div>
          <div className="flex items-center gap-2">
            <Avatar name="Admin User" size="sm" className="animate-pulse-subtle" />
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay with blur effect */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
