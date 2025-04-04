
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentTable } from '@/components/students/StudentTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { EnrollStudentForm } from '@/components/students/EnrollStudentForm';
import { useToast } from '@/hooks/use-toast';
import { PROGRAMS } from '@/components/programs/ProgramsTable';

const StudentsList = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>(PROGRAMS[0].id.toString());
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Students Enrollment</h1>
            <p className="text-gray-500">View and manage students enrolled in each program</p>
          </div>
          <div className="flex space-x-4">
            <div className="w-72">
              <Select
                value={selectedProgram}
                onValueChange={(value) => setSelectedProgram(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {PROGRAMS.map((program) => (
                    <SelectItem key={program.id} value={program.id.toString()}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Enroll Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enroll New Student</DialogTitle>
                  <DialogDescription>
                    Enter student information to complete enrollment
                  </DialogDescription>
                </DialogHeader>
                <EnrollStudentForm 
                  programs={PROGRAMS}
                  onSuccess={() => {
                    setDialogOpen(false);
                    toast({
                      title: "Student enrolled",
                      description: "The new student has been successfully enrolled.",
                    });
                  }} 
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {PROGRAMS.find(p => p.id.toString() === selectedProgram)?.name || 'All Programs'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StudentTable programId={parseInt(selectedProgram)} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentsList;
