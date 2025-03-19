
import React, { useState } from 'react';
import { TaskList } from '@/components/tasks/TaskList';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { ListFilter, Trello } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'list' | 'kanban';

export default function Tasks() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header Card with Glassmorphism */}
      <div className="glass-card p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-2">Task Management</h1>
        <p className="text-muted-foreground">View, create, and manage all your team's tasks</p>
      </div>
      
      {/* View Mode Toggle */}
      <div className="mb-6 flex justify-end">
        <div className="flex items-center bg-secondary/80 backdrop-blur-sm rounded-md p-1 shadow-lg transition-all duration-300 hover:shadow-primary/20">
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "px-3 py-1.5 rounded flex items-center text-sm font-medium transition-all duration-300",
              viewMode === 'list' 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ListFilter size={16} className="mr-2" />
            List
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={cn(
              "px-3 py-1.5 rounded flex items-center text-sm font-medium transition-all duration-300",
              viewMode === 'kanban' 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Trello size={16} className="mr-2" />
            Kanban
          </button>
        </div>
      </div>
      
      {/* View Content */}
      <div className="flex-1">
        {viewMode === 'list' ? <TaskList /> : <KanbanBoard />}
      </div>
    </div>
  );
}
