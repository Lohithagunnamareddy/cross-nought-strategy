
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Sparkles, Code, Bug, Info, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CodeHintAssistantProps {
  defaultCode?: string;
  context?: string;
}

const CodeHintAssistant: React.FC<CodeHintAssistantProps> = ({ 
  defaultCode = '', 
  context = 'general' 
}) => {
  const [code, setCode] = useState<string>(defaultCode);
  const [response, setResponse] = useState<string>('');
  const [mode, setMode] = useState<string>('hint');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock API call to get code hints or debugging suggestions
  const getAssistance = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty code",
        description: "Please provide some code to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse('');
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock responses based on mode
      let mockResponse = '';
      
      switch (mode) {
        case 'hint':
          mockResponse = `Here are some hints to improve your code:\n
• Consider using more descriptive variable names
• You could implement error handling for edge cases
• Try to break down the complex logic into smaller functions
• Consider adding comments to explain the algorithm's logic`;
          break;
          
        case 'debug':
          mockResponse = `Potential issues detected:\n
• Line 5: Possible undefined value when accessing property
• Line 12: This loop might cause infinite recursion in certain cases
• Line 24: Missing null check before accessing this object
• Suggestion: Add try/catch blocks around API calls`;
          break;
          
        case 'optimize':
          mockResponse = `Optimization suggestions:\n
• Replace nested loops with a more efficient single-pass algorithm
• Consider using Set instead of Array for lookups
• Move the constant calculations outside the loop
• Use memoization for the recursive function calls`;
          break;
          
        default:
          mockResponse = 'Please provide some code to analyze.';
      }
      
      // Simulate typing effect
      let i = 0;
      const interval = setInterval(() => {
        setResponse(mockResponse.substring(0, i));
        i++;
        if (i > mockResponse.length) {
          clearInterval(interval);
          setIsLoading(false);
        }
      }, 20);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get code assistance. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Code Assistant
          </CardTitle>
          <Tabs defaultValue={mode} onValueChange={setMode}>
            <TabsList>
              <TabsTrigger value="hint">
                <Info className="h-4 w-4 mr-1" />
                Hints
              </TabsTrigger>
              <TabsTrigger value="debug">
                <Bug className="h-4 w-4 mr-1" />
                Debug
              </TabsTrigger>
              <TabsTrigger value="optimize">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Optimize
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription>
          Get AI-powered hints, debugging suggestions, or optimization tips for your code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="text-sm font-medium mb-2 block">
              Your Code
            </label>
            <Textarea
              id="code"
              placeholder="Paste your code here..."
              className="font-mono min-h-[200px] resize-y"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          
          {(response || isLoading) && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                AI Suggestions
              </label>
              <div className="bg-muted/50 rounded-md p-4 font-mono text-sm whitespace-pre-wrap min-h-[100px] max-h-[300px] overflow-y-auto">
                {isLoading && !response && (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                )}
                {response}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={getAssistance} 
          disabled={isLoading || !code.trim()}
          className="w-full sm:w-auto ml-auto"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Get {mode === 'hint' ? 'Hints' : mode === 'debug' ? 'Debug Help' : 'Optimization Tips'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeHintAssistant;
