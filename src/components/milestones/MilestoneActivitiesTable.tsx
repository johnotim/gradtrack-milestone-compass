
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Pencil, 
  Trash, 
  CalendarClock
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { EditMilestoneActivityForm } from './EditMilestoneActivityForm';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Sample activity data (you would typically fetch this from an API)
const sampleActivities = {
  1: [
    { 
      id: 101, 
      title: 'Define Research Question', 
      dueDate: '2023-08-01', 
      status: 'completed', 
      description: 'Define the primary research question and sub-questions',
      assignee: 'Student'
    },
    { 
      id: 102, 
      title: 'Literature Search', 
      dueDate: '2023-08-15', 
      status: 'completed', 
      description: 'Search for relevant literature and create bibliography',
      assignee: 'Student'
    },
    { 
      id: 103, 
      title: 'Proposal Draft', 
      dueDate: '2023-09-01', 
      status: 'completed', 
      description: 'Write the first draft of the research proposal',
      assignee: 'Student'
    },
    { 
      id: 104, 
      title: 'Supervisor Review', 
      dueDate: '2023-09-10', 
      status: 'completed', 
      description: 'Submit to supervisor for review and feedback',
      assignee: 'Dr. Smith'
    },
  ],
  2: [
    { 
      id: 201, 
      title: 'Identify Key Sources', 
      dueDate: '2023-10-15', 
      status: 'completed', 
      description: 'Identify and collect key sources for literature review',
      assignee: 'Student'
    },
    { 
      id: 202, 
      title: 'Categorize Literature', 
      dueDate: '2023-10-30', 
      status: 'completed', 
      description: 'Group literature into themes and categories',
      assignee: 'Student'
    },
    { 
      id: 203, 
      title: 'Write First Draft', 
      dueDate: '2023-11-15', 
      status: 'in_progress', 
      description: 'Write the first complete draft of the literature review',
      assignee: 'Student'
    },
    { 
      id: 204, 
      title: 'Supervisor Feedback', 
      dueDate: '2023-11-25', 
      status: 'upcoming', 
      description: 'Receive and incorporate supervisor feedback',
      assignee: 'Dr. Johnson'
    },
  ],
  3: [
    { 
      id: 301, 
      title: 'Research Design', 
      dueDate: '2024-01-15', 
      status: 'upcoming', 
      description: 'Develop detailed research design and methodology',
      assignee: 'Student'
    },
    { 
      id: 302, 
      title: 'Tools Selection', 
      dueDate: '2024-01-30', 
      status: 'upcoming', 
      description: 'Select and justify research tools and methods',
      assignee: 'Student'
    },
  ],
  // Add sample activities for the other milestones as needed
};

interface MilestoneActivitiesTableProps {
  milestoneId: number;
}

export const MilestoneActivitiesTable: React.FC<MilestoneActivitiesTableProps> = ({ milestoneId }) => {
  const [activities, setActivities] = useState(sampleActivities[milestoneId as keyof typeof sampleActivities] || []);
  const { toast } = useToast();
  const [editingActivity, setEditingActivity] = useState<any | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-amber-500 hover:bg-amber-600">In Progress</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, status: newStatus } : activity
    ));
    
    toast({
      title: "Status updated",
      description: `Activity status has been updated to ${newStatus}.`,
    });
  };

  const handleEditActivity = (activity: any) => {
    setEditingActivity(activity);
  };

  const handleUpdateActivity = (updatedActivity: any) => {
    setActivities(activities.map(activity => 
      activity.id === updatedActivity.id ? updatedActivity : activity
    ));
    
    setEditingActivity(null);
    
    toast({
      title: "Activity updated",
      description: "The activity has been updated successfully.",
    });
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
    
    toast({
      title: "Activity deleted",
      description: "The activity has been deleted successfully.",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Activities for this milestone.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.title}</TableCell>
                <TableCell>{formatDate(activity.dueDate)}</TableCell>
                <TableCell>{getStatusBadge(activity.status)}</TableCell>
                <TableCell>{activity.assignee}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Activity
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Activity</DialogTitle>
                            <DialogDescription>
                              Make changes to the activity details.
                            </DialogDescription>
                          </DialogHeader>
                          <EditMilestoneActivityForm 
                            activity={activity}
                            onSave={handleUpdateActivity}
                            onCancel={() => setEditingActivity(null)}
                          />
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash className="mr-2 h-4 w-4 text-red-500" />
                            Delete Activity
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the activity.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleDeleteActivity(activity.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleStatusChange(activity.id, 'upcoming')}>
                        <Badge className="mr-2 bg-blue-500">Upcoming</Badge>
                        Mark as Upcoming
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(activity.id, 'in_progress')}>
                        <Badge className="mr-2 bg-amber-500">In Progress</Badge>
                        Mark as In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(activity.id, 'completed')}>
                        <Badge className="mr-2 bg-green-500">Completed</Badge>
                        Mark as Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No activities found for this milestone. Add a new activity to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
