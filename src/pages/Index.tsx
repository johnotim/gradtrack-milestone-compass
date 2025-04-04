import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { MilestoneTracker } from '@/components/dashboard/MilestoneTracker';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { MilestoneCalendar } from '@/components/dashboard/MilestoneCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, CalendarPlus, Plus, FileText, BookOpen } from 'lucide-react';
import { StudentTable } from '@/components/students/StudentTable';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { AddProgramForm } from '@/components/programs/AddProgramForm';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Dialog states
  const [newMeetingOpen, setNewMeetingOpen] = useState(false);
  const [newStudentOpen, setNewStudentOpen] = useState(false);
  const [newProgramOpen, setNewProgramOpen] = useState(false);
  const [generateReportOpen, setGenerateReportOpen] = useState(false);

  // Handle quick actions
  const handleReviewSubmissions = () => {
    toast({
      title: "Navigating to submissions",
      description: "Redirecting you to pending submissions page",
    });
    // In a real app, this would navigate to a submissions page
    // For now, we'll just show a toast and simulate navigation
    setTimeout(() => {
      toast({
        title: "Feature in development",
        description: "This feature is coming soon",
      });
    }, 1500);
  };

  const handleScheduleMeeting = () => {
    setNewMeetingOpen(true);
  };

  const handleAddStudent = () => {
    setNewStudentOpen(true);
  };

  const handleAddProgram = () => {
    setNewProgramOpen(true);
  };

  const handleGenerateReport = () => {
    setGenerateReportOpen(true);
  };

  // Mock functions for dialogs
  const scheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    setNewMeetingOpen(false);
    toast({
      title: "Meeting scheduled",
      description: "The meeting has been added to your calendar",
    });
  };

  const addNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setNewStudentOpen(false);
    toast({
      title: "Student added",
      description: "The new student has been added to your roster",
    });
  };

  const generateProgressReport = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerateReportOpen(false);
    toast({
      title: "Report generated",
      description: "Your progress report is ready to download",
    });
  };

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
                <Button 
                  className="w-full bg-white text-primary-navy hover:bg-white/90"
                  onClick={handleReviewSubmissions}
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Review Pending Submissions
                </Button>
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30"
                  onClick={handleScheduleMeeting}
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Schedule New Meeting
                </Button>
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30"
                  onClick={handleAddStudent}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Student
                </Button>
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30"
                  onClick={handleAddProgram}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add New Program
                </Button>
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30"
                  onClick={handleGenerateReport}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Progress Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Students</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/students')}
            >
              View All Students
            </Button>
          </CardHeader>
          <CardContent>
            <StudentTable programId={0} limit={5} />
          </CardContent>
        </Card>
      </div>

      <Dialog open={newMeetingOpen} onOpenChange={setNewMeetingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule a New Meeting</DialogTitle>
            <DialogDescription>
              Schedule a meeting with your students or colleagues.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={scheduleMeeting} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="meetingTitle" className="text-right text-sm font-medium">Title</label>
                <input
                  id="meetingTitle"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Progress Review Meeting"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="meetingDate" className="text-right text-sm font-medium">Date</label>
                <input
                  id="meetingDate"
                  type="date"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="meetingTime" className="text-right text-sm font-medium">Time</label>
                <input
                  id="meetingTime"
                  type="time"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Schedule Meeting</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={newStudentOpen} onOpenChange={setNewStudentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Add a new student to your supervision roster.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={addNewStudent} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="studentName" className="text-right text-sm font-medium">Name</label>
                <input
                  id="studentName"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="studentEmail" className="text-right text-sm font-medium">Email</label>
                <input
                  id="studentEmail"
                  type="email"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                  placeholder="student@university.edu"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="studentProgram" className="text-right text-sm font-medium">Program</label>
                <select
                  id="studentProgram"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="1">Computer Science</option>
                  <option value="2">Data Science</option>
                  <option value="3">Artificial Intelligence</option>
                  <option value="4">Cybersecurity</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Student</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={newProgramOpen} onOpenChange={setNewProgramOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Program</DialogTitle>
            <DialogDescription>
              Add a new academic program to the system.
            </DialogDescription>
          </DialogHeader>
          <AddProgramForm 
            onSuccess={() => {
              setNewProgramOpen(false);
              toast({
                title: "Program added",
                description: "The new program has been successfully added to the system.",
              });
            }} 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={generateReportOpen} onOpenChange={setGenerateReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Progress Report</DialogTitle>
            <DialogDescription>
              Generate a progress report for your students.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={generateProgressReport} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="reportType" className="text-right text-sm font-medium">Report Type</label>
                <select
                  id="reportType"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="individual">Individual Student</option>
                  <option value="program">By Program</option>
                  <option value="all">All Students</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="reportFormat" className="text-right text-sm font-medium">Format</label>
                <select
                  id="reportFormat"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="reportPeriod" className="text-right text-sm font-medium">Period</label>
                <select
                  id="reportPeriod"
                  className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="latest">Latest Term</option>
                  <option value="year">Academic Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Generate Report</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Index;
