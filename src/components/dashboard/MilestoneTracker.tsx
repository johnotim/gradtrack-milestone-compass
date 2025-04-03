
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  FileText
} from 'lucide-react';

export const MilestoneTracker = () => {
  const milestones = [
    { 
      id: 1, 
      title: 'Research Proposal', 
      dueDate: '2023-09-15', 
      status: 'completed', 
      description: 'Submit initial research proposal'
    },
    { 
      id: 2, 
      title: 'Literature Review', 
      dueDate: '2023-11-30', 
      status: 'in_progress', 
      description: 'Complete literature review chapter'
    },
    { 
      id: 3, 
      title: 'Methodology Chapter', 
      dueDate: '2024-02-28', 
      status: 'upcoming', 
      description: 'Submit methodology chapter for review'
    },
    { 
      id: 4, 
      title: 'Data Collection', 
      dueDate: '2024-05-15', 
      status: 'upcoming', 
      description: 'Complete data collection phase'
    },
  ];

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'completed':
        return { 
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, 
          badge: <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge> 
        };
      case 'in_progress':
        return { 
          icon: <Clock className="h-5 w-5 text-amber-500" />, 
          badge: <Badge className="bg-amber-500 hover:bg-amber-600">In Progress</Badge> 
        };
      case 'upcoming':
        return { 
          icon: <AlertCircle className="h-5 w-5 text-blue-500" />, 
          badge: <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge> 
        };
      default:
        return { 
          icon: <Clock className="h-5 w-5 text-gray-500" />, 
          badge: <Badge className="bg-gray-500">Unknown</Badge> 
        };
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Milestone Tracker</CardTitle>
            <CardDescription>Track your academic progress and upcoming milestones</CardDescription>
          </div>
          <Badge variant="outline" className="text-primary-teal border-primary-teal">
            4 of 12 Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone) => {
            const { icon, badge } = getStatusDetails(milestone.status);
            
            return (
              <div 
                key={milestone.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  {icon}
                  <div className="ml-4">
                    <div className="font-medium">{milestone.title}</div>
                    <div className="text-sm text-gray-500">Due: {formatDate(milestone.dueDate)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {badge}
                  <button className="p-1 rounded-full hover:bg-gray-200">
                    <FileText className="h-4 w-4 text-gray-500" />
                  </button>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
