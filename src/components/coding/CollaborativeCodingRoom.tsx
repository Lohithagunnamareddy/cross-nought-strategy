
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Send, Share2, Users, Video } from 'lucide-react';
import OnlineCompiler from './OnlineCompiler';

interface CollaborativeRoomProps {
  roomId: string;
  roomTitle: string;
  language?: string;
  initialCode?: string;
}

const CollaborativeCodingRoom: React.FC<CollaborativeRoomProps> = ({
  roomId,
  roomTitle,
  language = 'javascript',
  initialCode = ''
}) => {
  const [messages, setMessages] = useState<Array<{user: string, avatar: string, text: string}>>([
    { user: 'System', avatar: 'SYS', text: 'Welcome to the collaborative coding room! You can write code together and chat with other participants.' },
    { user: 'Jane Doe', avatar: 'JD', text: 'Hi everyone! Let\'s solve this problem together.' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState([
    { id: '1', name: 'Jane Doe', avatar: 'JD', isActive: true },
    { id: '2', name: 'John Smith', avatar: 'JS', isActive: true },
    { id: '3', name: 'You', avatar: 'ME', isActive: true }
  ]);
  
  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: 'You', avatar: 'ME', text: newMessage }]);
      setNewMessage('');
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {roomTitle}
                </CardTitle>
                <CardDescription>
                  Collaborative coding room #{roomId}
                </CardDescription>
              </div>
              <Badge variant="outline">{participants.length} Participants</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <OnlineCompiler initialLanguage={language} initialCode={initialCode} />
          </CardContent>
          
          <CardFooter className="border-t flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share Room
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-1" />
                Start Video
              </Button>
            </div>
            <Button variant="default">
              Save Progress
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div>
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat & Participants
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-hidden flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Participants</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {participants.map(participant => (
                  <div key={participant.id} className="flex items-center gap-1 text-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{participant.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{participant.name}</span>
                    <span className={`h-2 w-2 rounded-full ${participant.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="text-sm font-medium mb-2">Chat</h3>
              <div className="overflow-y-auto max-h-[300px] space-y-3 mb-3">
                {messages.map((message, i) => (
                  <div key={i} className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{message.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium">{message.user}</p>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t pt-4 pb-4">
            <div className="flex w-full gap-2">
              <Input 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button size="sm" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CollaborativeCodingRoom;
