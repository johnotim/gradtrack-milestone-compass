
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  RotateCcw 
} from "lucide-react";

// Mock data for complaints
const complaints = [
  {
    id: 1,
    title: "Delayed Feedback on Dissertation Draft",
    student: "Alex Johnson",
    category: "Supervision",
    dateSubmitted: "2025-04-01",
    status: "Pending"
  },
  {
    id: 2,
    title: "Access to Laboratory Equipment",
    student: "Maria Garcia",
    category: "Resources",
    dateSubmitted: "2025-03-28",
    status: "Under Review"
  },
  {
    id: 3,
    title: "Inappropriate Supervision Conduct",
    student: "James Wilson",
    category: "Conduct",
    dateSubmitted: "2025-03-25",
    status: "Resolved"
  },
  {
    id: 4,
    title: "Inadequate Research Facilities",
    student: "Emily Chen",
    category: "Resources",
    dateSubmitted: "2025-03-22",
    status: "Pending"
  },
  {
    id: 5,
    title: "Missed Supervision Meetings",
    student: "Daniel Ahmed",
    category: "Supervision",
    dateSubmitted: "2025-03-15",
    status: "Resolved"
  }
];

export function ComplaintsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Under Review":
        return "secondary";
      case "Resolved":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Complaint Title</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow key={complaint.id}>
              <TableCell className="font-medium">{complaint.title}</TableCell>
              <TableCell>{complaint.student}</TableCell>
              <TableCell>{complaint.category}</TableCell>
              <TableCell>{complaint.dateSubmitted}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(complaint.status) as any}>
                  {complaint.status}
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
                      onClick={() => console.log("View details", complaint.id)}
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    
                    {complaint.status !== "Resolved" && (
                      <DropdownMenuItem 
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => console.log("Mark as resolved", complaint.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Mark as Resolved</span>
                      </DropdownMenuItem>
                    )}
                    
                    {complaint.status === "Resolved" && (
                      <DropdownMenuItem 
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => console.log("Reopen complaint", complaint.id)}
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Reopen</span>
                      </DropdownMenuItem>
                    )}
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
