
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { 
  ResponsiveContainer,
  PieChart as RechartsDonut,
  Pie,
  Cell,
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
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

// Modern color palette that fits our theme
const COLORS = ['#e50914', '#00C49F', '#FFBB28', '#FF8042'];
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

  const DonutChart = ({ data, colors, title, dataKey = "value" }) => (
    <ChartCard title={title}>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={280}>
          <RechartsDonut>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey={dataKey}
              animationDuration={1000}
              animationBegin={0}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length] || colors['High']} 
                  className="hover:opacity-90 transition-opacity cursor-pointer"
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => {
                const total = data.reduce((a, b) => a + (typeof b.value === 'number' ? b.value : 0), 0);
                const percentage = total > 0 ? Math.round((Number(value) / total) * 100) : 0;
                return [`${value} (${percentage}%)`, name];
              }}
            />
          </RechartsDonut>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 space-y-3">
        {data.map((item, index) => {
          const total = data.reduce((a, b) => a + (typeof b.value === 'number' ? b.value : 0), 0);
          const percentage = total > 0 ? Math.round((Number(item.value) / total) * 100) : 0;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-sm mr-2" 
                    style={{ 
                      backgroundColor: typeof colors === 'object' && !Array.isArray(colors) 
                        ? colors[item.name] 
                        : colors[index % colors.length] 
                    }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {percentage}%
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-1.5"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '--progress-foreground': typeof colors === 'object' && !Array.isArray(colors) 
                    ? colors[item.name] 
                    : colors[index % colors.length]
                } as React.CSSProperties}
              />
            </div>
          );
        })}
      </div>
    </ChartCard>
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 relative">
      {/* Background image with overlay */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000" 
          alt="Dashboard background" 
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      
      {/* Task Status Donut */}
      <DonutChart 
        data={statusData} 
        colors={COLORS} 
        title="Task Status"
      />
      
      {/* Task Priority Donut */}
      <DonutChart 
        data={priorityData} 
        colors={PRIORITY_COLORS} 
        title="Task Priority" 
      />
      
      {/* Team workload */}
      <ChartCard title="Team Workload">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="tasks" 
              fill="#e50914" 
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-80 transition-opacity"
              animationDuration={1500}
              animationBegin={300}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      
      {/* Weekly Task Activity */}
      <ChartCard title="Weekly Task Activity">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="created" 
              fill="#3498db" 
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-80 transition-opacity"
              animationDuration={1500}
              animationBegin={0}
            />
            <Bar 
              dataKey="completed" 
              fill="#2ecc71" 
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity" 
              animationDuration={1500}
              animationBegin={300}
            />
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
    <div className="glass-card p-6 hover:shadow-[0_0_20px_rgba(229,9,20,0.2)] transition-all duration-500">
      <h3 className="mb-4 text-lg font-semibold relative">
        {title}
        <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
      </h3>
      {children}
    </div>
  );
};
