
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Users, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface ScheduleTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testType?: 'contest' | 'mock' | 'quiz';
}

const ScheduleTestModal: React.FC<ScheduleTestModalProps> = ({ 
  open, 
  onOpenChange,
  testType = 'contest'
}) => {
  const [testDate, setTestDate] = React.useState<Date>();
  const [isAllBatches, setIsAllBatches] = React.useState(false);
  const { toast } = useToast();

  const getTitle = () => {
    switch (testType) {
      case 'mock':
        return 'Schedule Mock Test';
      case 'quiz':
        return 'Schedule Quiz';
      default:
        return 'Schedule Coding Contest';
    }
  };

  const getDescription = () => {
    switch (testType) {
      case 'mock':
        return 'Set up a mock placement test with interview questions';
      case 'quiz':
        return 'Create a new quiz for academic evaluation';
      default:
        return 'Create a new coding contest for students';
    }
  };

  const handleSchedule = () => {
    toast({
      title: `${testType.charAt(0).toUpperCase() + testType.slice(1)} scheduled`,
      description: "Students will be notified via email and dashboard.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="test-name">Title</Label>
            <Input id="test-name" placeholder={`${testType.charAt(0).toUpperCase() + testType.slice(1)} title`} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="test-description">Description</Label>
            <Textarea 
              id="test-description" 
              placeholder="Provide details about the test/contest objectives and format" 
              className="resize-none"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !testDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {testDate ? format(testDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={testDate}
                    onSelect={setTestDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Time</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Start Time" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour.toString().padStart(2, '0')}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 mins</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="180">3 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Participants</Label>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">All Batches</span>
                </div>
                <Switch
                  checked={isAllBatches}
                  onCheckedChange={setIsAllBatches}
                />
              </div>
              
              {!isAllBatches && (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">Batch 2023</SelectItem>
                    <SelectItem value="2024">Batch 2024</SelectItem>
                    <SelectItem value="2025">Batch 2025</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <Select>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select difficulty" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {testType === 'contest' && (
            <div className="space-y-2">
              <Label>Problem Set</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select problem set" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="db">Database Problems</SelectItem>
                  <SelectItem value="custom">Create Custom Set</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule}>
            Schedule {testType.charAt(0).toUpperCase() + testType.slice(1)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleTestModal;
