
import React from 'react';
import { TeamView } from '@/components/team/TeamView';
import { Users } from 'lucide-react';

export default function Team() {
  return (
    <div className="h-full">
      <div className="glass-card p-6 mb-6 animate-fadeIn relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
            alt="Team background" 
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold mb-2 flex items-center">
            <Users className="mr-2 text-primary" size={24} />
            Team Management
          </h1>
          <p className="text-muted-foreground">View and manage your team members and their workloads</p>
        </div>
      </div>
      <div className="animate-fade-in">
        <TeamView />
      </div>
    </div>
  );
}
