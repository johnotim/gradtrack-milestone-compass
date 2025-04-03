
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock student data
const STUDENTS = [
  { 
    id: 1,
    name: 'Emma Johnson',
    email: 'emma.j@university.edu',
    program: 1,
    enrollmentDate: '2023-09-01',
    status: 'active',
    progress: 65,
    avatarUrl: ''
  },
  { 
    id: 2,
    name: 'Michael Chang',
    email: 'mchang@university.edu',
    program: 1,
    enrollmentDate: '2023-09-01',
    status: 'active',
    progress: 42,
    avatarUrl: ''
  },
  { 
    id: 3,
    name: 'Sarah Williams',
    email: 's.williams@university.edu',
    program: 2,
    enrollmentDate: '2023-01-15',
    status: 'active',
    progress: 89,
    avatarUrl: ''
  },
  { 
    id: 4,
    name: 'Daniel Lee',
    email: 'd.lee@university.edu',
    program: 3,
    enrollmentDate: '2022-09-01',
    status: 'probation',
    progress: 35,
    avatarUrl: ''
  },
  { 
    id: 5,
    name: 'Jessica Martinez',
    email: 'j.martinez@university.edu',
    program: 1,
    enrollmentDate: '2023-09-01',
    status: 'active',
    progress: 71,
    avatarUrl: ''
  },
  { 
    id: 6,
    name: 'David Wilson',
    email: 'dwilson@university.edu',
    program: 4,
    enrollmentDate: '2022-01-15',
    status: 'inactive',
    progress: 0,
    avatarUrl: ''
  },
];

interface StudentTableProps {
  programId: number;
}

export const StudentTable: React.FC<StudentTableProps> = ({ programId }) => {
  const filteredStudents = programId 
    ? STUDENTS.filter(student => student.program === programId)
    : STUDENTS;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'probation':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Probation</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback className="bg-primary-navy text-white">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            student.progress > 70 ? 'bg-green-500' : 
                            student.progress > 40 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No students found for this program
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {filteredStudents.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
