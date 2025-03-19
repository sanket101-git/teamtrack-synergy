
import React from 'react';
import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { useTaskContext, Task } from '@/context/TaskContext';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Avatar } from '@/components/common/Avatar';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  const { getUpcomingTasks, getOverdueTasks, users } = useTaskContext();
  
  const upcomingTasks = getUpcomingTasks(7);
  const overdueTasks = getOverdueTasks();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card p-6 transition-all duration-500">
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's an overview of your team's progress.</p>
      </div>
      
      {/* KPI Cards */}
      <DashboardCards />
      
      {/* Charts */}
      <DashboardCharts />
      
      {/* Recent Tasks & Team Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <div className="glass-card p-6 hover-glow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Upcoming Tasks</h2>
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
                <div key={task.id} className="glass p-3 rounded-lg flex items-center justify-between transition-all duration-300 hover:scale-[1.02]">
                  <div>
                    <p className="font-medium">{task.title}</p>
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
        
        {/* Overdue Tasks */}
        <div className="glass-card p-6 hover-glow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Overdue Tasks</h2>
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
                <div key={task.id} className="glass p-3 rounded-lg flex items-center justify-between border border-red-500/30 transition-all duration-300 hover:scale-[1.02] hover:border-red-500/60">
                  <div>
                    <p className="font-medium">{task.title}</p>
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
  );
}
