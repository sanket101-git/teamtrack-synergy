
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ListChecks,
  Users,
  Layers
} from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard = ({ title, value, icon, change, trend }: StatCardProps) => {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-blue-400',
  };

  return (
    <div className="glass-card flex items-center p-6">
      <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold">{value}</p>
          {change && (
            <span className={`ml-2 text-xs ${trend ? trendColors[trend] : ''}`}>
              {change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const DashboardCards = () => {
  const { tasks, getTaskStats, getOverdueTasks, getUpcomingTasks, users } = useTaskContext();
  const stats = getTaskStats();
  const overdueCount = getOverdueTasks().length;
  const upcomingCount = getUpcomingTasks(7).length;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Tasks"
        value={stats.total}
        icon={<ListChecks size={24} />}
        change="+5% from last month"
        trend="up"
      />
      <StatCard
        title="Completed Tasks"
        value={stats.completed}
        icon={<CheckCircle size={24} />}
        change="+12% from last month"
        trend="up"
      />
      <StatCard
        title="In Progress"
        value={stats.inProgress}
        icon={<Clock size={24} />}
        change="Same as last month"
        trend="neutral"
      />
      <StatCard
        title="Pending Tasks"
        value={stats.pending}
        icon={<Layers size={24} />}
        change="-3% from last month"
        trend="down"
      />
      <StatCard
        title="Overdue Tasks"
        value={overdueCount}
        icon={<AlertCircle size={24} />}
        change="+2 from last week"
        trend="up"
      />
      <StatCard
        title="Team Members"
        value={users.length}
        icon={<Users size={24} />}
      />
    </div>
  );
};
