
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GraduationCap, FileCheck, MessageSquare, Clock } from 'lucide-react';

export const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'document',
      title: 'Research proposal submitted',
      user: 'Jennifer Smith',
      userInitials: 'JS',
      time: '2 hours ago',
      icon: <FileCheck className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Literature review approved',
      user: 'Dr. Robert Chen',
      userInitials: 'RC',
      time: 'Yesterday',
      icon: <GraduationCap className="h-4 w-4 text-primary-navy" />,
    },
    {
      id: 3,
      type: 'comment',
      title: 'New comment on your submission',
      user: 'Prof. Laura Williams',
      userInitials: 'LW',
      time: '2 days ago',
      icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 4,
      type: 'deadline',
      title: 'Methodology chapter deadline extended',
      user: 'Registrar Office',
      userInitials: 'RO',
      time: '3 days ago',
      icon: <Clock className="h-4 w-4 text-amber-500" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Updates from your research journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{activity.userInitials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {activity.icon}
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                </div>
                <p className="text-sm text-gray-500">
                  by {activity.user} · {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
