"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  parseResumeFromFile, 
  convertTextToResumeData
} from '@/lib/file-service';
import { saveResumeData } from '@/lib/local-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, FileText, FilePlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ResumeData } from '@/lib/ai-service';

interface ResumeUploaderProps {
  onUploadComplete?: (resumeData: Partial<ResumeData>) => void;
  onCancel?: () => void;
}

export function ResumeUploader({ onUploadComplete, onCancel }: ResumeUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsLoading(true);
    setError(null);

    try {
      // Parse the resume file to extract text
      const extractedText = await parseResumeFromFile(file);
      
      // Convert the extracted text to ResumeData structure
      const resumeData = convertTextToResumeData(extractedText);
      
      // Save the resume data to localStorage
      saveResumeData(resumeData as ResumeData);
      
      // Show success toast
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been imported and is ready for editing.",
      });
      
      // Call the onUploadComplete callback if provided
      if (onUploadComplete) {
        onUploadComplete(resumeData);
      }
    } catch (err) {
      console.error('Error uploading resume:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  }, [onUploadComplete, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/markdown': ['.md', '.mdx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Import Resume</CardTitle>
        <CardDescription>
          Upload your existing resume to import it into the builder
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/20 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p>Processing your resume...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              {isDragActive ? (
                <>
                  <FilePlus className="h-10 w-10 text-primary mb-4" />
                  <p>Drop your resume file here</p>
                </>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                  <p>Drag & drop your resume file here, or click to select</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supported formats: PDF, DOCX, DOC, MD, MDX, TXT
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        {error && (
          <div className="mt-4 text-destructive text-sm">
            <p>{error}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="default"
          disabled={isLoading}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Select File
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 