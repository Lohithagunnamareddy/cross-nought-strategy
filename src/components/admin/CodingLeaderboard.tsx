
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Medal, Search, Download, Trophy, Filter, Users, ArrowUpDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for leaderboard
const mockLeaderboardData = [
  { 
    id: '1', 
    name: 'Sam Student', 
    avatar: '', 
    batch: '2023', 
    department: 'cs',
    problemsSolved: 87, 
    totalPoints: 3450, 
    streak: 21,
    badges: ['JavaScript Pro', 'DSA Intermediate', '21-Day Streak'],
    rank: 1,
    tracks: ['DSA', 'Web Development']
  },
  { 
    id: '2', 
    name: 'Jane Doe', 
    avatar: '', 
    batch: '2024', 
    department: 'cs',
    problemsSolved: 72, 
    totalPoints: 2850, 
    streak: 15,
    badges: ['Python Master', 'Algorithm Champion'],
    rank: 2,
    tracks: ['DSA', 'Python']
  },
  { 
    id: '3', 
    name: 'Alex Johnson', 
    avatar: '', 
    batch: '2023', 
    department: 'math',
    problemsSolved: 65, 
    totalPoints: 2710, 
    streak: 8,
    badges: ['Database Ninja', '30-Day Streak', 'SQL Expert'],
    rank: 3,
    tracks: ['Databases', 'Web Development']
  },
  { 
    id: '4', 
    name: 'Lisa Wang', 
    avatar: '', 
    batch: '2024', 
    department: 'eng',
    problemsSolved: 59, 
    totalPoints: 2320, 
    streak: 12,
    badges: ['C++ Expert', 'DSA Beginner'],
    rank: 4,
    tracks: ['DSA', 'C++']
  },
  { 
    id: '5', 
    name: 'David Brown', 
    avatar: '', 
    batch: '2023', 
    department: 'cs',
    problemsSolved: 54, 
    totalPoints: 2150, 
    streak: 9,
    badges: ['Frontend Specialist', 'JavaScript Intermediate'],
    rank: 5,
    tracks: ['Web Development', 'JavaScript']
  },
  { 
    id: '6', 
    name: 'Sarah Miller', 
    avatar: '', 
    batch: '2024', 
    department: 'eng',
    problemsSolved: 47, 
    totalPoints: 1980, 
    streak: 6,
    badges: ['Java Beginner', 'Problem Solver'],
    rank: 6,
    tracks: ['Java', 'DSA']
  },
  { 
    id: '7', 
    name: 'Michael Chen', 
    avatar: '', 
    batch: '2023', 
    department: 'sci',
    problemsSolved: 42, 
    totalPoints: 1740, 
    streak: 4,
    badges: ['Python Beginner', '7-Day Streak'],
    rank: 7,
    tracks: ['Python', 'Data Science']
  }
];

// Mock batches for filtering
const BATCHES = ['2023', '2024', '2025'];
const DEPARTMENTS = ['cs', 'eng', 'math', 'sci', 'bus', 'arts'];
const TRACKS = ['DSA', 'Web Development', 'Python', 'Java', 'C++', 'Databases', 'JavaScript', 'Data Science'];

interface CodingLeaderboardProps {
  title?: string;
}

const CodingLeaderboard: React.FC<CodingLeaderboardProps> = ({ 
  title = 'Coding Leaderboard' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('rank');
  const [timeRange, setTimeRange] = useState<string>('all');

  // Filter and sort data
  const filteredData = mockLeaderboardData.filter(student => {
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch === '' || student.batch === selectedBatch;
    const matchesDepartment = selectedDepartment === '' || student.department === selectedDepartment;
    const matchesTrack = selectedTrack === '' || student.tracks.includes(selectedTrack);
    
    return matchesSearch && matchesBatch && matchesDepartment && matchesTrack;
  }).sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    if (sortBy === 'points') return b.totalPoints - a.totalPoints;
    if (sortBy === 'problems') return b.problemsSolved - a.problemsSolved;
    if (sortBy === 'streak') return b.streak - a.streak;
    return 0;
  });

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-700';
    return 'text-muted-foreground';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              {title}
            </CardTitle>
            <CardDescription className="mt-1">
              Rankings based on coding performance across all tracks
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="w-full">
        <div className="px-6">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">All Time</TabsTrigger>
            <TabsTrigger value="month">Monthly</TabsTrigger>
            <TabsTrigger value="week">Weekly</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-[110px]">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{selectedBatch || 'Batch'}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Batches</SelectItem>
                  {BATCHES.map(batch => (
                    <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-1" />
                    <span>{selectedDepartment || 'Department'}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {DEPARTMENTS.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                <SelectTrigger className="w-[160px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-1" />
                    <span>{selectedTrack || 'Track'}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Tracks</SelectItem>
                  {TRACKS.map(track => (
                    <SelectItem key={track} value={track}>{track}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download CSV</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value={timeRange} className="mt-0">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>
                      <Button variant="ghost" size="sm" className="p-0 font-medium h-auto" onClick={() => setSortBy('problems')}>
                        Problems
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" size="sm" className="p-0 font-medium h-auto" onClick={() => setSortBy('points')}>
                        Points
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      <Button variant="ghost" size="sm" className="p-0 font-medium h-auto" onClick={() => setSortBy('streak')}>
                        Streak
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">Badges</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {student.rank <= 3 ? (
                              <Medal className={`h-5 w-5 mr-1 ${getMedalColor(student.rank)}`} />
                            ) : null}
                            {student.rank}
                          </div>
                        </TableCell>
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
                              <div className="text-xs text-muted-foreground">
                                {student.department.toUpperCase()} • {student.batch}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.problemsSolved}</TableCell>
                        <TableCell className="font-medium">{student.totalPoints}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Badge variant="outline" className="font-normal">
                              {student.streak} days
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {student.badges.map((badge, idx) => (
                              <Badge key={idx} variant="secondary" className="font-normal text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodingLeaderboard;
