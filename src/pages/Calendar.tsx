
import React from 'react';
import { CalendarView } from '@/components/calendar/CalendarView';

export default function Calendar() {
  return (
    <div className="h-full">
      <div className="glass-card p-6 mb-6 animate-fadeIn">
        <h1 className="text-2xl font-semibold mb-2">Calendar View</h1>
        <p className="text-muted-foreground">View and manage your tasks in a calendar format</p>
      </div>
      <div className="animate-fade-in">
        <CalendarView />
      </div>
    </div>
  );
}
