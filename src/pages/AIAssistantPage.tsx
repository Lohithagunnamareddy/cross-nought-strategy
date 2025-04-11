
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeHintAssistant from '@/components/ai/CodeHintAssistant';
import CodeReviewBot from '@/components/ai/CodeReviewBot';
import JobMatchRecommender from '@/components/ai/JobMatchRecommender';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, UserPlus } from 'lucide-react';

const AIAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('codehint');
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get AI-powered assistance for coding, learning, and career advancement
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="codehint">Code Hints</TabsTrigger>
            <TabsTrigger value="codereview">Code Review</TabsTrigger>
            <TabsTrigger value="jobmatch">Job Match</TabsTrigger>
            <TabsTrigger value="collaborate">Collaboration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="codehint">
            <CodeHintAssistant />
          </TabsContent>
          
          <TabsContent value="codereview">
            <CodeReviewBot />
          </TabsContent>
          
          <TabsContent value="jobmatch">
            <JobMatchRecommender />
          </TabsContent>
          
          <TabsContent value="collaborate">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Live Coding Rooms</CardTitle>
                      <CardDescription className="mt-2">
                        Collaborate on code in real-time with peers and mentors
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>Group</span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">DSA Problem Solving</h3>
                        <Badge>3 members</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Group session to solve data structures and algorithms challenges
                      </p>
                      <div className="flex justify-end">
                        <Button size="sm">Join Room</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Web Dev Project</h3>
                        <Badge>5 members</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Collaborative session for the group project on React and Node.js
                      </p>
                      <div className="flex justify-end">
                        <Button size="sm">Join Room</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4">
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create New Room
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Peer Programming</CardTitle>
                      <CardDescription className="mt-2">
                        One-on-one coding sessions with other students
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>1-on-1</span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Available Mentors</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-3">
                              JD
                            </div>
                            <div>
                              <p className="font-medium">Jane Doe</p>
                              <p className="text-xs text-muted-foreground">React, Node.js</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Request</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium mr-3">
                              AS
                            </div>
                            <div>
                              <p className="font-medium">Alex Smith</p>
                              <p className="text-xs text-muted-foreground">Python, Django</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Request</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Recent Sessions</h3>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <p>You haven't participated in any peer programming sessions recently.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Find Programming Partners
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AIAssistantPage;
