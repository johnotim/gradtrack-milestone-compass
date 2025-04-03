
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck, GraduationCap, CalendarClock, FileClock } from 'lucide-react';

export const StatsCards = () => {
  const stats = [
    {
      title: 'Completed Milestones',
      value: '4/12',
      description: '33% completion rate',
      icon: <ClipboardCheck className="h-5 w-5 text-green-500" />,
      change: '+8% from last month',
      color: 'border-l-4 border-green-500',
    },
    {
      title: 'Pending Approvals',
      value: '2',
      description: 'Research proposal, Ethics',
      icon: <FileClock className="h-5 w-5 text-amber-500" />,
      change: '-1 since last week',
      color: 'border-l-4 border-amber-500',
    },
    {
      title: 'Time to Next Milestone',
      value: '14',
      description: 'Days until Methodology chapter',
      icon: <CalendarClock className="h-5 w-5 text-blue-500" />,
      change: 'Due on April 17, 2025',
      color: 'border-l-4 border-blue-500',
    },
    {
      title: 'Expected Graduation',
      value: '2026',
      description: 'Summer semester',
      icon: <GraduationCap className="h-5 w-5 text-primary-gold" />,
      change: 'On track',
      color: 'border-l-4 border-primary-gold',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className={`${stat.color}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.description}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
