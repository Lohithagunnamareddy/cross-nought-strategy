
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Check, ChevronDown, ChevronUp, Clock, Code, FileText, ListChecks, RefreshCw, ThumbsUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import OnlineCompiler from './OnlineCompiler';

// Define mock problem data
const mockProblem = {
  id: 'prob123',
  title: 'Two Sum',
  difficulty: 'easy', // easy, medium, hard
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
    },
    {
      input: 'nums = [3,3], target = 6',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
    }
  ],
  constraints: [
    '`2 <= nums.length <= 10^4`',
    '`-10^9 <= nums[i] <= 10^9`',
    '`-10^9 <= target <= 10^9`',
    'Only one valid answer exists.'
  ],
  starterCode: {
    python: `def twoSum(nums, target):\n    # Write your code here\n    pass`,
    java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return null;\n    }\n}`,
    javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your code here\n};`
  },
  hints: [
    'A naive approach would use two nested loops with O(n²) time complexity.',
    'Consider using a hash map to reduce the time complexity.',
    'As you iterate through the array, check if the complement (target - current number) exists in the hash map.'
  ],
  tags: ['arrays', 'hash-table', 'beginner'],
  timeLimit: 5000, // ms
  memoryLimit: 16, // MB
  track: 'DSA Fundamentals',
  points: 50
};

// Define solution submission status type
type SubmissionStatus = 'none' | 'pending' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded' | 'runtime_error';

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-100 text-green-800 border-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'hard': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

interface ProblemInterfaceProps {
  problemId?: string;
  defaultLanguage?: string;
  trackId?: string;
  courseId?: string;
}

