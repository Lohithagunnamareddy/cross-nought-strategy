
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Download, FileSpreadsheet, Filter, Plus, Trash, Users } from 'lucide-react';
import ScheduleTestModal from './ScheduleTestModal';
import { useToast } from '@/components/ui/use-toast';

// Mock data for tests and contests
const mockTests = [
  {
    id: 'test1',
    title: 'Mid-Semester Coding Contest',
    type: 'contest',
    date: '2024-04-15T14:00:00',
    duration: '3 hours',
    participants: 45,
    status: 'upcoming',
    batch: '2023',
    difficulty: 'medium'
  },
  {
    id: 'test2',
    title: 'Data Structures Quiz',
    type: 'quiz',
    date: '2024-04-10T10:00:00',
    duration: '1 hour',
    participants: 32,
    status: 'completed',
    batch: '2024',
    difficulty: 'easy'
  },
  {
    id: 'test3',
    title: 'TCS Mock Placement',
    type: 'mock',
    date: '2024-04-20T09:00:00',
    duration: '2 hours',
    participants: 28,
    status: 'upcoming',
    batch: '2023',
    difficulty: 'hard'
  },
  {
    id: 'test4',
    title: 'Algorithm Sprint Challenge',
    type: 'contest',
    date: '2024-04-05T15:00:00',
    duration: '1.5 hours',
    participants: 38,
    status: 'completed',
    batch: '2023',
    difficulty: 'medium'
  },
  {
    id: 'test5',
    title: 'Frontend Concepts Quiz',
    type: 'quiz',
    date: '2024-04-18T11:00:00',
    duration: '45 minutes',
    participants: 22,
    status: 'upcoming',
    batch: '2024',
    difficulty: 'easy'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
    case 'active':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Completed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'contest':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Contest</Badge>;
    case 'quiz':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Quiz</Badge>;
    case 'mock':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Mock Test</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

interface AdminTestsManagerProps {}

const AdminTestsManager: React.FC<AdminTestsManagerProps> = () => {
  const [selectedTestType, setSelectedTestType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTestType, setCurrentTestType] = useState<'contest' | 'mock' | 'quiz'>('contest');
  const { toast } = useToast();

  const handleScheduleTest = (type: 'contest' | 'mock' | 'quiz') => {
    setCurrentTestType(type);
    setOpenModal(true);
  };

  const handleDeleteTest = (testId: string) => {
    toast({
      title: "Test deleted",
      description: "The test has been deleted from the system.",
    });
    // In a real app, you'd delete the test and update the state
  };

  const handleDownloadResults = (testId: string) => {
    toast({
      title: "Downloading results",
      description: "Results will be downloaded as a CSV file.",
    });
    // In a real app, you'd trigger a download of the results
  };

  // Filter tests based on selected filters
  const filteredTests = mockTests.filter(test => {
    const matchesType = selectedTestType === 'all' || test.type === selectedTestType;
    const matchesStatus = selectedStatus === 'all' || test.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl">Tests & Contests</CardTitle>
              <CardDescription>
                Manage coding contests, quizzes, and mock tests
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => handleScheduleTest('contest')}>
                <Plus className="h-4 w-4 mr-2" />
                New Contest
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleScheduleTest('quiz')}>
                <Plus className="h-4 w-4 mr-2" />
                New Quiz
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleScheduleTest('mock')}>
                <Plus className="h-4 w-4 mr-2" />
                New Mock Test
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Select value={selectedTestType} onValueChange={setSelectedTestType}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedTestType === 'all' ? 'All Types' : selectedTestType.charAt(0).toUpperCase() + selectedTestType.slice(1)}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contest">Contests</SelectItem>
                <SelectItem value="quiz">Quizzes</SelectItem>
                <SelectItem value="mock">Mock Tests</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedStatus === 'all' ? 'All Statuses' : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Duration</TableHead>
                  <TableHead className="hidden lg:table-cell">Participants</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.length > 0 ? (
                  filteredTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">
                        {test.title}
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(test.type)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(test.status)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {new Date(test.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          {test.duration}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          {test.participants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {test.status === 'completed' && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDownloadResults(test.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTest(test.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No {selectedTestType === 'all' ? 'tests' : selectedTestType + 's'} found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTests.length} of {mockTests.length} tests
          </p>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Tests
          </Button>
        </CardFooter>
      </Card>
      
      <ScheduleTestModal 
        open={openModal} 
        onOpenChange={setOpenModal}
        testType={currentTestType}
      />
    </>
  );
};

export default AdminTestsManager;
