
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
import { MoreHorizontal, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Sample milestone data (you would typically fetch this from an API)
const initialMilestones = [
  { 
    id: 1, 
    title: 'Research Proposal', 
    dueDate: '2023-09-15', 
    status: 'completed', 
    description: 'Submit initial research proposal',
    assignee: 'Dr. Smith'
  },
  { 
    id: 2, 
    title: 'Literature Review', 
    dueDate: '2023-11-30', 
    status: 'in_progress', 
    description: 'Complete literature review chapter',
    assignee: 'Dr. Johnson'
  },
  { 
    id: 3, 
    title: 'Methodology Chapter', 
    dueDate: '2024-02-28', 
    status: 'upcoming', 
    description: 'Submit methodology chapter for review',
    assignee: 'Prof. Williams'
  },
  { 
    id: 4, 
    title: 'Data Collection', 
    dueDate: '2024-05-15', 
    status: 'upcoming', 
    description: 'Complete data collection phase',
    assignee: 'Dr. Brown'
  },
  { 
    id: 5, 
    title: 'Data Analysis', 
    dueDate: '2024-07-30', 
    status: 'upcoming', 
    description: 'Analyze collected data and prepare findings',
    assignee: 'Dr. Smith'
  },
  { 
    id: 6, 
    title: 'Results Chapter', 
    dueDate: '2024-09-15', 
    status: 'upcoming', 
    description: 'Write results chapter with findings',
    assignee: 'Dr. Johnson'
  }
];

export const MilestoneTable = () => {
  const [milestones, setMilestones] = useState(initialMilestones);
  const { toast } = useToast();

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'upcoming':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setMilestones(milestones.map(milestone => 
      milestone.id === id ? { ...milestone, status: newStatus } : milestone
    ));
    
    toast({
      title: "Status updated",
      description: `Milestone status has been updated to ${newStatus}.`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of your academic milestones.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {milestones.map((milestone) => (
            <TableRow key={milestone.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getStatusIcon(milestone.status)}
                  {milestone.title}
                </div>
              </TableCell>
              <TableCell>{formatDate(milestone.dueDate)}</TableCell>
              <TableCell>{getStatusBadge(milestone.status)}</TableCell>
              <TableCell>{milestone.assignee}</TableCell>
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
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{milestone.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                          <div>
                            <h4 className="text-sm font-medium">Description</h4>
                            <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Due Date</h4>
                            <p className="text-sm text-muted-foreground">{formatDate(milestone.dueDate)}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Assignee</h4>
                            <p className="text-sm text-muted-foreground">{milestone.assignee}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Status</h4>
                            <div className="mt-1">{getStatusBadge(milestone.status)}</div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleStatusChange(milestone.id, 'upcoming')}>
                      <AlertCircle className="mr-2 h-4 w-4 text-blue-500" />
                      Mark as Upcoming
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(milestone.id, 'in_progress')}>
                      <Clock className="mr-2 h-4 w-4 text-amber-500" />
                      Mark as In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(milestone.id, 'completed')}>
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Mark as Completed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
