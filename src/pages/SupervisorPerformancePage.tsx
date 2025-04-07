
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// Mock data for the supervisors
const supervisors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    specialization: "AI and Machine Learning",
    studentsAssigned: 5,
    status: "Active",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    office: "CS Building, Room 305",
    joinedDate: "2019-08-15"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    department: "Engineering",
    specialization: "Mechanical Design",
    studentsAssigned: 3,
    status: "Active",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 987-6543",
    office: "Engineering Hall, Room 210",
    joinedDate: "2017-03-22"
  },
];

// Mock performance data
const studentProgressData = [
  { month: 'Jan', onTrack: 4, delayed: 1, atRisk: 0 },
  { month: 'Feb', onTrack: 3, delayed: 2, atRisk: 0 },
  { month: 'Mar', onTrack: 5, delayed: 0, atRisk: 0 },
  { month: 'Apr', onTrack: 4, delayed: 1, atRisk: 0 },
  { month: 'May', onTrack: 3, delayed: 1, atRisk: 1 },
  { month: 'Jun', onTrack: 2, delayed: 2, atRisk: 1 },
];

const feedbackData = [
  { month: 'Jan', rating: 4.5 },
  { month: 'Feb', rating: 4.3 },
  { month: 'Mar', rating: 4.7 },
  { month: 'Apr', rating: 4.2 },
  { month: 'May', rating: 4.6 },
  { month: 'Jun', rating: 4.4 },
];

const meetingComplianceData = [
  { month: 'Jan', scheduled: 12, conducted: 12, compliance: 100 },
  { month: 'Feb', scheduled: 10, conducted: 9, compliance: 90 },
  { month: 'Mar', scheduled: 14, conducted: 13, compliance: 93 },
  { month: 'Apr', scheduled: 12, conducted: 10, compliance: 83 },
  { month: 'May', scheduled: 15, conducted: 15, compliance: 100 },
  { month: 'Jun', scheduled: 12, conducted: 11, compliance: 92 },
];

// Mock student activities
const studentActivities = [
  {
    id: 1,
    student: "Alex Thompson",
    activity: "Research Proposal Submission",
    status: "Completed",
    dueDate: "2023-05-15",
    completedDate: "2023-05-10",
    feedback: "Excellent work, very thorough analysis.",
    grade: "A"
  },
  {
    id: 2,
    student: "Morgan Lee",
    activity: "Literature Review",
    status: "In Progress",
    dueDate: "2023-06-30",
    completedDate: null,
    feedback: "",
    grade: ""
  },
  {
    id: 3,
    student: "Casey Brown",
    activity: "Methodology Chapter",
    status: "Delayed",
    dueDate: "2023-04-20",
    completedDate: "2023-05-05",
    feedback: "Good work but needs more detail on experimental setup.",
    grade: "B+"
  },
  {
    id: 4,
    student: "Alex Thompson",
    activity: "Experiment Design",
    status: "Completed",
    dueDate: "2023-03-10",
    completedDate: "2023-03-08",
    feedback: "Very innovative approach.",
    grade: "A-"
  },
  {
    id: 5,
    student: "Casey Brown",
    activity: "Progress Report",
    status: "Completed",
    dueDate: "2023-05-30",
    completedDate: "2023-05-25",
    feedback: "Great progress.",
    grade: "A"
  }
];

// Component for the performance tracking page
export default function SupervisorPerformancePage() {
  const [searchParams] = useSearchParams();
  const supervisorIdParam = searchParams.get('supervisor');
  
  const [selectedSupervisor, setSelectedSupervisor] = useState<number | null>(
    supervisorIdParam ? parseInt(supervisorIdParam, 10) : 1
  );

  // Get the selected supervisor data
  const supervisorData = supervisors.find(s => s.id === selectedSupervisor) || supervisors[0];

  // Function to calculate days difference
  const calculateDaysDifference = (date1: string, date2: string | null) => {
    if (!date2) return "N/A";
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supervisor Performance</h1>
          <p className="text-muted-foreground">
            Track and analyze supervisor performance metrics
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{supervisorData.name}</CardTitle>
                <CardDescription>{supervisorData.department} - {supervisorData.specialization}</CardDescription>
              </div>
              <Badge variant={supervisorData.status === "Active" ? "default" : "secondary"}>
                {supervisorData.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{supervisorData.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{supervisorData.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Office</p>
                <p className="text-sm text-muted-foreground">{supervisorData.office}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium">Students Assigned</p>
                <p className="text-xl font-bold">{supervisorData.studentsAssigned}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Joined Date</p>
                <p className="text-xl font-bold">{new Date(supervisorData.joinedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Performance Rating</p>
                <p className="text-xl font-bold">4.6/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Performance Overview</TabsTrigger>
            <TabsTrigger value="activities">Student Activities</TabsTrigger>
            <TabsTrigger value="feedback">Feedback & Ratings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Tracking</CardTitle>
                <CardDescription>Monthly statistics of supervised students' progress</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentProgressData} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="onTrack" name="On Track" fill="#10b981" />
                    <Bar dataKey="delayed" name="Delayed" fill="#f59e0b" />
                    <Bar dataKey="atRisk" name="At Risk" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meeting Compliance</CardTitle>
                <CardDescription>Scheduled vs. conducted supervision meetings</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={meetingComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} unit="%" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="scheduled" name="Scheduled" fill="#94a3b8" />
                    <Bar yAxisId="left" dataKey="conducted" name="Conducted" fill="#3b82f6" />
                    <Line yAxisId="right" type="monotone" dataKey="compliance" name="Compliance %" stroke="#8b5cf6" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Student Activities & Milestones</CardTitle>
                <CardDescription>
                  Track student activities and their completion status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Student</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Activity</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Due Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Timeliness</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {studentActivities.map((activity) => {
                        const daysDiff = activity.completedDate 
                          ? calculateDaysDifference(activity.dueDate, activity.completedDate)
                          : "N/A";
                          
                        const isEarly = typeof daysDiff === "number" && daysDiff < 0;
                        const isLate = typeof daysDiff === "number" && daysDiff > 0;
                        
                        return (
                          <tr key={activity.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">{activity.student}</td>
                            <td className="p-4 align-middle font-medium">{activity.activity}</td>
                            <td className="p-4 align-middle">
                              <Badge 
                                variant={
                                  activity.status === "Completed" ? "default" :
                                  activity.status === "In Progress" ? "outline" : "secondary"
                                }
                              >
                                {activity.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{new Date(activity.dueDate).toLocaleDateString()}</td>
                            <td className="p-4 align-middle">
                              {activity.status === "Completed" ? (
                                <span className={
                                  isEarly ? "text-green-600" : 
                                  isLate ? "text-red-600" : 
                                  "text-blue-600"
                                }>
                                  {isEarly ? `${Math.abs(daysDiff as number)} days early` : 
                                   isLate ? `${daysDiff} days late` : 
                                   "On time"}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">Pending</span>
                              )}
                            </td>
                            <td className="p-4 align-middle font-medium">
                              {activity.grade || "-"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Student Feedback Ratings</CardTitle>
                <CardDescription>
                  Average monthly ratings from students
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={feedbackData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      name="Average Rating" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>
                  Comments from students about supervision quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentActivities
                    .filter(activity => activity.feedback)
                    .map(activity => (
                      <div key={activity.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{activity.student}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.activity} • {new Date(activity.completedDate || "").toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-sm">{activity.feedback}</p>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
