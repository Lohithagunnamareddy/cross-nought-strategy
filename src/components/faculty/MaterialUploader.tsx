
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Video, Link as LinkIcon, Upload, Database, File, Image, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface MaterialUploaderProps {
  courseId: string;
}

const MaterialUploader: React.FC<MaterialUploaderProps> = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState<string>('document');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string>('');
  const [externalLink, setExternalLink] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Clear selected file
  const clearFile = () => {
    setFile(null);
  };

  // Handle form submission for all material types
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for the material.",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === 'document' || activeTab === 'image') {
      if (!file) {
        toast({
          title: "No file selected",
          description: `Please select a ${activeTab} file to upload.`,
          variant: "destructive",
        });
        return;
      }
    }

    if (activeTab === 'video' && !videoLink.trim()) {
      toast({
        title: "Missing video link",
        description: "Please enter a YouTube or Vimeo video URL.",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === 'link' && !externalLink.trim()) {
      toast({
        title: "Missing link",
        description: "Please enter a valid URL for the external resource.",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload process
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10 + 5);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
            
            // Reset form after successful upload
            setTitle('');
            setDescription('');
            setFile(null);
            setVideoLink('');
            setExternalLink('');
            
            toast({
              title: "Material uploaded successfully",
              description: "Students can now access this material in the course.",
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Course Material</CardTitle>
        <CardDescription>
          Add new learning resources for your students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="document">
              <FileText className="h-4 w-4 mr-1" />
              Document
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-1" />
              Video
            </TabsTrigger>
            <TabsTrigger value="link">
              <LinkIcon className="h-4 w-4 mr-1" />
              Link
            </TabsTrigger>
            <TabsTrigger value="image">
              <Image className="h-4 w-4 mr-1" />
              Image
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter material title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isUploading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a short description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  disabled={isUploading}
                />
              </div>
            </div>

            {/* Document Upload Tab */}
            <TabsContent value="document" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select disabled={isUploading || !!file}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="doc">Word Document</SelectItem>
                    <SelectItem value="ppt">Presentation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Upload Document</Label>
                {!file ? (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop a document file, or click to browse
                    </p>
                    <Input
                      id="document-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('document-upload')?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <File className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearFile}
                        disabled={isUploading}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Video Upload Tab */}
            <TabsContent value="video" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="video-source">Video Source</Label>
                <Select disabled={isUploading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select video source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="vimeo">Vimeo</SelectItem>
                    <SelectItem value="custom">Custom URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL</Label>
                <Input
                  id="video-url"
                  placeholder="Enter video URL (e.g., YouTube or Vimeo link)"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  disabled={isUploading}
                />
              </div>
            </TabsContent>

            {/* Link Tab */}
            <TabsContent value="link" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="link-type">Resource Type</Label>
                <Select disabled={isUploading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="external-url">External URL</Label>
                <Input
                  id="external-url"
                  placeholder="Enter the URL of the resource"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  disabled={isUploading}
                />
              </div>
            </TabsContent>

            {/* Image Upload Tab */}
            <TabsContent value="image" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label>Upload Image</Label>
                {!file ? (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Image className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop an image file, or click to browse
                    </p>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearFile}
                        disabled={isUploading}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button type="reset" variant="outline" disabled={isUploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Database className="mr-2 h-4 w-4 animate-pulse" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Material
                  </>
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MaterialUploader;
