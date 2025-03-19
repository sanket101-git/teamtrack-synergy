
import React from 'react';
import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { useTaskContext, Task } from '@/context/TaskContext';
import { Avatar } from '@/components/common/Avatar';
import { format } from 'date-fns';
import { ChevronRight, BarChart3, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  const { getUpcomingTasks, getOverdueTasks, users } = useTaskContext();
  
  const upcomingTasks = getUpcomingTasks(7);
  const overdueTasks = getOverdueTasks();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card p-6 transition-all duration-500 relative overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" 
            alt="Dashboard hero" 
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Content with relative positioning to appear above the background */}
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold mb-2 flex items-center">
            <BarChart3 className="mr-2 text-primary" />
            Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Welcome back. Here's an overview of your team's progress and current workload.
          </p>
        </div>
      </div>
      
      {/* KPI Cards */}
      <DashboardCards />
      
      {/* Charts with background */}
      <div className="relative">
        <DashboardCharts />
      </div>
      
      {/* Recent Tasks & Team Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <div className="glass-card p-6 hover-glow transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2000" 
              alt="Upcoming tasks" 
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <Calendar size={18} className="mr-2 text-primary" />
                Upcoming Tasks
              </h2>
              <Link 
                to="/tasks" 
                className="text-sm text-primary flex items-center hover:underline transition-all duration-300 hover:text-primary/80"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-3">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.slice(0, 4).map(task => (
                  <div key={task.id} className="glass p-3 rounded-lg flex items-center justify-between transition-all duration-300 hover:scale-[1.02] border border-white/5 group">
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <Avatar 
                      src={users.find(u => u.id === task.assignee)?.avatar} 
                      name={users.find(u => u.id === task.assignee)?.name || ''}
                      size="sm"
                    />
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No upcoming tasks</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Overdue Tasks */}
        <div className="glass-card p-6 hover-glow transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=2000" 
              alt="Overdue tasks" 
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <CheckCircle size={18} className="mr-2 text-destructive" />
                Overdue Tasks
              </h2>
              <Link 
                to="/tasks" 
                className="text-sm text-primary flex items-center hover:underline transition-all duration-300 hover:text-primary/80"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-3">
              {overdueTasks.length > 0 ? (
                overdueTasks.slice(0, 4).map(task => (
                  <div key={task.id} className="glass p-3 rounded-lg flex items-center justify-between border border-red-500/30 transition-all duration-300 hover:scale-[1.02] hover:border-red-500/60 group">
                    <div>
                      <p className="font-medium group-hover:text-destructive transition-colors">{task.title}</p>
                      <p className="text-xs text-red-400">
                        Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <Avatar 
                      src={users.find(u => u.id === task.assignee)?.avatar} 
                      name={users.find(u => u.id === task.assignee)?.name || ''}
                      size="sm"
                    />
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No overdue tasks</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
