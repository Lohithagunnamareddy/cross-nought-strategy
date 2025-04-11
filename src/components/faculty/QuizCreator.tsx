
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Trash2, MoveVertical, ListChecks, Clock, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

interface QuizQuestion {
  id: string;
  type: 'multiple' | 'single' | 'truefalse' | 'text';
  question: string;
  options: { id: string; text: string, isCorrect: boolean }[];
  correctAnswer?: string; // For text questions
  points: number;
}

interface QuizCreatorProps {
  courseId: string;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ courseId }) => {
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [quizDescription, setQuizDescription] = useState<string>('');
  const [timeLimit, setTimeLimit] = useState<string>('30');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [activeTab, setActiveTab] = useState<string>('settings');
  const [passingScore, setPassingScore] = useState<string>('60');
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { toast } = useToast();

  // Add new question
  const addQuestion = (type: 'multiple' | 'single' | 'truefalse' | 'text') => {
    const newQuestion: QuizQuestion = {
      id: `q${Date.now()}`,
      type,
      question: '',
      options: [],
      points: 10
    };

    // Add default options based on question type
    if (type === 'multiple' || type === 'single') {
      newQuestion.options = [
        { id: `o${Date.now()}-1`, text: '', isCorrect: false },
        { id: `o${Date.now()}-2`, text: '', isCorrect: false }
      ];
    } else if (type === 'truefalse') {
      newQuestion.options = [
        { id: `o${Date.now()}-1`, text: 'True', isCorrect: false },
        { id: `o${Date.now()}-2`, text: 'False', isCorrect: false }
      ];
    }

    setQuestions([...questions, newQuestion]);
  };

  // Update question text
  const updateQuestionText = (questionId: string, text: string) => {
    setQuestions(questions.map(q => q.id === questionId ? { ...q, question: text } : q));
  };

  // Update question points
  const updateQuestionPoints = (questionId: string, points: number) => {
    setQuestions(questions.map(q => q.id === questionId ? { ...q, points } : q));
  };

  // Add new option to a question
  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [...q.options, { id: `o${Date.now()}`, text: '', isCorrect: false }]
        };
      }
      return q;
    }));
  };

  // Update option text
  const updateOptionText = (questionId: string, optionId: string, text: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(o => o.id === optionId ? { ...o, text } : o)
        };
      }
      return q;
    }));
  };

  // Toggle option correctness
  const toggleOptionCorrect = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        if (q.type === 'single' || q.type === 'truefalse') {
          // For single choice, ensure only one option is selected
          return {
            ...q,
            options: q.options.map(o => ({ ...o, isCorrect: o.id === optionId }))
          };
        } else {
          // For multiple choice, toggle the selected option
          return {
            ...q,
            options: q.options.map(o => o.id === optionId ? { ...o, isCorrect: !o.isCorrect } : o)
          };
        }
      }
      return q;
    }));
  };

  // Update text answer
  const updateTextAnswer = (questionId: string, answer: string) => {
    setQuestions(questions.map(q => q.id === questionId ? { ...q, correctAnswer: answer } : q));
  };

  // Delete a question
  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  // Delete an option
  const deleteOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        // Don't delete if there are only 2 options left
        if (q.options.length <= 2) {
          toast({
            title: "Cannot delete option",
            description: "Questions must have at least two options.",
            variant: "destructive",
          });
          return q;
        }
        return {
          ...q,
          options: q.options.filter(o => o.id !== optionId)
        };
      }
      return q;
    }));
  };

  // Save quiz
  const saveQuiz = () => {
    // Basic validation
    if (!quizTitle.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for the quiz.",
        variant: "destructive",
      });
      setActiveTab('settings');
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "No questions",
        description: "Please add at least one question to the quiz.",
        variant: "destructive",
      });
      setActiveTab('questions');
      return;
    }

    // Validate questions
    const invalidQuestions = questions.filter(q => !q.question.trim());
    if (invalidQuestions.length > 0) {
      toast({
        title: "Incomplete questions",
        description: "Some questions are missing text. Please complete all questions.",
        variant: "destructive",
      });
      setActiveTab('questions');
      return;
    }

    // Validate options
    const invalidOptions = questions.some(q => 
      q.type !== 'text' && (
        q.options.some(o => !o.text.trim()) || 
        !q.options.some(o => o.isCorrect)
      )
    );
    
    if (invalidOptions) {
      toast({
        title: "Incomplete options",
        description: "Some questions have blank options or no correct answer selected.",
        variant: "destructive",
      });
      setActiveTab('questions');
      return;
    }

    // Validate text answers
    const invalidTextAnswers = questions.some(q => 
      q.type === 'text' && (!q.correctAnswer || !q.correctAnswer.trim())
    );
    
    if (invalidTextAnswers) {
      toast({
        title: "Missing text answers",
        description: "Some text questions don't have correct answers defined.",
        variant: "destructive",
      });
      setActiveTab('questions');
      return;
    }

    // Simulate saving
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Quiz saved successfully",
        description: "The quiz has been saved and is ready to publish.",
      });
    }, 1500);
  };

  // Calculate total points
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Quiz</CardTitle>
        <CardDescription>
          Build an assessment with multiple question types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input
                id="quiz-title"
                placeholder="Enter quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quiz-description">Description (Optional)</Label>
              <Textarea
                id="quiz-description"
                placeholder="Enter quiz instructions or description"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                <Select value={timeLimit} onValueChange={setTimeLimit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passing-score">Passing Score (%)</Label>
                <Select value={passingScore} onValueChange={setPassingScore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select passing score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50%</SelectItem>
                    <SelectItem value="60">60%</SelectItem>
                    <SelectItem value="70">70%</SelectItem>
                    <SelectItem value="80">80%</SelectItem>
                    <SelectItem value="90">90%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Quiz Options</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-answers">Show Answers After Submission</Label>
                  <p className="text-sm text-muted-foreground">
                    Students will see correct answers after completing the quiz
                  </p>
                </div>
                <Switch
                  id="show-answers"
                  checked={showAnswers}
                  onCheckedChange={setShowAnswers}
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={() => setActiveTab('questions')}>
                  Continue to Questions
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6 mt-6">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addQuestion('multiple')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Multiple Choice
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addQuestion('single')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Single Choice
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addQuestion('truefalse')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                True/False
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addQuestion('text')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Text Answer
              </Button>
            </div>

            {questions.length > 0 ? (
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <Card key={question.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Question {index + 1}</span>
                            <Badge variant="outline" className="capitalize">
                              {question.type === 'multiple' ? 'Multiple Choice' : 
                               question.type === 'single' ? 'Single Choice' : 
                               question.type === 'truefalse' ? 'True/False' : 'Text Answer'}
                            </Badge>
                          </div>
                          <Input
                            className="mt-2 text-lg font-medium"
                            placeholder="Enter your question"
                            value={question.question}
                            onChange={(e) => updateQuestionText(question.id, e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={question.points.toString()}
                            onValueChange={(value) => updateQuestionPoints(question.id, parseInt(value))}
                          >
                            <SelectTrigger className="w-[90px]">
                              <SelectValue placeholder="Points" />
                            </SelectTrigger>
                            <SelectContent>
                              {[5, 10, 15, 20, 25].map((point) => (
                                <SelectItem key={point} value={point.toString()}>
                                  {point} pts
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteQuestion(question.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      {question.type === 'text' ? (
                        <div className="space-y-4">
                          <div className="bg-muted/50 rounded-md p-4">
                            <p className="text-sm text-muted-foreground mb-2">
                              Students will enter a text answer. Define the correct answer below:
                            </p>
                            <Input
                              placeholder="Enter correct answer"
                              value={question.correctAnswer || ''}
                              onChange={(e) => updateTextAnswer(question.id, e.target.value)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <div key={option.id} className="flex items-center gap-3">
                              {question.type === 'multiple' ? (
                                <Checkbox
                                  checked={option.isCorrect}
                                  onCheckedChange={() => toggleOptionCorrect(question.id, option.id)}
                                  id={`checkbox-${option.id}`}
                                />
                              ) : (
                                <input
                                  type="radio"
                                  checked={option.isCorrect}
                                  onChange={() => toggleOptionCorrect(question.id, option.id)}
                                  className="h-4 w-4"
                                  id={`radio-${option.id}`}
                                />
                              )}
                              
                              {question.type !== 'truefalse' ? (
                                <div className="flex-1 flex items-center gap-2">
                                  <Input
                                    placeholder="Enter option text"
                                    value={option.text}
                                    onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                                    className="flex-1"
                                  />
                                  {question.options.length > 2 && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => deleteOption(question.id, option.id)}
                                      className="text-muted-foreground hover:text-foreground"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ) : (
                                <Label
                                  htmlFor={`radio-${option.id}`}
                                  className="flex-1"
                                >
                                  {option.text}
                                </Label>
                              )}
                            </div>
                          ))}

                          {question.type !== 'truefalse' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => addOption(question.id)}
                            >
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Add Option
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                    
                    <div className="absolute top-3 left-3 flex items-center justify-center w-6 h-6 bg-muted rounded-full">
                      <MoveVertical className="h-3 w-3" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-muted/50 rounded-lg">
                <ListChecks className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No Questions Added</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose a question type from the buttons above to get started.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-6 mt-6">
            <div className="p-6 border rounded-lg">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold">{quizTitle || "Untitled Quiz"}</h2>
                {quizDescription && <p className="text-muted-foreground">{quizDescription}</p>}
                
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{timeLimit} minutes</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ListChecks className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{questions.length} questions</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span>Total: {totalPoints} points</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {questions.length > 0 ? (
                <div className="space-y-8">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-medium">
                          {index + 1}. {question.question || "Untitled Question"}
                        </h3>
                        <span className="text-sm text-muted-foreground">{question.points} points</span>
                      </div>

                      {question.type === 'text' ? (
                        <div className="space-y-2">
                          <Input placeholder="Student will enter text answer here" disabled />
                          {showAnswers && (
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {question.options.map((option, i) => (
                            <div key={option.id} className="flex items-center gap-3">
                              {question.type === 'multiple' ? (
                                <Checkbox disabled id={`preview-checkbox-${option.id}`} />
                              ) : (
                                <input
                                  type="radio"
                                  disabled
                                  className="h-4 w-4"
                                  id={`preview-radio-${option.id}`}
                                />
                              )}
                              <Label
                                htmlFor={`preview-${question.type === 'multiple' ? 'checkbox' : 'radio'}-${option.id}`}
                                className={`flex-1 ${showAnswers && option.isCorrect ? 'text-green-600 font-medium' : ''}`}
                              >
                                {option.text || `Option ${i + 1}`}
                                {showAnswers && option.isCorrect && " ✓"}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No questions have been added to this quiz yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {questions.length} {questions.length === 1 ? 'question' : 'questions'} · {totalPoints} total points
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" disabled={isSaving}>Cancel</Button>
          <Button onClick={saveQuiz} disabled={isSaving}>
            {isSaving ? (
              <>
                <Save className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Quiz
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCreator;
