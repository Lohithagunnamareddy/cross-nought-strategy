
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodingLeaderboard from '@/components/admin/CodingLeaderboard';
import PlacementReadinessBoard from '@/components/admin/PlacementReadinessBoard';
import AdminTestsManager from '@/components/admin/AdminTestsManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart } from '@/components/ui/chart';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Mock data for charts
const userActivityData = [
  { date: '2024-03-01', students: 32, faculty: 10 },
  { date: '2024-03-02', students: 40, faculty: 12 },
  { date: '2024-03-03', students: 45, faculty: 8 },
  { date: '2024-03-04', students: 30, faculty: 15 },
  { date: '2024-03-05', students: 50, faculty: 12 },
  { date: '2024-03-06', students: 55, faculty: 14 },
  { date: '2024-03-07', students: 40, faculty: 10 },
];

const moduleUsageData = [
  { name: 'Courses', value: 45 },
  { name: 'Coding', value: 32 },
  { name: 'AI Assistant', value: 18 },
  { name: 'Submissions', value: 28 },
  { name: 'Quizzes', value: 22 },
];

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If not admin, redirect to dashboard
  React.useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage platform analytics, users, and placement activities
          </p>
        </div>
        
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="placement">Placement Readiness</TabsTrigger>
            <TabsTrigger value="tests">Tests & Contests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>
                    Daily active users over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      data={userActivityData}
                      index="date"
                      categories={['students', 'faculty']}
                      colors={['blue', 'green']}
                      valueFormatter={(value: number) => `${value} users`}
                      showLegend={true}
                      showGridLines={false}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Module Usage</CardTitle>
                  <CardDescription>
                    Distribution of activity across platform modules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart
                      data={moduleUsageData}
                      index="name"
                      categories={['value']}
                      colors={['blue']}
                      valueFormatter={(value: number) => `${value}%`}
                      showLegend={false}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <CodingLeaderboard />
          </TabsContent>
          
          <TabsContent value="placement">
            <PlacementReadinessBoard batchYear="2023" />
          </TabsContent>
          
          <TabsContent value="tests">
            <AdminTestsManager />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
