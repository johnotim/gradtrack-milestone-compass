
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  UserPlus, 
  ClipboardList, 
  Trash2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";

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
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    department: "Physics",
    specialization: "Quantum Computing",
    studentsAssigned: 4,
    status: "On Leave"
  },
  {
    id: 4,
    name: "Prof. David Thompson",
    department: "Mathematics",
    specialization: "Statistical Analysis",
    studentsAssigned: 6,
    status: "Active"
  },
  {
    id: 5,
    name: "Dr. Rachel Kim",
    department: "Computer Science",
    specialization: "Cybersecurity",
    studentsAssigned: 2,
    status: "Active"
  }
];

export function SupervisorsTable() {
  const [selectedSupervisor, setSelectedSupervisor] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const handleAssignToStudent = (supervisorId: number) => {
    navigate(`/supervisors/allocate?supervisor=${supervisorId}`);
  };

  const handleReviewPerformance = (supervisorId: number) => {
    navigate(`/supervisors/performance?supervisor=${supervisorId}`);
  };

  const handleDeleteSupervisor = (supervisorId: number) => {
    console.log("Deleting supervisor:", supervisorId);
    // In a real app, this would delete the supervisor from the database
    toast.success("Supervisor deleted successfully");
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Students Assigned</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supervisors.map((supervisor) => (
            <TableRow key={supervisor.id}>
              <TableCell className="font-medium">{supervisor.name}</TableCell>
              <TableCell>{supervisor.department}</TableCell>
              <TableCell>{supervisor.specialization}</TableCell>
              <TableCell>{supervisor.studentsAssigned}</TableCell>
              <TableCell>
                <Badge 
                  variant={supervisor.status === "Active" ? "default" : "secondary"}
                >
                  {supervisor.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => handleAssignToStudent(supervisor.id)}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Assign to Student</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => handleReviewPerformance(supervisor.id)}
                    >
                      <ClipboardList className="h-4 w-4" />
                      <span>Review Performance</span>
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          className="cursor-pointer text-destructive flex items-center gap-2" 
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the supervisor record and remove all assignments.
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteSupervisor(supervisor.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
