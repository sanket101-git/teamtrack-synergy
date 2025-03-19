
import React, { useState } from 'react';
import { useTaskContext, User } from '@/context/TaskContext';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { BarChart, CheckSquare, Mail, MoreHorizontal, Phone, Plus, Search, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
  user: User;
  taskCount: number;
  onClick?: () => void;
}

const TeamMemberCard = ({ user, taskCount, onClick }: TeamMemberCardProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-900/30 text-red-300 border-red-800';
      case 'manager':
        return 'bg-amber-900/30 text-amber-300 border-amber-800';
      case 'member':
      default:
        return 'bg-blue-900/30 text-blue-300 border-blue-800';
    }
  };

  return (
    <div className="glass-card p-6 flex flex-col h-full transition-all duration-300 hover:translate-y-[-3px]" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <Avatar src={user.avatar} name={user.name} size="lg" />
        <span className={cn(
          'text-xs border rounded-full px-2 py-0.5',
          getRoleColor(user.role)
        )}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </div>
      
      <h3 className="text-lg font-medium mb-1">{user.name}</h3>
      
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Mail size={14} className="mr-2" />
        {user.email}
      </div>
      
      <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
        <div className="flex items-center text-sm">
          <CheckSquare size={14} className="mr-2" />
          <span>{taskCount} Tasks</span>
        </div>
        
        <div className="flex gap-2">
          <button className="p-1.5 rounded-full hover:bg-accent transition-colors">
            <Mail size={16} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-accent transition-colors">
            <BarChart size={16} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-accent transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const TeamView = () => {
  const { users, getTasksByAssignee } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'manager' | 'member'>('all');
  
  // Filter users based on search and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Team Members</h1>
        </div>
        
        <button
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <UserPlus size={18} className="mr-2" />
          Add Team Member
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search team members..."
            className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="member">Member</option>
          </select>
        </div>
      </div>
      
      {/* Team Member Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <TeamMemberCard 
                key={user.id} 
                user={user} 
                taskCount={getTasksByAssignee(user.id).length} 
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No team members found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
