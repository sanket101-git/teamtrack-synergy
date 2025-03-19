
import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday,
  getDay
} from 'date-fns';
import { useTaskContext, Task } from '@/context/TaskContext';
import { TaskForm } from '../tasks/TaskForm';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CalendarView = () => {
  const { tasks } = useTaskContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Calendar Navigation
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  // Generate days for the calendar
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Add offset days to start from Sunday
  const startDay = getDay(monthStart);
  
  // Get tasks for a specific day
  const getTasksForDay = (day: Date): Task[] => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return isSameDay(taskDate, day);
    });
  };
  
  // Handle task click
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };
  
  // Handle day click
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setSelectedTask(null);
    setIsFormOpen(true);
  };
  
  // Close form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
    setSelectedDate(null);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <p className="text-muted-foreground">Manage your tasks by due date</p>
      </div>
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-md hover:bg-accent transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-md hover:bg-accent transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="flex-1 glass-card overflow-hidden">
        {/* Day Names */}
        <div className="grid grid-cols-7 border-b border-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-sm font-medium">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 grid-rows-[repeat(6,_minmax(100px,_1fr))] h-full overflow-auto">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-start-${index}`} className="border-b border-r border-border bg-background/50" />
          ))}
          
          {/* Days of the month */}
          {monthDays.map(day => {
            const dayTasks = getTasksForDay(day);
            const isDayToday = isToday(day);
            
            return (
              <div 
                key={day.toISOString()} 
                className={cn(
                  "border-b border-r border-border p-2 relative",
                  isDayToday && "bg-accent/20"
                )}
              >
                <div className="flex justify-between items-start">
                  <span 
                    className={cn(
                      "inline-block h-6 w-6 text-center text-sm leading-6 rounded-full",
                      isDayToday && "bg-primary text-white font-medium"
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  
                  <button
                    onClick={() => handleDayClick(day)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded-full transition-opacity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                <div className="mt-1 max-h-[80px] overflow-y-auto space-y-1">
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className={cn(
                        "px-2 py-1 text-xs rounded truncate cursor-pointer",
                        task.priority === 'low' && "bg-blue-900/30 text-blue-300",
                        task.priority === 'medium' && "bg-amber-900/30 text-amber-300",
                        task.priority === 'high' && "bg-red-900/30 text-red-300",
                        task.status === 'completed' && "line-through opacity-60"
                      )}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Task Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="glass-card max-w-lg w-full max-h-[90vh] overflow-auto">
            <TaskForm 
              task={selectedTask} 
              initialStatus={'pending'}
              onClose={handleCloseForm} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
