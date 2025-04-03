
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

export const MilestoneCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Important dates - would typically come from your backend
  const importantDates = [
    new Date(2023, 3, 15), // Apr 15, 2023
    new Date(2023, 4, 7),  // May 7, 2023
    new Date(2023, 5, 21), // Jun 21, 2023
  ];
  
  // Function to add custom styling to calendar days
  const dayClassName = (date: Date) => {
    if (!date) return "";
    
    // Check if this date is in our important dates
    const isImportant = importantDates.some(
      importantDate => 
        importantDate.getDate() === date.getDate() &&
        importantDate.getMonth() === date.getMonth() &&
        importantDate.getFullYear() === date.getFullYear()
    );
    
    if (isImportant) {
      return "bg-primary-gold text-white hover:bg-primary-gold/90 rounded-full";
    }
    
    return "";
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar 
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-full"
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
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary-teal"></div>
            <span className="text-sm text-gray-500">Selected Date</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary-gold"></div>
            <span className="text-sm text-gray-500">Important Milestones</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
