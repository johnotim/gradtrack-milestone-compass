
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
  Download, 
  Edit, 
  Trash2,
  ExternalLink
} from "lucide-react";

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Advanced Research Methodologies",
    type: "Book",
    author: "Dr. Robert Anderson",
    year: 2023,
    program: "All Research Programs",
    format: "PDF"
  },
  {
    id: 2,
    title: "Machine Learning: Principles and Applications",
    type: "Textbook",
    author: "Prof. Lisa Chen & Dr. Michael Wong",
    year: 2024,
    program: "Computer Science",
    format: "PDF"
  },
  {
    id: 3,
    title: "Journal of Quantum Computing",
    type: "Journal",
    author: "Various",
    year: 2025,
    program: "Physics",
    format: "Online"
  },
  {
    id: 4,
    title: "Statistical Methods for Research",
    type: "Guide",
    author: "Dr. Sarah Johnson",
    year: 2022,
    program: "Mathematics",
    format: "PDF"
  },
  {
    id: 5,
    title: "Engineering Design: Case Studies",
    type: "Case Study Collection",
    author: "Engineering Faculty",
    year: 2024,
    program: "Engineering",
    format: "PDF & Print"
  }
];

export function ResourcesTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Format</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.title}</TableCell>
              <TableCell>{resource.type}</TableCell>
              <TableCell>{resource.author}</TableCell>
              <TableCell>{resource.year}</TableCell>
              <TableCell>{resource.program}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {resource.format}
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
                      onClick={() => console.log("View resource", resource.id)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => console.log("Download", resource.id)}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => console.log("Edit", resource.id)}
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer text-destructive flex items-center gap-2"
                      onClick={() => console.log("Delete", resource.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
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
}
