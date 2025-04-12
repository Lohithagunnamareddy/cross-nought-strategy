
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressDashboard from '@/components/coding/ProgressDashboard';
import ProblemInterface from '@/components/coding/ProblemInterface';
import OnlineCompiler from '@/components/coding/OnlineCompiler';
import CodingTrack from '@/components/coding/CodingTrack';
import { useAuth } from '@/hooks/useAuth';
import CodeHintAssistant from '@/components/ai/CodeHintAssistant';

// Mock data for the coding tracks
const mockTrackData = {
  trackId: 'dsa-track',
  title: 'Data Structures & Algorithms',
  description: 'Master essential data structures and algorithms concepts for technical interviews',
  progress: 32,
  totalProblems: 45,
  solvedProblems: 14,
  sections: [
    {
      id: 'arrays',
      title: 'Arrays & Strings',
      description: 'Fundamental operations with arrays and string manipulation',
      progress: 60,
      problems: [
        {
          id: 'prob1',
          title: 'Two Sum',
          difficulty: 'easy' as const,
          points: 10,
          tags: ['arrays', 'hash table'],
          isCompleted: true,
          isLocked: false
        },
        {
          id: 'prob2',
          title: 'Valid Anagram',
          difficulty: 'easy' as const,
          points: 10,
          tags: ['strings', 'sorting'],
          isCompleted: true,
          isLocked: false
        },
        {
          id: 'prob3',
          title: 'Container With Most Water',
          difficulty: 'medium' as const,
          points: 20,
          tags: ['arrays', 'two pointers'],
          isCompleted: false,
          isLocked: false
        },
        {
          id: 'prob4',
          title: 'Group Anagrams',
          difficulty: 'medium' as const,
          points: 20,
          tags: ['strings', 'hash table'],
          isCompleted: false,
          isLocked: true
        }
      ]
    },
    {
      id: 'linkedlists',
      title: 'Linked Lists',
      description: 'Operations with singly and doubly linked lists',
      progress: 25,
      problems: [
        {
          id: 'prob5',
          title: 'Reverse Linked List',
          difficulty: 'easy' as const,
          points: 15,
          tags: ['linked list'],
          isCompleted: true,
          isLocked: false
        },
        {
          id: 'prob6',
          title: 'Detect Cycle',
          difficulty: 'medium' as const,
          points: 20,
          tags: ['linked list', 'two pointers'],
          isCompleted: false,
          isLocked: false
        },
        {
          id: 'prob7',
          title: 'Merge Two Sorted Lists',
          difficulty: 'easy' as const,
          points: 15,
          tags: ['linked list', 'recursion'],
          isCompleted: false,
          isLocked: false
        },
        {
          id: 'prob8',
          title: 'LRU Cache',
          difficulty: 'hard' as const,
          points: 30,
          tags: ['linked list', 'hash table'],
          isCompleted: false,
          isLocked: true
        }
      ]
    }
  ]
};

const CodingPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [problemId, setProblemId] = useState<string | null>(null);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  
  const isInstructor = user?.role === 'faculty' || user?.role === 'admin';
  
  const handleProblemSelect = (id: string) => {
    setProblemId(id);
    setShowAiAssistant(true); // Show AI assistant when problem is selected
  };
  
  const renderContent = () => {
    if (problemId) {
      return (
        <div className="space-y-6">
          <ProblemInterface problemId={problemId} />
          {showAiAssistant && (
            <div className="mt-6">
              <CodeHintAssistant />
            </div>
          )}
        </div>
      );
    }
    
    switch (activeTab) {
      case 'dashboard':
        return <ProgressDashboard userId={user?.id} />;
      case 'problems':
        return <CodingTrack {...mockTrackData} onProblemSelect={handleProblemSelect} />;
      case 'compiler':
        return <OnlineCompiler />;
      default:
        return <ProgressDashboard userId={user?.id} />;
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Coding Platform</h1>
          <p className="text-muted-foreground">
            Practice coding problems, track your progress, and improve your skills
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="problems">Problem Sets</TabsTrigger>
            <TabsTrigger value="compiler">Compiler</TabsTrigger>
            {isInstructor && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
          </TabsList>
          
          <div className="mt-6">
            {renderContent()}
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CodingPage;
