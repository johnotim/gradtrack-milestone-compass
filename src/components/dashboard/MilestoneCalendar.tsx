
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const MilestoneCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Current academic year
  const currentYear = new Date().getFullYear();
  
  // Academic events - would typically come from your backend
  const academicEvents = [
    {
      date: new Date(currentYear, 3, 15), // Apr 15
      type: 'submission',
      title: 'Thesis Draft Submission',
    },
    {
      date: new Date(currentYear, 4, 7), // May 7
      type: 'review',
      title: 'Supervisor Review Session',
    },
    {
      date: new Date(currentYear, 5, 21), // Jun 21
      type: 'end-of-term',
      title: 'End of Spring Semester',
    },
    {
      date: new Date(currentYear, 8, 5), // Sep 5
      type: 'submission',
      title: 'Research Proposal Deadline',
    },
    {
      date: new Date(currentYear, 9, 18), // Oct 18
      type: 'review',
      title: 'Mid-term Progress Review',
    },
    {
      date: new Date(currentYear, 11, 15), // Dec 15
      type: 'end-of-term',
      title: 'End of Fall Semester',
    },
  ];
  
  // Function to get event details for a specific date
  const getEventForDate = (dateToCheck: Date) => {
    return academicEvents.find(
      event => 
        event.date.getDate() === dateToCheck.getDate() &&
        event.date.getMonth() === dateToCheck.getMonth() &&
        event.date.getFullYear() === dateToCheck.getFullYear()
    );
  };
  
  // Function to add custom styling to calendar days
  const dayClassName = (date: Date) => {
    if (!date) return "";
    
    const event = getEventForDate(date);
    
    if (event) {
      switch(event.type) {
        case 'submission':
          return "bg-amber-500 text-white hover:bg-amber-600 rounded-full";
        case 'review':
          return "bg-blue-500 text-white hover:bg-blue-600 rounded-full";
        case 'end-of-term':
          return "bg-purple-500 text-white hover:bg-purple-600 rounded-full";
        default:
          return "bg-primary-gold text-white hover:bg-primary-gold/90 rounded-full";
      }
    }
    
    return "";
  };
  
  // Selected date event (if any)
  const selectedDateEvent = date ? getEventForDate(date) : null;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Academic Calendar</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Important academic dates for the current year</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <Calendar 
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-full pointer-events-auto"
          modifiersClassNames={{
            selected: "bg-primary-teal text-white hover:bg-primary-teal/90",
          }}
          components={{
            Day: ({ date, ...props }) => {
              const className = dayClassName(date);
              return <div className={className} {...props} />;
            },
          }}
        />
        
        {selectedDateEvent && (
          <div className="mt-3 p-3 bg-muted rounded-md">
            <p className="font-medium">{selectedDateEvent.title}</p>
            <p className="text-sm text-muted-foreground">
              {format(selectedDateEvent.date, 'MMMM d, yyyy')}
            </p>
          </div>
        )}
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary-teal"></div>
            <span className="text-sm text-gray-500">Selected Date</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-gray-500">Submission Deadlines</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-500">Review Sessions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-500">End of Semester</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
