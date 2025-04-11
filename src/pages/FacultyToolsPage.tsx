
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MaterialUploader from '@/components/faculty/MaterialUploader';
import QuizCreator from '@/components/faculty/QuizCreator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, File, Filter, UserCheck, UserX } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Mock data for student analytics
const mockStudentData = [
  {
    id: '1',
    name: 'Sam Student',
    avatar: '',
    attendance: 85,
    submissions: 92,
    quizzes: 78,
    lastActive: '2 hours ago',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Doe',
    avatar: '',
    attendance: 92,
    submissions: 88,
    quizzes: 95,
    lastActive: '1 day ago',
    status: 'active'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    avatar: '',
    attendance: 67,
    submissions: 75,
    quizzes: 80,
    lastActive: '3 hours ago',
    status: 'active'
  },
  {
    id: '4',
    name: 'Lisa Wang',
    avatar: '',
    attendance: 95,
    submissions: 90,
    quizzes: 92,
    lastActive: '5 hours ago',
    status: 'active'
  },
  {
    id: '5',
    name: 'David Brown',
    avatar: '',
    attendance: 58,
    submissions: 65,
    quizzes: 72,
    lastActive: '2 days ago',
    status: 'inactive'
  }
];

const FacultyToolsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = React.useState<string>('');
  
  // If not faculty or admin, redirect to dashboard
  React.useEffect(() => {
    if (user && user.role !== 'faculty' && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return null;
  }
  
  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Faculty Tools</h1>
          <p className="text-muted-foreground">
            Manage course content, assignments, quizzes, and student analytics
          </p>
        </div>
        
        <div className="flex items-center">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cs101">CS101 - Introduction to Programming</SelectItem>
              <SelectItem value="cs201">CS201 - Data Structures</SelectItem>
              <SelectItem value="cs301">CS301 - Database Systems</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="quiz">Create Quiz</TabsTrigger>
            <TabsTrigger value="analytics">Student Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <MaterialUploader courseId={selectedCourse || 'cs101'} />
          </TabsContent>
          
          <TabsContent value="quiz">
            <QuizCreator courseId={selectedCourse || 'cs101'} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>Student Performance Analytics</CardTitle>
                    <CardDescription>
                      Track attendance, submissions, and quiz performance
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <File className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Select>
                      <SelectTrigger className="w-[130px]">
                        <div className="flex items-center">
                          <Filter className="h-4 w-4 mr-2" />
                          <span>Filter</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Students</SelectItem>
                        <SelectItem value="active">Active Students</SelectItem>
                        <SelectItem value="inactive">Inactive Students</SelectItem>
                        <SelectItem value="at_risk">At Risk Students</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Submissions</TableHead>
                        <TableHead className="hidden md:table-cell">Quizzes</TableHead>
                        <TableHead className="hidden md:table-cell">Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStudentData.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{student.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-center text-xs">
                                <span>{student.attendance}%</span>
                              </div>
                              <Progress 
                                value={student.attendance} 
                                className={`h-1.5 ${getProgressColor(student.attendance)}`}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-center text-xs">
                                <span>{student.submissions}%</span>
                              </div>
                              <Progress 
                                value={student.submissions} 
                                className={`h-1.5 ${getProgressColor(student.submissions)}`}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-center text-xs">
                                <span>{student.quizzes}%</span>
                              </div>
                              <Progress 
                                value={student.quizzes} 
                                className={`h-1.5 ${getProgressColor(student.quizzes)}`}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span className="text-sm">{student.lastActive}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={student.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}
                            >
                              {student.status === 'active' ? (
                                <div className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                  <span>Active</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                  <span>Inactive</span>
                                </div>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Calendar className="h-4 w-4" />
                              </Button>
                              {student.status === 'active' ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-green-500 hover:text-green-700"
                                >
                                  <UserCheck className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <UserX className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FacultyToolsPage;
