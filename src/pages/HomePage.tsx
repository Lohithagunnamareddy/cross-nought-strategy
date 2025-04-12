
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Users, Award, FileText, Calendar, Code, BrainCircuit, MessageCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Campus Bridge</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive learning management system with coding platform and AI assistants.
          </p>
          
          {!user && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
        
        {user ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <CardTitle>Your Courses</CardTitle>
                  </div>
                  <CardDescription>Access all your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>View course materials, assignments, and track your progress.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/courses">Go to Courses</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-6 w-6 text-primary" />
                    <CardTitle>Coding Platform</CardTitle>
                  </div>
                  <CardDescription>Practice coding skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Solve problems, track your progress, and improve your programming skills.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/coding">Open Coding Platform</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    <CardTitle>AI Assistant</CardTitle>
                  </div>
                  <CardDescription>Get AI-powered help</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Access code hints, reviews, job recommendations, and more with AI assistance.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/ai-assistant">Open AI Assistant</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Assignments</CardTitle>
                  </div>
                  <CardDescription>Manage your assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{user.role === 'student' ? 'Submit and track your assignments' : 'Create and grade student assignments'}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/dashboard">View Assignments</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <CardTitle>Collaborative Coding</CardTitle>
                  </div>
                  <CardDescription>Code with others in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Join coding rooms to collaborate on problems and projects with peers.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/coding/collaborative">Start Collaborating</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" />
                    <CardTitle>Schedule</CardTitle>
                  </div>
                  <CardDescription>Manage your academic schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Keep track of classes, deadlines, and important events.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/dashboard">View Schedule</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {(user.role === 'faculty' || user.role === 'admin') && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Faculty & Admin Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        <CardTitle>Manage Students</CardTitle>
                      </div>
                      <CardDescription>Enrollment and progress tracking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>View and manage student enrollment and track academic progress.</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link to="/courses">Manage Students</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Award className="h-6 w-6 text-primary" />
                        <CardTitle>Coding Analytics</CardTitle>
                      </div>
                      <CardDescription>Analyze student coding performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>View leaderboards, track placement readiness, and analyze coding metrics.</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link to="/admin-dashboard">View Analytics</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <CardTitle>Rich Course Content</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Access a variety of course materials including PDFs, videos, and interactive content to enhance your learning experience.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  <CardTitle>Coding Platform</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Practice coding with a built-in compiler, solve problems across different tracks, and improve your programming skills.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                  <CardTitle>AI-Powered Learning</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Get personalized hints, code reviews, and job recommendations powered by advanced AI assistance.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
