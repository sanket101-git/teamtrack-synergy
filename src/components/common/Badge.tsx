
import React from 'react';
import { cn } from '@/lib/utils';
import { TaskPriority, TaskStatus } from '@/context/TaskContext';

interface BadgeProps {
  variant?: 'status' | 'priority' | 'default';
  value: string;
  className?: string;
}

export const Badge = ({ variant = 'default', value, className }: BadgeProps) => {
  // Helper function to determine badge styles based on variant and value
  const getBadgeStyles = () => {
    if (variant === 'status') {
      switch (value as TaskStatus) {
        case 'pending':
          return 'bg-blue-900/30 text-blue-300 border-blue-800';
        case 'in-progress':
          return 'bg-amber-900/30 text-amber-300 border-amber-800';
        case 'completed':
          return 'bg-green-900/30 text-green-300 border-green-800';
        default:
          return 'bg-secondary text-secondary-foreground';
      }
    } else if (variant === 'priority') {
      switch (value as TaskPriority) {
        case 'low':
          return 'bg-blue-900/30 text-blue-300 border-blue-800';
        case 'medium':
          return 'bg-amber-900/30 text-amber-300 border-amber-800';
        case 'high':
          return 'bg-red-900/30 text-red-300 border-red-800';
        default:
          return 'bg-secondary text-secondary-foreground';
      }
    }
    return 'bg-secondary text-secondary-foreground';
  };

  // Format the display text (capitalize first letter)
  const displayText = value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ');

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getBadgeStyles(),
        className
      )}
    >
      {displayText}
    </span>
  );
};
