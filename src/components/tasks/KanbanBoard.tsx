
import React, { useState } from 'react';
import { useTaskContext, Task, TaskStatus } from '@/context/TaskContext';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: (status: TaskStatus) => void;
}

const KanbanColumn = ({ title, status, tasks, onTaskClick, onAddTask }: KanbanColumnProps) => {
  return (
    <div className="flex flex-col h-full min-w-[280px] glass-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium">{title}</h3>
        <div 
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            status === 'pending' && "bg-blue-900/30 text-blue-300",
            status === 'in-progress' && "bg-amber-900/30 text-amber-300",
            status === 'completed' && "bg-green-900/30 text-green-300"
          )}
        >
          {tasks.length}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
        
        <button
          onClick={() => onAddTask(status)}
          className="w-full py-3 px-4 border border-dashed border-border rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Task
        </button>
      </div>
    </div>
  );
};

export const KanbanBoard = () => {
  const { tasks, getTasksByStatus } = useTaskContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [initialStatus, setInitialStatus] = useState<TaskStatus>('pending');
  
  const pendingTasks = getTasksByStatus('pending');
  const inProgressTasks = getTasksByStatus('in-progress');
  const completedTasks = getTasksByStatus('completed');
  
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };
  
  const handleAddTask = (status: TaskStatus) => {
    setSelectedTask(null);
    setInitialStatus(status);
    setIsFormOpen(true);
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Kanban Board</h1>
        <p className="text-muted-foreground">Visualize your workflow and manage tasks</p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="flex gap-6 h-full pb-4">
          <KanbanColumn
            title="Pending"
            status="pending"
            tasks={pendingTasks}
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
          
          <KanbanColumn
            title="In Progress"
            status="in-progress"
            tasks={inProgressTasks}
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
          
          <KanbanColumn
            title="Completed"
            status="completed"
            tasks={completedTasks}
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
        </div>
      </div>
      
      {/* Task Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="glass-card max-w-lg w-full max-h-[90vh] overflow-auto">
            <TaskForm 
              task={selectedTask} 
              initialStatus={initialStatus}
              onClose={handleCloseForm} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
