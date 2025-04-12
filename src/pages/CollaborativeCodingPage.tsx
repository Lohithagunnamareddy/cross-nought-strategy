
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Plus, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import CollaborativeCodingRoom from '@/components/coding/CollaborativeCodingRoom';

interface Room {
  id: string;
  title: string;
  participants: number;
  language: string;
  isActive: boolean;
}

const CollaborativeCodingPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [newRoomLanguage, setNewRoomLanguage] = useState('javascript');
  
  useEffect(() => {
    // Fetch rooms from API (mock data for now)
    const fetchRooms = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/coding/rooms');
        // const data = await response.json();
        
        // Mock data
        const mockRooms = [
          { id: 'room1', title: 'DSA Problem Solving', participants: 3, language: 'javascript', isActive: true },
          { id: 'room2', title: 'Web Dev Project', participants: 5, language: 'javascript', isActive: true },
          { id: 'room3', title: 'Java Coding Session', participants: 2, language: 'java', isActive: false },
          { id: 'room4', title: 'Python Data Science', participants: 4, language: 'python', isActive: true }
        ];
        
        setRooms(mockRooms);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        toast({
          title: "Error",
          description: "Failed to load coding rooms. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    fetchRooms();
  }, [toast]);
  
  const handleCreateRoom = () => {
    if (!newRoomTitle.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a title for your room",
        variant: "destructive"
      });
      return;
    }
    
    // Mock creating a room
    const newRoom = {
      id: `room${Date.now()}`,
      title: newRoomTitle,
      participants: 1,
      language: newRoomLanguage,
      isActive: true
    };
    
    setRooms([...rooms, newRoom]);
    setIsCreatingRoom(false);
    setNewRoomTitle('');
    setSelectedRoom(newRoom.id);
    
    toast({
      title: "Room Created",
      description: "Your collaborative coding room has been created successfully."
    });
  };
  
  const handleJoinRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    toast({
      title: "Room Joined",
      description: "You've joined the collaborative coding room."
    });
  };
  
  // If a room is selected, show the collaborative coding interface
  if (selectedRoom) {
    const room = rooms.find(r => r.id === selectedRoom);
    
    if (!room) {
      return <div>Room not found</div>;
    }
    
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Collaborative Coding</h1>
              <p className="text-muted-foreground">Room: {room.title}</p>
            </div>
            <Button onClick={() => setSelectedRoom(null)}>Back to Rooms</Button>
          </div>
          
          <CollaborativeCodingRoom 
            roomId={room.id} 
            roomTitle={room.title}
            language={room.language}
          />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Collaborative Coding Rooms</h1>
            <p className="text-muted-foreground">
              Join a collaborative coding session or create your own room
            </p>
          </div>
          <Button onClick={() => setIsCreatingRoom(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {rooms.map(room => (
              <Card key={room.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{room.title}</CardTitle>
                    <Badge variant={room.isActive ? "default" : "outline"}>
                      {room.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <CardDescription>
                    Language: {room.language.charAt(0).toUpperCase() + room.language.slice(1)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{room.participants} participants</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleJoinRoom(room.id)}
                    disabled={!room.isActive}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {room.isActive ? "Join Room" : "Room Closed"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No active rooms found</h3>
              <p className="text-muted-foreground mb-4">
                Create a new room to start collaborating with others
              </p>
              <Button onClick={() => setIsCreatingRoom(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Room
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Create Room Dialog */}
      <Dialog open={isCreatingRoom} onOpenChange={setIsCreatingRoom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Collaborative Room</DialogTitle>
            <DialogDescription>
              Start a new coding room to collaborate with others in real-time.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="roomTitle" className="text-sm font-medium">Room Title</label>
              <Input 
                id="roomTitle" 
                placeholder="e.g., DSA Problem Solving Group"
                value={newRoomTitle}
                onChange={(e) => setNewRoomTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">Programming Language</label>
              <Select value={newRoomLanguage} onValueChange={setNewRoomLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingRoom(false)}>Cancel</Button>
            <Button onClick={handleCreateRoom}>Create Room</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CollaborativeCodingPage;
