
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
      {/* View Mode Toggle */}
      <div className="mb-6 flex justify-end">
        <div className="flex items-center bg-secondary rounded-md p-1">
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors",
              viewMode === 'list' 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ListFilter size={16} className="mr-2" />
            List
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={cn(
              "px-3 py-1.5 rounded flex items-center text-sm font-medium transition-colors",
              viewMode === 'kanban' 
                ? "bg-primary text-primary-foreground" 
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
