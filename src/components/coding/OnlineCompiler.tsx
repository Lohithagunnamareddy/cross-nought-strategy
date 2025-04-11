
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Terminal, Play, Save, Copy, Settings, Clock, RotateCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample languages supported
const LANGUAGES = [
  { id: 'c', name: 'C', version: 'GCC 10.2.0' },
  { id: 'cpp', name: 'C++', version: 'G++ 10.2.0' },
  { id: 'java', name: 'Java', version: 'JDK 15.0.2' },
  { id: 'python', name: 'Python', version: '3.9.1' },
  { id: 'javascript', name: 'JavaScript', version: 'Node.js 14.15.4' }
];

// Sample themes for the editor
const THEMES = ['light', 'dark', 'monokai', 'github'];

// Sample starter templates for different languages
const STARTER_CODE = {
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, world!\\n");\n    return 0;\n}`,
  cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, world!" << std::endl;\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}`,
  python: `def main():\n    print("Hello, world!")\n\nif __name__ == "__main__":\n    main()`,
  javascript: `function main() {\n    console.log("Hello, world!");\n}\n\nmain();`
};

interface OnlineCompilerProps {
  initialCode?: string;
  initialLanguage?: string;
  problemId?: string;
  courseId?: string;
}

const OnlineCompiler: React.FC<OnlineCompilerProps> = ({ 
  initialCode = '',
  initialLanguage = 'python',
  problemId = '',
  courseId = ''
}) => {
  const [code, setCode] = useState(initialCode || STARTER_CODE[initialLanguage as keyof typeof STARTER_CODE]);
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState('light');
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [execTime, setExecTime] = useState<string | null>(null);
  const { toast } = useToast();

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // Offer to replace with starter code if code is empty or default
    if (!code || Object.values(STARTER_CODE).includes(code)) {
      setCode(STARTER_CODE[value as keyof typeof STARTER_CODE] || '');
    }
  };

  // Execute code (mock implementation)
  const executeCode = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty code",
        description: "Please write some code before running.",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    setOutput('');
    setError('');
    setExecTime(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock execution results based on language
      let mockOutput = '';
      
      if (code.includes('Hello, world!')) {
        mockOutput = 'Hello, world!\n';
      } else if (code.includes('error') || code.includes('ERROR')) {
        throw new Error('Syntax error on line 3: Unexpected token');
      } else {
        mockOutput = 'Program executed successfully.\nNo output generated.';
      }
      
      setOutput(mockOutput);
      setExecTime(`${(Math.random() * 0.5).toFixed(3)}s`);
      
      toast({
        title: "Execution complete",
        description: "Your code ran successfully.",
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during execution');
      
      toast({
        title: "Execution failed",
        description: err.message || 'An error occurred during execution',
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Save code (mock implementation)
  const saveCode = () => {
    toast({
      title: "Code saved",
      description: "Your code has been saved successfully.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Terminal className="h-5 w-5 mr-2" />
            Online Compiler
          </CardTitle>
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.name} ({lang.version})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {THEMES.map((themeName) => (
                  <SelectItem key={themeName} value={themeName}>
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardDescription>
          Write, test, and run code in multiple languages
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={`border rounded-md ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`font-mono min-h-[300px] resize-none p-4 w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}
            placeholder="Write your code here..."
          />
        </div>

        <div className="rounded-md border">
          <Tabs defaultValue="output">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <TabsList>
                <TabsTrigger value="output">Output</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
              </TabsList>
              
              {execTime && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  Execution time: {execTime}
                </div>
              )}
            </div>
            
            <TabsContent value="output" className="p-4">
              {isExecuting ? (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RotateCw className="h-4 w-4 animate-spin" />
                  <p>Running code...</p>
                </div>
              ) : output ? (
                <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
              ) : error ? (
                <pre className="font-mono text-sm text-red-500 whitespace-pre-wrap">{error}</pre>
              ) : (
                <p className="text-muted-foreground">Run your code to see output here</p>
              )}
            </TabsContent>
            
            <TabsContent value="console" className="p-4">
              <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                {isExecuting ? (
                  '> Compiling code...\n> Running program...'
                ) : (
                  '> Ready to execute code'
                )}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={saveCode}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(code);
              toast({ title: "Copied to clipboard" });
            }}
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
        
        <Button onClick={executeCode} disabled={isExecuting}>
          {isExecuting ? (
            <>
              <RotateCw className="h-4 w-4 mr-2 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnlineCompiler;
