
import React from 'react';
import { TeamView } from '@/components/team/TeamView';

export default function Team() {
  return (
    <div className="h-full">
      <div className="glass-card p-6 mb-6 animate-fadeIn">
        <h1 className="text-2xl font-semibold mb-2">Team Management</h1>
        <p className="text-muted-foreground">View and manage your team members and their workloads</p>
      </div>
      <div className="animate-fade-in">
        <TeamView />
      </div>
    </div>
  );
}
