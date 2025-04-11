
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarHeatmap } from '@/components/ui/calendar-heatmap';
import { BarChart, LineChart } from '@/components/ui/chart';
import { BarChart3, Calendar, Clock, Code, Github, Star, Trophy } from 'lucide-react';

// Mock data for demonstration
const mockHeatmapData = [
  { date: '2024-03-01', count: 2 },
  { date: '2024-03-02', count: 1 },
  { date: '2024-03-03', count: 0 },
  { date: '2024-03-04', count: 3 },
  { date: '2024-03-05', count: 4 },
  { date: '2024-03-06', count: 0 },
  { date: '2024-03-07', count: 1 },
  { date: '2024-03-08', count: 0 },
  { date: '2024-03-09', count: 2 },
  // Add more data as needed...
];

const mockBarData = [
  { name: 'Python', value: 45 },
  { name: 'JavaScript', value: 28 },
  { name: 'Java', value: 17 },
  { name: 'C++', value: 10 }
];

const mockLineData = [
  { date: '2024-03-01', problems: 2 },
  { date: '2024-03-02', problems: 3 },
  { date: '2024-03-03', problems: 3 },
  { date: '2024-03-04', problems: 6 },
  { date: '2024-03-05', problems: 10 },
  { date: '2024-03-06', problems: 10 },
  { date: '2024-03-07', problems: 11 },
  { date: '2024-03-08', problems: 11 },
  { date: '2024-03-09', problems: 13 }
  // Add more data as needed...
];

interface ProgressDashboardProps {
  userId?: string;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userId }) => {
  const currentStreak = 4; // Mock current streak
  const longestStreak = 12; // Mock longest streak
  const totalSolved = 45; // Mock total solved problems
  
  return (
    <div className="space-y-6">
      {/* Streak and Badge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Current Streak
            </CardTitle>
            <CardDescription>Days in a row</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{currentStreak}</span>
              <span className="text-muted-foreground ml-1">days</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Trophy className="h-3 w-3 mr-1" />
              <span>Longest: {longestStreak} days</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Code className="h-4 w-4 mr-1" />
              Problems Solved
            </CardTitle>
            <CardDescription>Total submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{totalSolved}</span>
              <span className="text-muted-foreground ml-1">problems</span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Last 7 days: +12 problems
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Star className="h-4 w-4 mr-1" />
              Earned Badges
            </CardTitle>
            <CardDescription>Skill recognition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700">
                JavaScript Pro
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700">
                DSA Beginner
              </Badge>
              <Badge className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700">
                7-Day Streak
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Github className="h-5 w-5 mr-2" />
            Coding Activity
          </CardTitle>
          <CardDescription>
            Your daily problem-solving activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarHeatmap 
            data={mockHeatmapData}
            startDate={new Date('2024-03-01')}
            endDate={new Date('2024-03-30')}
            colorScale={['#f3f4f6', '#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8']}
          />
        </CardContent>
      </Card>
      
      {/* Charts Tabs */}
      <Tabs defaultValue="progress">
        <TabsList>
          <TabsTrigger value="progress">Progress Over Time</TabsTrigger>
          <TabsTrigger value="languages">Languages Used</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Problem Solving Progress</CardTitle>
              <CardDescription>
                Cumulative problems solved over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart
                  data={mockLineData}
                  index="date"
                  categories={['problems']}
                  colors={['blue']}
                  valueFormatter={(value: number) => `${value} problems`}
                  showLegend={false}
                  showGridLines={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle>Languages Distribution</CardTitle>
              <CardDescription>
                Problems solved by programming language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart
                  data={mockBarData}
                  index="name"
                  categories={['value']}
                  colors={['blue']}
                  valueFormatter={(value: number) => `${value} problems`}
                  showLegend={false}
                  layout="vertical"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressDashboard;
