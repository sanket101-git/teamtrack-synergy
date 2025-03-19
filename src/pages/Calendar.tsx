
import React from 'react';
import { CalendarView } from '@/components/calendar/CalendarView';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function Calendar() {
  return (
    <div className="h-full">
      <div className="glass-card p-6 mb-6 animate-fadeIn relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000" 
            alt="Calendar background" 
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold mb-2 flex items-center">
            <CalendarIcon className="mr-2 text-primary" size={24} />
            Calendar View
          </h1>
          <p className="text-muted-foreground">View and manage your tasks in a calendar format</p>
        </div>
      </div>
      <div className="animate-fade-in">
        <CalendarView />
      </div>
    </div>
  );
}
