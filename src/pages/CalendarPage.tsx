
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MilestoneCalendar } from '../components/dashboard/MilestoneCalendar';

const CalendarPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary-navy">Academic Calendar</h1>
          <p className="text-muted-foreground">View and track important academic dates and deadlines</p>
        </div>
        <div className="grid gap-6">
          <MilestoneCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
