
import React from 'react';
import { format, isPast, isToday } from 'date-fns';
import { useTaskContext, Task } from '@/context/TaskContext';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { MoreHorizontal, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const { users } = useTaskContext();
  const assignee = users.find(user => user.id === task.assignee);
  
  const dueDate = new Date(task.dueDate);
  const isOverdue = isPast(dueDate) && task.status !== 'completed';
  const isDueToday = isToday(dueDate) && task.status !== 'completed';
  
  return (
    <div 
      className={cn(
        "task-card cursor-pointer",
        isOverdue && "border-red-500/50",
        isDueToday && "border-amber-500/50"
      )} 
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-medium text-foreground line-clamp-1 mb-1">{task.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
        </div>
        <button className="p-1 hover:bg-accent rounded-full">
          <MoreHorizontal size={16} className="text-muted-foreground" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="status" value={task.status} />
          <Badge variant="priority" value={task.priority} />
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {task.comments.length > 0 && (
            <div className="flex items-center">
              <MessageCircle size={14} className="mr-1" />
              {task.comments.length}
            </div>
          )}
          <div className={cn(
            isOverdue && "text-red-400",
            isDueToday && "text-amber-400"
          )}>
            {format(dueDate, 'MMM d')}
          </div>
        </div>
      </div>
      
      <div className="absolute right-3 bottom-3">
        {assignee && (
          <Avatar 
            src={assignee.avatar} 
            name={assignee.name} 
            size="sm" 
            className="border-2 border-card" 
          />
        )}
      </div>
    </div>
  );
};
