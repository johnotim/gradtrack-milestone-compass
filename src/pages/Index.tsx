
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { MilestoneTracker } from '@/components/dashboard/MilestoneTracker';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { MilestoneCalendar } from '@/components/dashboard/MilestoneCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, CalendarPlus, Plus, FileText } from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Dr. Johnson</h1>
          <p className="text-gray-500">Here's an overview of your postgraduate students' progress</p>
        </div>
        
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MilestoneTracker />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MilestoneCalendar />
          <Card className="bg-gradient-to-br from-primary-navy to-primary-navy/80 text-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-white text-primary-navy hover:bg-white/90">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Review Pending Submissions
                </Button>
                <Button className="w-full bg-white/20 hover:bg-white/30 border border-white/30">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Schedule New Meeting
                </Button>
                <Button className="w-full bg-white/20 hover:bg-white/30 border border-white/30">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Student
                </Button>
                <Button className="w-full bg-white/20 hover:bg-white/30 border border-white/30">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Progress Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
