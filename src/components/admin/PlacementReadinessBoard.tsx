
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, AlertCircle, CheckCircle, Eye, Download, BarChart2, FileText } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock student placement readiness data
const mockPlacementData = [
  {
    id: '1',
    name: 'Sam Student',
    avatar: '',
    batch: '2023',
    department: 'cs',
    email: 'student@example.com',
    codingScore: 85,
    attendanceScore: 92,
    academicScore: 78,
    communicationScore: 72,
    overallReadiness: 82,
    status: 'ready',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    weakness: 'Communication skills'
  },
  {
    id: '2',
    name: 'Jane Doe',
    avatar: '',
    batch: '2023',
    department: 'cs',
    email: 'jane@example.com',
    codingScore: 92,
    attendanceScore: 88,
    academicScore: 85,
    communicationScore: 90,
    overallReadiness: 89,
    status: 'ready',
    skills: ['Python', 'Django', 'SQL', 'AWS'],
    weakness: 'None significant'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    avatar: '',
    batch: '2023',
    department: 'eng',
    email: 'alex@example.com',
    codingScore: 67,
    attendanceScore: 75,
    academicScore: 80,
    communicationScore: 85,
    overallReadiness: 77,
    status: 'needs_improvement',
    skills: ['Java', 'Spring', 'MySQL'],
    weakness: 'Coding skills'
  },
  {
    id: '4',
    name: 'Lisa Wang',
    avatar: '',
    batch: '2023',
    department: 'cs',
    email: 'lisa@example.com',
    codingScore: 95,
    attendanceScore: 90,
    academicScore: 92,
    communicationScore: 88,
    overallReadiness: 91,
    status: 'ready',
    skills: ['C++', 'Data Structures', 'Algorithms', 'System Design'],
    weakness: 'None significant'
  },
  {
    id: '5',
    name: 'David Brown',
    avatar: '',
    batch: '2023',
    department: 'math',
    email: 'david@example.com',
    codingScore: 58,
    attendanceScore: 65,
    academicScore: 72,
    communicationScore: 63,
    overallReadiness: 65,
    status: 'not_ready',
    skills: ['Python', 'Statistics', 'Excel'],
    weakness: 'Technical coding skills, Attendance'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ready': return 'bg-green-100 text-green-800 border-green-200';
    case 'needs_improvement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'not_ready': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getProgressColor = (score: number) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 70) return 'bg-blue-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'ready': return 'Placement Ready';
    case 'needs_improvement': return 'Needs Improvement';
    case 'not_ready': return 'Not Ready';
    default: return 'Unknown';
  }
};

interface PlacementReadinessBoardProps {
  batchYear?: string;
}

const PlacementReadinessBoard: React.FC<PlacementReadinessBoardProps> = ({ batchYear = '2023' }) => {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  
  // Toggle student details
  const toggleExpandStudent = (studentId: string) => {
    if (expandedStudent === studentId) {
      setExpandedStudent(null);
    } else {
      setExpandedStudent(studentId);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Placement Readiness Dashboard
            </CardTitle>
            <CardDescription className="mt-1">
              Track student readiness for campus placements
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BarChart2 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead>Coding</TableHead>
                <TableHead className="hidden lg:table-cell">Attendance</TableHead>
                <TableHead className="hidden lg:table-cell">Academic</TableHead>
                <TableHead>Overall</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPlacementData.map((student) => (
                <React.Fragment key={student.id}>
                  <TableRow className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{student.department.toUpperCase()}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-24">
                              <Progress value={student.codingScore} className={`h-2 ${getProgressColor(student.codingScore)}`} />
                              <div className="text-xs mt-1">{student.codingScore}%</div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Coding Score: {student.codingScore}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-24">
                              <Progress value={student.attendanceScore} className={`h-2 ${getProgressColor(student.attendanceScore)}`} />
                              <div className="text-xs mt-1">{student.attendanceScore}%</div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Attendance Score: {student.attendanceScore}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-24">
                              <Progress value={student.academicScore} className={`h-2 ${getProgressColor(student.academicScore)}`} />
                              <div className="text-xs mt-1">{student.academicScore}%</div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Academic Score: {student.academicScore}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-lg">
                          {student.overallReadiness}%
                        </div>
                        {student.status === 'not_ready' && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        {student.status === 'ready' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(student.status)} capitalize font-normal`}
                      >
                        {getStatusLabel(student.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleExpandStudent(student.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded row with detailed information */}
                  {expandedStudent === student.id && (
                    <TableRow className="bg-muted/20">
                      <TableCell colSpan={8} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Skills Assessment</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Coding Proficiency</span>
                                <Progress value={student.codingScore} className={`h-2 w-24 ${getProgressColor(student.codingScore)}`} />
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Academic Performance</span>
                                <Progress value={student.academicScore} className={`h-2 w-24 ${getProgressColor(student.academicScore)}`} />
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Communication</span>
                                <Progress value={student.communicationScore} className={`h-2 w-24 ${getProgressColor(student.communicationScore)}`} />
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Attendance</span>
                                <Progress value={student.attendanceScore} className={`h-2 w-24 ${getProgressColor(student.attendanceScore)}`} />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Technical Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {student.skills.map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="font-normal">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            
                            <h4 className="font-medium mt-4 mb-2">Areas for Improvement</h4>
                            <p className="text-sm text-muted-foreground">{student.weakness}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Actions</h4>
                            <div className="space-y-2">
                              <Button size="sm" className="w-full" variant="outline">
                                <FileText className="h-4 w-4 mr-2" />
                                View Full Report
                              </Button>
                              <Button size="sm" className="w-full" variant="outline">
                                <FileText className="h-4 w-4 mr-2" />
                                Schedule Mock Interview
                              </Button>
                              <Button size="sm" className="w-full" variant="outline">
                                <FileText className="h-4 w-4 mr-2" />
                                Add Recommendation
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlacementReadinessBoard;
