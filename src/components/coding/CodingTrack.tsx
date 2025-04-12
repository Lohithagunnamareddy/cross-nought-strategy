
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckCircle, ChevronRight, Code, FileText, Lock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  tags: string[];
  isCompleted: boolean;
  isLocked: boolean;
}

export interface TrackSection {
  id: string;
  title: string;
  description: string;
  problems: Problem[];
  progress: number;
}

export interface CodingTrackProps {
  trackId: string;
  title: string;
  description: string;
  progress: number;
  sections: TrackSection[];
  totalProblems: number;
  solvedProblems: number;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 border-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'hard': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const CodingTrack: React.FC<CodingTrackProps> = ({ 
  trackId,
  title,
  description,
  progress,
  sections,
  totalProblems,
  solvedProblems
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            <span>Track</span>
          </Badge>
        </div>
        
        <div className="mt-4 space-y-1">
          <div className="flex justify-between items-center text-sm mb-1">
            <span>Progress: {solvedProblems}/{totalProblems} problems</span>
            <span className="font-medium">{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="space-y-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-medium">{section.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                <span>{(section.progress * section.problems.length / 100).toFixed(0)}/{section.problems.length}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{section.description}</p>
            
            <div className="grid grid-cols-1 gap-2 mt-2">
              {section.problems.map((problem) => (
                <div 
                  key={problem.id}
                  className={`border rounded-md p-3 flex justify-between items-center ${
                    problem.isCompleted ? 'bg-green-50 border-green-200' : 
                    problem.isLocked ? 'bg-gray-50 opacity-70' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {problem.isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : problem.isLocked ? (
                      <Lock className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FileText className="h-5 w-5 text-blue-500" />
                    )}
                    
                    <div>
                      <p className={`font-medium ${problem.isLocked ? 'text-gray-500' : ''}`}>
                        {problem.title}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        <Badge 
                          variant="outline" 
                          className={`${getDifficultyColor(problem.difficulty)} capitalize text-xs font-normal`}
                        >
                          {problem.difficulty}
                        </Badge>
                        {problem.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs font-normal">
                          {problem.points} pts
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    {problem.isLocked ? (
                      <Button size="sm" variant="outline" disabled>
                        Locked
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant={problem.isCompleted ? "outline" : "default"}
                        asChild
                      >
                        <Link to={`/coding/problem/${problem.id}`}>
                          {problem.isCompleted ? 'Revisit' : 'Solve'}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>{totalProblems} Problems</span>
          <span className="text-muted-foreground mx-2">•</span>
          <Code className="h-4 w-4" />
          <span>Multiple Languages</span>
        </div>

        <Button asChild>
          <Link to="/coding/tracks">
            View All Tracks
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodingTrack;
