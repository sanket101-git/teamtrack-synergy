
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({
  src,
  alt = "User avatar",
  name,
  size = 'md',
  className,
}: AvatarProps) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  // Generate initials from name if no src is provided
  const getInitials = () => {
    if (!name) return '';
    
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
  };

  return (
    <div 
      className={cn(
        'rounded-full flex items-center justify-center bg-secondary text-secondary-foreground overflow-hidden',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover" 
          loading="lazy"
        />
      ) : (
        <span>{getInitials()}</span>
      )}
    </div>
  );
};
