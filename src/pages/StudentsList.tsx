
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentTable } from '@/components/students/StudentTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for programs
const PROGRAMS = [
  { id: 1, name: 'Doctor of Philosophy (Ph.D.)' },
  { id: 2, name: 'Master of Science (M.Sc.)' },
  { id: 3, name: 'Master of Business Administration (MBA)' },
  { id: 4, name: 'Master of Arts (M.A.)' }
];

const StudentsList = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>(PROGRAMS[0].id.toString());

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Students Enrollment</h1>
            <p className="text-gray-500">View and manage students enrolled in each program</p>
          </div>
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
