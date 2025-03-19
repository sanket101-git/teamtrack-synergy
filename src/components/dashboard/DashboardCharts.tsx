
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { 
  getTaskStatusData, 
  getTaskPriorityData,
  getTeamTaskData,
  getWeeklyCompletionData
} from '@/lib/data';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const PRIORITY_COLORS = {
  'Low': '#3498db',
  'Medium': '#f39c12',
  'High': '#e74c3c'
};

export const DashboardCharts = () => {
  const { tasks } = useTaskContext();
  
  const statusData = getTaskStatusData();
  const priorityData = getTaskPriorityData();
  const teamData = getTeamTaskData();
  const weeklyData = getWeeklyCompletionData();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ChartCard title="Task Status">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
      
      <ChartCard title="Task Priority">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {priorityData.map((entry) => (
                <Cell 
                  key={`cell-${entry.name}`} 
                  fill={PRIORITY_COLORS[entry.name as keyof typeof PRIORITY_COLORS]} 
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
      
      <ChartCard title="Team Workload">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={teamData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasks" fill="#e50914" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      
      <ChartCard title="Weekly Task Activity">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="created" fill="#3498db" />
            <Bar dataKey="completed" fill="#2ecc71" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <div className="glass-card p-6">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
};