const ProblemInterface: React.FC<ProblemInterfaceProps> = ({ 
  problemId = 'prob123',
  defaultLanguage = 'python',
  trackId,
  courseId
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLanguage);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('none');
  const [submissionTime, setSubmissionTime] = useState<number | null>(null);
  const [submissionMemory, setSubmissionMemory] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<string>(mockProblem.starterCode[selectedLanguage as keyof typeof mockProblem.starterCode] || '');

  // Handle mock submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionStatus('pending');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Mock submission result
    // In a real app, this would send the code to a backend for execution against test cases
    
    // 70% chance of success for demo purposes
    const isSuccess = Math.random() > 0.3;
    
    if (isSuccess) {
      setSubmissionStatus('accepted');
      setSubmissionTime(Math.floor(Math.random() * 100) + 50);
      setSubmissionMemory(Math.floor(Math.random() * 8) + 8);
    } else {
      // Random failure cases
      const failureTypes: SubmissionStatus[] = [
        'wrong_answer', 
        'time_limit_exceeded', 
        'memory_limit_exceeded', 
        'runtime_error'
      ];
      setSubmissionStatus(failureTypes[Math.floor(Math.random() * failureTypes.length)]);
    }
    
    setIsSubmitting(false);
  };
  
  // Show next hint
  const showNextHint = () => {
    if (currentHintIndex < mockProblem.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };
  
  // Render status badge
  const renderStatusBadge = () => {
    switch (submissionStatus) {
      case 'accepted':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <Check className="h-5 w-5" />
            <span className="font-semibold">Accepted</span>
          </div>
        );
      case 'wrong_answer':
        return <span className="text-red-600 font-medium">Wrong Answer</span>;
      case 'time_limit_exceeded':
        return <span className="text-yellow-600 font-medium">Time Limit Exceeded</span>;
      case 'memory_limit_exceeded':
        return <span className="text-yellow-600 font-medium">Memory Limit Exceeded</span>;
      case 'runtime_error':
        return <span className="text-red-600 font-medium">Runtime Error</span>;
      case 'pending':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Running Tests...</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Problem Description Column */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{mockProblem.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge 
                    variant="outline" 
                    className={`${getDifficultyColor(mockProblem.difficulty)} capitalize font-normal`}
                  >
                    {mockProblem.difficulty}
                  </Badge>
                  
                  {mockProblem.track && (
                    <Badge variant="outline" className="font-normal">
                      {mockProblem.track}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BrainCircuit className="h-4 w-4" />
                <span>{mockProblem.points} points</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-base">{mockProblem.description}</p>
              
              <div className="space-y-3 mt-4">
                <h3 className="text-lg font-medium">Examples:</h3>
                {mockProblem.examples.map((example, index) => (
                  <div key={index} className="bg-muted/50 rounded-md p-3">
                    <div className="mb-1">
                      <span className="font-medium">Input:</span> {example.input}
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">Output:</span> {example.output}
                    </div>
                    {example.explanation && (
                      <div className="text-sm text-muted-foreground">
                        <span className="italic">Explanation:</span> {example.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium">Constraints:</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  {mockProblem.constraints.map((constraint, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: constraint }} />
                  ))}
                </ul>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Tags:</h3>
                <div className="flex flex-wrap gap-1 justify-end">
                  {mockProblem.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-normal text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Time: {mockProblem.timeLimit / 1000}s</span>
                </div>
                <div>Memory: {mockProblem.memoryLimit} MB</div>
              </div>
            </div>
            
            <Collapsible 
              open={showHints}
              onOpenChange={setShowHints}
              className="bg-yellow-50 rounded-md p-3 border border-yellow-200"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
                  <span className="font-medium text-yellow-800">Hints</span>
                  {showHints ? (
                    <ChevronUp className="h-4 w-4 text-yellow-800" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-yellow-800" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm text-yellow-800 space-y-2">
                {mockProblem.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                  <p key={index}>{index + 1}. {hint}</p>
                ))}
                
                {currentHintIndex < mockProblem.hints.length - 1 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 bg-yellow-200 hover:bg-yellow-300 border-yellow-300 text-yellow-900" 
                    onClick={showNextHint}
                  >
                    Show Next Hint
                  </Button>
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
      
      {/* Code Editor Column */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Solution
              </CardTitle>
              
              <Tabs 
                value={selectedLanguage} 
                className="w-auto"
                onValueChange={(value) => {
                  setSelectedLanguage(value);
                  // Set starter code for the selected language
                  setUserCode(mockProblem.starterCode[value as keyof typeof mockProblem.starterCode] || '');
                }}
              >
                <TabsList>
                  {Object.keys(mockProblem.starterCode).map((lang) => (
                    <TabsTrigger key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              Write your solution to the problem
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <OnlineCompiler 
              initialCode={mockProblem.starterCode[selectedLanguage as keyof typeof mockProblem.starterCode]} 
              initialLanguage={selectedLanguage}
              problemId={problemId}
            />
          </CardContent>
          
          <CardFooter className="border-t pt-4 flex flex-col">
            {submissionStatus !== 'none' && (
              <div className="w-full mb-4 p-3 rounded-md bg-muted/50">
                <div className="flex justify-between items-center">
                  {renderStatusBadge()}
                  
                  {submissionStatus === 'accepted' && (
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{submissionTime} ms</span>
                      </div>
                      <div className="flex items-center">
                        <Code className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{submissionMemory} MB</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {submissionStatus !== 'accepted' && submissionStatus !== 'pending' && (
                  <div className="mt-2 text-sm bg-muted p-2 rounded text-muted-foreground">
                    {submissionStatus === 'wrong_answer' && (
                      <div>
                        <p className="font-medium">Test case 2 failed:</p>
                        <p>Expected: [1, 2]</p>
                        <p>Got: [0, 2]</p>
                      </div>
                    )}
                    
                    {submissionStatus === 'time_limit_exceeded' && (
                      <p>Your solution exceeded the time limit. Try to optimize your algorithm.</p>
                    )}
                    
                    {submissionStatus === 'memory_limit_exceeded' && (
                      <p>Your solution exceeded the memory limit. Consider using less memory-intensive data structures.</p>
                    )}
                    
                    {submissionStatus === 'runtime_error' && (
                      <p>Your code encountered a runtime error. Check for array index out of bounds or division by zero.</p>
                    )}
                  </div>
                )}
                
                {submissionStatus === 'accepted' && (
                  <div className="mt-2 flex items-center gap-2 text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">Great job! All test cases passed successfully.</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-between w-full">
              <Button variant="outline">
                <ListChecks className="h-4 w-4 mr-2" />
                Run Test Cases
              </Button>
              
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className={submissionStatus === 'accepted' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    {submissionStatus === 'accepted' ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Submitted
                      </>
                    ) : (
                      'Submit Solution'
                    )}
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProblemInterface;
