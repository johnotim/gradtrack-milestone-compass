
import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, FileEdit, Trash, UserCheck } from 'lucide-react';

// Mock sponsorship data
const SPONSORSHIPS = [
  {
    id: 1,
    studentName: 'Emma Johnson',
    studentId: 'STU-2023-001',
    program: 'Computer Science',
    sponsorOrganization: 'Tech Futures Foundation',
    type: 'Full',
    amount: 25000,
    startDate: '2023-09-01',
    endDate: '2027-06-30',
    status: 'active',
    studentAvatar: ''
  },
  {
    id: 2,
    studentName: 'Michael Chang',
    studentId: 'STU-2023-012',
    program: 'Computer Science',
    sponsorOrganization: 'Global Education Fund',
    type: 'Partial',
    amount: 12500,
    startDate: '2023-09-01',
    endDate: '2027-06-30',
    status: 'active',
    studentAvatar: ''
  },
  {
    id: 3,
    studentName: 'Sarah Williams',
    studentId: 'STU-2023-045',
    program: 'Business Administration',
    sponsorOrganization: 'Business Leaders Association',
    type: 'Full',
    amount: 22000,
    startDate: '2023-09-01',
    endDate: '2025-06-30',
    status: 'active',
    studentAvatar: ''
  },
  {
    id: 4,
    studentName: 'Daniel Lee',
    studentId: 'STU-2022-078',
    program: 'Mechanical Engineering',
    sponsorOrganization: 'Engineering Innovation Corp',
    type: 'Partial',
    amount: 15000,
    startDate: '2022-09-01',
    endDate: '2026-06-30',
    status: 'pending renewal',
    studentAvatar: ''
  },
  {
    id: 5,
    studentName: 'Jessica Martinez',
    studentId: 'STU-2023-102',
    program: 'Computer Science',
    sponsorOrganization: 'Women in Tech Initiative',
    type: 'Full',
    amount: 28000,
    startDate: '2023-09-01',
    endDate: '2027-06-30',
    status: 'active',
    studentAvatar: ''
  },
];

// Mock application data
const APPLICATIONS = [
  {
    id: 101,
    studentName: 'Alex Chen',
    studentId: 'STU-2023-156',
    program: 'Data Science',
    targetSponsor: 'Tech Futures Foundation',
    requestedAmount: 25000,
    submissionDate: '2023-07-15',
    status: 'under review',
    studentAvatar: ''
  },
  {
    id: 102,
    studentName: 'Olivia Brown',
    studentId: 'STU-2023-187',
    program: 'Artificial Intelligence',
    targetSponsor: 'AI Research Group',
    requestedAmount: 30000,
    submissionDate: '2023-07-20',
    status: 'pending',
    studentAvatar: ''
  },
  {
    id: 103,
    studentName: 'Ethan Wilson',
    studentId: 'STU-2023-204',
    program: 'Electrical Engineering',
    targetSponsor: 'Energy Solutions Inc',
    requestedAmount: 22000,
    submissionDate: '2023-07-25',
    status: 'approved',
    studentAvatar: ''
  },
  {
    id: 104,
    studentName: 'Sophia Garcia',
    studentId: 'STU-2023-233',
    program: 'Finance',
    targetSponsor: 'Global Banking Association',
    requestedAmount: 18000,
    submissionDate: '2023-08-01',
    status: 'rejected',
    studentAvatar: ''
  },
];

export const SponsorshipsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'pending renewal':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending Renewal</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'under review':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Under Review</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSponsorshipTypeBadge = (type: string) => {
    return type === 'Full' 
      ? <Badge className="bg-primary">Full</Badge> 
      : <Badge variant="outline">Partial</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sponsorships Management</CardTitle>
        <CardDescription>
          View and manage student sponsorships and funding applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Sponsorships</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Sponsor Organization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SPONSORSHIPS.map((sponsorship) => (
                    <TableRow key={sponsorship.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={sponsorship.studentAvatar} alt={sponsorship.studentName} />
                            <AvatarFallback className="bg-primary-navy text-white">
                              {getInitials(sponsorship.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{sponsorship.studentName}</div>
                            <div className="text-xs text-muted-foreground">{sponsorship.studentId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{sponsorship.program}</TableCell>
                      <TableCell>{sponsorship.sponsorOrganization}</TableCell>
                      <TableCell>{getSponsorshipTypeBadge(sponsorship.type)}</TableCell>
                      <TableCell>${sponsorship.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(sponsorship.startDate).toLocaleDateString()} - 
                          {new Date(sponsorship.endDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(sponsorship.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" title="View Details">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit Sponsorship">
                            <FileEdit size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete Sponsorship">
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="applications">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Target Sponsor</TableHead>
                    <TableHead>Requested Amount</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {APPLICATIONS.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={application.studentAvatar} alt={application.studentName} />
                            <AvatarFallback className="bg-primary-navy text-white">
                              {getInitials(application.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{application.studentName}</div>
                            <div className="text-xs text-muted-foreground">{application.studentId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{application.program}</TableCell>
                      <TableCell>{application.targetSponsor}</TableCell>
                      <TableCell>${application.requestedAmount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(application.submissionDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" title="View Application">
                            <Eye size={16} />
                          </Button>
                          {application.status === 'under review' || application.status === 'pending' ? (
                            <Button variant="ghost" size="icon" title="Approve Application">
                              <UserCheck size={16} />
                            </Button>
                          ) : null}
                          <Button variant="ghost" size="icon" title="Delete Application">
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
