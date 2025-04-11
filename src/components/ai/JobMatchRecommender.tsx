
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Star, BookOpen, User, Filter, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock job listings with skill requirements
const MOCK_JOBS = [
  {
    id: 1,
    title: "Junior Frontend Developer",
    company: "TechStart Inc.",
    location: "Remote",
    description: "Looking for a junior developer with React knowledge and basic understanding of modern web development.",
    matchPercentage: 87,
    skills: ["javascript", "react", "html", "css"],
    requiredBadges: ["react-basics", "javascript-intermediate"],
    minStreak: 7
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "ServerLogic",
    location: "New York, NY",
    description: "Seeking a passionate backend developer intern to work on our Node.js services.",
    matchPercentage: 75,
    skills: ["javascript", "nodejs", "express", "mongodb"],
    requiredBadges: ["nodejs-basics", "database-fundamentals"],
    minStreak: 0
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "WebSolutions Co.",
    location: "Hybrid - Chicago",
    description: "Join our team building web applications with React, Node.js, and MongoDB.",
    matchPercentage: 62,
    skills: ["javascript", "react", "nodejs", "mongodb", "typescript"],
    requiredBadges: ["fullstack-basics", "react-intermediate", "nodejs-intermediate"],
    minStreak: 14
  },
  {
    id: 4,
    title: "Junior Data Scientist",
    company: "DataMinds",
    location: "Remote",
    description: "Help us analyze data and build machine learning models using Python and related libraries.",
    matchPercentage: 45,
    skills: ["python", "pandas", "numpy", "scikit-learn"],
    requiredBadges: ["python-intermediate", "data-analysis"],
    minStreak: 21
  },
  {
    id: 5,
    title: "Mobile App Developer Intern",
    company: "AppCraft Solutions",
    location: "San Francisco, CA",
    description: "Develop mobile applications using React Native for iOS and Android platforms.",
    matchPercentage: 68,
    skills: ["javascript", "react-native", "mobile-development"],
    requiredBadges: ["react-basics", "mobile-fundamentals"],
    minStreak: 5
  }
];

// Mock user skills and badges
const MOCK_USER_PROFILE = {
  skills: ["javascript", "react", "html", "css", "nodejs"],
  badges: ["react-basics", "javascript-intermediate", "nodejs-basics"],
  streak: 12,
  preferredRoles: ["frontend", "fullstack"],
  preferredLocations: ["Remote", "New York, NY"]
};

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    matchPercentage: number;
    skills: string[];
    requiredBadges: string[];
    minStreak: number;
  };
  userProfile: {
    skills: string[];
    badges: string[];
    streak: number;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job, userProfile }) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };
  
  const skillsMatch = job.skills.filter(skill => 
    userProfile.skills.includes(skill)
  ).length;
  
  const badgesMatch = job.requiredBadges.filter(badge => 
    userProfile.badges.includes(badge)
  ).length;
  
  const isStreakSufficient = userProfile.streak >= job.minStreak;

  return (
    <Card className="mb-4 hover:shadow-md transition-all">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-muted-foreground">{job.company} · {job.location}</p>
          </div>
          <div className={`font-bold text-lg ${getMatchColor(job.matchPercentage)}`}>
            {job.matchPercentage}% Match
          </div>
        </div>
        
        <p className="my-3 text-sm">{job.description}</p>
        
        <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
          {job.skills.map(skill => (
            <Badge 
              key={skill} 
              variant={userProfile.skills.includes(skill) ? "default" : "outline"}
              className={!userProfile.skills.includes(skill) ? "opacity-60" : ""}
            >
              {skill}
              {userProfile.skills.includes(skill) && <Check className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <BookOpen className="mr-1 h-4 w-4" />
              <span>{skillsMatch}/{job.skills.length} skills</span>
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4" />
              <span>{badgesMatch}/{job.requiredBadges.length} badges</span>
            </div>
          </div>
          
          <Button size="sm">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface JobMatchRecommenderProps {
  userId?: string;
}

const JobMatchRecommender: React.FC<JobMatchRecommenderProps> = ({ userId }) => {
  const { user } = useAuth();
  const [jobListings, setJobListings] = useState(MOCK_JOBS);
  const [userProfile, setUserProfile] = useState(MOCK_USER_PROFILE);
  const [filterMatch, setFilterMatch] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setIsLoading(true);
      // In a real app, fetch user profile and job listings
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    
    loadData();
  }, [userId, user?.id]);
  
  // Filter jobs based on match percentage
  const filteredJobs = jobListings.filter(job => {
    if (filterMatch === "all") return true;
    if (filterMatch === "high") return job.matchPercentage >= 80;
    if (filterMatch === "medium") return job.matchPercentage >= 60 && job.matchPercentage < 80;
    if (filterMatch === "low") return job.matchPercentage < 60;
    return true;
  });
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Job Match Recommender
          </CardTitle>
        </div>
        <CardDescription>
          Discover job opportunities that match your coding skills, badges, and learning tracks
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{user?.firstName} {user?.lastName}</span>
            <Badge variant="outline" className="ml-2">
              {userProfile.streak} day streak
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select 
              defaultValue={filterMatch} 
              onValueChange={setFilterMatch}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Match" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All matches</SelectItem>
                <SelectItem value="high">High match (>80%)</SelectItem>
                <SelectItem value="medium">Medium match (60-80%)</SelectItem>
                <SelectItem value="low">Low match (<60%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} userProfile={userProfile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No matching jobs found</h3>
            <p>Try adjusting your filters or developing more skills</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobMatchRecommender;
