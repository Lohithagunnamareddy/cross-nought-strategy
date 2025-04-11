
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Bot, Check, AlertTriangle, Info, ThumbsUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CodeReviewBotProps {
  submissionId?: string;
  code?: string;
  language?: string;
}

interface ReviewScore {
  category: string;
  score: number; 
  feedback: string;
  suggestions: string[];
}

const CodeReviewBot: React.FC<CodeReviewBotProps> = ({ 
  submissionId, 
  code = '', 
  language = 'javascript' 
}) => {
  const [userCode, setUserCode] = useState<string>(code);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [reviewComplete, setReviewComplete] = useState<boolean>(false);
  const [reviewScores, setReviewScores] = useState<ReviewScore[]>([]);
  const [overallScore, setOverallScore] = useState<number>(0);
  const [reviewSummary, setReviewSummary] = useState<string>('');
  const { toast } = useToast();

  // Generate mock review data
  const generateMockReview = () => {
    if (!userCode.trim()) {
      toast({
        title: "No code to review",
        description: "Please paste or write some code before requesting a review.",
        variant: "destructive",
      });
      return;
    }

    setIsReviewing(true);
    setReviewComplete(false);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate mock review scores
      const mockScores: ReviewScore[] = [
        {
          category: "Code Structure",
          score: Math.floor(Math.random() * 30) + 70,
          feedback: "Your code structure is generally good, but could be improved with better function organization.",
          suggestions: [
            "Break down large functions into smaller ones",
            "Organize related functions into classes or modules",
            "Use more descriptive function and variable names"
          ]
        },
        {
          category: "Readability",
          score: Math.floor(Math.random() * 20) + 75,
          feedback: "Code is readable but some variable names are too short or unclear.",
          suggestions: [
            "Use more descriptive variable names",
            "Add comments for complex logic",
            "Be consistent with formatting and indentation"
          ]
        },
        {
          category: "Performance",
          score: Math.floor(Math.random() * 40) + 60,
          feedback: "Some performance optimizations could be made for better efficiency.",
          suggestions: [
            "Avoid nested loops when possible",
            "Cache repeated calculations",
            "Consider using more efficient data structures"
          ]
        },
        {
          category: "Best Practices",
          score: Math.floor(Math.random() * 25) + 70,
          feedback: "Your code follows most best practices but has a few areas for improvement.",
          suggestions: [
            "Add proper error handling",
            "Avoid global variables",
            "Implement input validation"
          ]
        }
      ];

      // Calculate overall score (average)
      const overall = Math.round(
        mockScores.reduce((acc, item) => acc + item.score, 0) / mockScores.length
      );

      // Generate summary based on overall score
      let summary = '';
      if (overall >= 90) {
        summary = "Excellent code! It's well-structured, readable, and follows best practices.";
      } else if (overall >= 80) {
        summary = "Good code quality. A few minor improvements could make it excellent.";
      } else if (overall >= 70) {
        summary = "Decent code with some areas that need improvement.";
      } else {
        summary = "Your code needs significant improvements in multiple areas.";
      }

      // Update state with review data
      setReviewScores(mockScores);
      setOverallScore(overall);
      setReviewSummary(summary);
      setReviewComplete(true);
      setIsReviewing(false);

      toast({
        title: "Code Review Complete",
        description: "Check out the detailed feedback below.",
      });
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-blue-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Code Review Bot
          </CardTitle>
          {language && (
            <Badge variant="outline" className="font-normal">
              {language}
            </Badge>
          )}
        </div>
        <CardDescription>
          Get detailed feedback on your code quality, structure, and best practices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!reviewComplete ? (
          <div className="space-y-4">
            <Textarea
              placeholder="Paste your code here for review..."
              className="font-mono min-h-[200px]"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              disabled={isReviewing}
            />
            {isReviewing && (
              <div className="space-y-2">
                <p className="text-sm text-center">Analyzing your code...</p>
                <Progress value={Math.floor(Math.random() * 100)} />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Overall Assessment</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{overallScore}/100</span>
                {overallScore >= 80 ? (
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                ) : (
                  <Info className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-md p-4">
              <p className="italic">{reviewSummary}</p>
            </div>
            
            <h3 className="text-lg font-medium">Detailed Score Breakdown</h3>
            
            <div className="space-y-4">
              {reviewScores.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{item.category}</h4>
                    <Badge variant={item.score >= 75 ? "default" : "outline"} className={item.score >= 75 ? "" : "text-yellow-500 border-yellow-500"}>
                      {item.score}/100
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={item.score} 
                    className={`h-2 ${getScoreColor(item.score)}`}
                  />
                  
                  <p className="text-sm text-muted-foreground">{item.feedback}</p>
                  
                  <div className="space-y-1 mt-2">
                    <h5 className="text-xs font-medium uppercase text-muted-foreground">Suggestions:</h5>
                    <ul className="text-sm">
                      {item.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-start gap-2 mb-1">
                          <span className="mt-0.5">
                            {item.score >= 80 ? (
                              <Info className="h-3.5 w-3.5 text-blue-500" />
                            ) : (
                              <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
                            )}
                          </span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!reviewComplete ? (
          <Button 
            onClick={generateMockReview} 
            disabled={isReviewing || !userCode.trim()}
            className="w-full sm:w-auto ml-auto"
          >
            {isReviewing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Code...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Review My Code
              </>
            )}
          </Button>
        ) : (
          <div className="flex gap-2 justify-end w-full">
            <Button 
              variant="outline"
              onClick={() => {
                setUserCode('');
                setReviewComplete(false);
                setReviewScores([]);
              }}
            >
              Start New Review
            </Button>
            <Button>
              <Check className="h-4 w-4 mr-2" />
              Apply Suggestions
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CodeReviewBot;
