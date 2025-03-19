
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useTaskContext } from '@/context/TaskContext';
import { getTaskStatusData, getTaskPriorityData, getTeamTaskData, getWeeklyCompletionData } from '@/lib/data';
import { FileText, Download } from 'lucide-react';

export default function Reports() {
  const { tasks, users } = useTaskContext();
  
  // Prepare data for charts
  const statusData = getTaskStatusData();
  const priorityData = getTaskPriorityData();
  const teamData = getTeamTaskData();
  const weeklyData = getWeeklyCompletionData();
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#EA4C89'];
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">View your team's performance analytics</p>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          <Download size={18} className="mr-2" />
          Export Report
        </button>
      </div>
      
      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Tasks</h3>
            <div className="text-primary bg-primary/10 p-1.5 rounded-full">
              <FileText size={18} />
            </div>
          </div>
          <p className="text-3xl font-semibold">{tasks.length}</p>
          <p className="text-sm text-muted-foreground">Total tasks in the system</p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Completed</h3>
            <div className="text-green-400 bg-green-400/10 p-1.5 rounded-full">
              <FileText size={18} />
            </div>
          </div>
          <p className="text-3xl font-semibold">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
          <p className="text-sm text-muted-foreground">Completed tasks</p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">In Progress</h3>
            <div className="text-amber-400 bg-amber-400/10 p-1.5 rounded-full">
              <FileText size={18} />
            </div>
          </div>
          <p className="text-3xl font-semibold">
            {tasks.filter(t => t.status === 'in-progress').length}
          </p>
          <p className="text-sm text-muted-foreground">Tasks in progress</p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Team</h3>
            <div className="text-blue-400 bg-blue-400/10 p-1.5 rounded-full">
              <FileText size={18} />
            </div>
          </div>
          <p className="text-3xl font-semibold">{users.length}</p>
          <p className="text-sm text-muted-foreground">Team members</p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
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
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Team Workload</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#e50914" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="glass-card p-6 col-span-1 lg:col-span-2">
          <h3 className="text-lg font-medium mb-4">Weekly Task Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="created" stroke="#3498db" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="completed" stroke="#2ecc71" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Summary Table */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Task Summary by Priority</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Pending</th>
                <th className="py-3 px-4 text-left">In Progress</th>
                <th className="py-3 px-4 text-left">Completed</th>
                <th className="py-3 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {['high', 'medium', 'low'].map(priority => {
                const priorityTasks = tasks.filter(t => t.priority === priority);
                const pending = priorityTasks.filter(t => t.status === 'pending').length;
                const inProgress = priorityTasks.filter(t => t.status === 'in-progress').length;
                const completed = priorityTasks.filter(t => t.status === 'completed').length;
                
                return (
                  <tr key={priority} className="border-b border-border">
                    <td className="py-3 px-4 capitalize">{priority}</td>
                    <td className="py-3 px-4">{pending}</td>
                    <td className="py-3 px-4">{inProgress}</td>
                    <td className="py-3 px-4">{completed}</td>
                    <td className="py-3 px-4">{priorityTasks.length}</td>
                  </tr>
                );
              })}
              <tr className="font-medium">
                <td className="py-3 px-4">Total</td>
                <td className="py-3 px-4">{tasks.filter(t => t.status === 'pending').length}</td>
                <td className="py-3 px-4">{tasks.filter(t => t.status === 'in-progress').length}</td>
                <td className="py-3 px-4">{tasks.filter(t => t.status === 'completed').length}</td>
                <td className="py-3 px-4">{tasks.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
