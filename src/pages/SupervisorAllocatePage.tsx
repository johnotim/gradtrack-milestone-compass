
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

// Mock data for the supervisors
const supervisors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    specialization: "AI and Machine Learning",
    studentsAssigned: 5,
    status: "Active"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    department: "Engineering",
    specialization: "Mechanical Design",
    studentsAssigned: 3,
    status: "Active"
  },
];

// Mock data for students
const students = [
  {
    id: 101,
    name: "Alex Thompson",
    program: "Computer Science",
    level: "Ph.D",
    year: 2,
    status: "Active",
    supervisorId: null
  },
  {
    id: 102,
    name: "Morgan Lee",
    program: "Engineering",
    level: "Masters",
    year: 1,
    status: "Active",
    supervisorId: null
  },
  {
    id: 103,
    name: "Jamie Wilson",
    program: "Physics",
    level: "Ph.D",
    year: 3,
    status: "Active",
    supervisorId: 2
  },
  {
    id: 104,
    name: "Taylor Adams",
    program: "Mathematics",
    level: "Masters",
    year: 2,
    status: "Active",
    supervisorId: null
  },
  {
    id: 105,
    name: "Casey Brown",
    program: "Computer Science",
    level: "Ph.D",
    year: 1,
    status: "Active",
    supervisorId: 1
  }
];

export default function SupervisorAllocatePage() {
  const [searchParams] = useSearchParams();
  const supervisorIdParam = searchParams.get('supervisor');
  
  const [selectedSupervisor, setSelectedSupervisor] = useState<number | null>(
    supervisorIdParam ? parseInt(supervisorIdParam, 10) : null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);

  // Get the selected supervisor data
  const supervisorData = supervisors.find(s => s.id === selectedSupervisor);

  useEffect(() => {
    // Filter students based on search term and show all students when no supervisor is selected
    if (searchTerm) {
      setFilteredStudents(
        students.filter(student => 
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.program.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredStudents(students);
    }
  }, [searchTerm]);

  const handleAllocate = (studentId: number) => {
    if (!selectedSupervisor) {
      toast.error("Please select a supervisor first");
      return;
    }
    
    // In a real app, this would update the database
    console.log(`Allocating student ${studentId} to supervisor ${selectedSupervisor}`);
    toast.success("Student allocated successfully");
    
    // Update local state to reflect the change
    setFilteredStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, supervisorId: selectedSupervisor } 
          : student
      )
    );
  };

  const handleDeallocate = (studentId: number) => {
    // In a real app, this would update the database
    console.log(`Deallocating student ${studentId}`);
    toast.success("Student deallocated successfully");
    
    // Update local state to reflect the change
    setFilteredStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, supervisorId: null } 
          : student
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Allocate Supervisors</h1>
          <p className="text-muted-foreground">
            Assign supervisors to students for research and project guidance
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Selected Supervisor</CardTitle>
              <CardDescription>Choose a supervisor to allocate students</CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedSupervisor?.toString() || ""}
                onValueChange={(value) => setSelectedSupervisor(parseInt(value, 10))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a supervisor" />
                </SelectTrigger>
                <SelectContent>
                  {supervisors.map((supervisor) => (
                    <SelectItem key={supervisor.id} value={supervisor.id.toString()}>
                      {supervisor.name} - {supervisor.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {supervisorData && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-muted-foreground">Department: <span className="font-medium text-foreground">{supervisorData.department}</span></div>
                  <div className="text-sm text-muted-foreground">Specialization: <span className="font-medium text-foreground">{supervisorData.specialization}</span></div>
                  <div className="text-sm text-muted-foreground">Current Load: <span className="font-medium text-foreground">{supervisorData.studentsAssigned} students</span></div>
                  <div className="text-sm text-muted-foreground">Status: <Badge variant={supervisorData.status === "Active" ? "default" : "secondary"}>{supervisorData.status}</Badge></div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage supervisor allocations for students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Current Supervisor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const studentSupervisor = supervisors.find(s => s.id === student.supervisorId);
                      const isAllocatedToSelected = student.supervisorId === selectedSupervisor;
                      const isAllocatedToOther = student.supervisorId !== null && !isAllocatedToSelected;
                      
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.program}</TableCell>
                          <TableCell>{student.level}</TableCell>
                          <TableCell>Year {student.year}</TableCell>
                          <TableCell>
                            {studentSupervisor ? (
                              <span className="flex items-center gap-1">
                                {studentSupervisor.name}
                                <Badge variant="outline" className="ml-1">
                                  {studentSupervisor.department}
                                </Badge>
                              </span>
                            ) : (
                              <span className="text-muted-foreground">Unassigned</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {isAllocatedToSelected ? (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeallocate(student.id)}
                              >
                                Deallocate
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleAllocate(student.id)}
                                disabled={isAllocatedToOther || !selectedSupervisor}
                              >
                                <UserPlus className="h-3.5 w-3.5" />
                                Allocate
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
