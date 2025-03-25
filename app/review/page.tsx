"use client";

import React, { useState, useEffect } from 'react';
import { ResumeAnalyzer } from '@/components/ai/resume-analyzer';
import { KeywordOptimization } from '@/components/ai/keyword-optimization';
import { ResumeData } from '@/lib/ai-service';
import { loadResumeData, saveResumeData } from '@/lib/local-storage';
import { ResumeUploader } from '@/components/resume/resume-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [resumeContent, setResumeContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'analyze' | 'keywords'>('analyze');
  const [showImportModal, setShowImportModal] = useState(false);
  const [freshUpload, setFreshUpload] = useState(false);

  // Load resume data from localStorage on client side
  useEffect(() => {
    const data = loadResumeData();
    if (data) {
      setResumeData(data);
      setResumeContent(JSON.stringify(data, null, 2));
    }
  }, []);

  const handleSectionUpdate = (section: string, content: string) => {
    if (!resumeData) return;
    
    // Create a deep copy of the resumeData
    const updatedData = JSON.parse(JSON.stringify(resumeData)) as ResumeData;
    
    // Update the appropriate section based on the section name
    switch (section.toLowerCase()) {
      case 'summary':
        updatedData.personal.summary = content;
        break;
      case 'experience':
        // This is a simplified approach. In a real implementation,
        // we would need to determine which experience entry to update
        if (updatedData.experience.length > 0) {
          updatedData.experience[0].description = content;
        }
        break;
      case 'skills':
        // For skills, we'll assume content is a comma-separated list
        updatedData.skills = content.split(',').map(skill => skill.trim());
        break;
      case 'projects':
        // Similar to experience, this is simplified
        if (updatedData.projects.length > 0) {
          updatedData.projects[0].description = content;
        }
        break;
      default:
        console.warn(`Unknown section: ${section}`);
        return;
    }
    
    // Update state and localStorage
    setResumeData(updatedData);
    saveResumeData(updatedData);
    setResumeContent(JSON.stringify(updatedData, null, 2));
  };

  const handleUploadComplete = (data: Partial<ResumeData>) => {
    setResumeData(data as ResumeData);
    setResumeContent(JSON.stringify(data, null, 2));
    setShowImportModal(false);
    setActiveTab('analyze'); // Ensure we're on the analyze tab
    setFreshUpload(true); // Signal that we have a fresh upload to trigger analysis
  };

  // Reset the freshUpload flag after it's been used
  useEffect(() => {
    if (freshUpload) {
      // Reset after a short delay to ensure the effect in ResumeAnalyzer has time to run
      const timer = setTimeout(() => {
        setFreshUpload(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [freshUpload]);

  const handleEditResume = () => {
    // Save the current resumeData to localStorage and navigate to builder
    if (resumeData) {
      saveResumeData(resumeData);
      router.push('/builder');
    }
  };

  if (!resumeData && !showImportModal) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Resume Review</h1>
        <Card className="bg-white dark:bg-gray-900 shadow-sm p-6">
          <CardContent className="text-center pt-6 space-y-6">
            <div className="rounded-full w-16 h-16 bg-blue-100 mx-auto flex items-center justify-center dark:bg-blue-900/20">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">No Resume Found</h2>
              <p className="text-muted-foreground mb-6">
                You need to either create a resume or import an existing one to get an AI review.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="flex items-center gap-2"
                variant="outline"
                onClick={() => setShowImportModal(true)}
              >
                <Upload className="h-4 w-4" />
                Import Resume
              </Button>
              <Button 
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/builder">
                  <FileText className="h-4 w-4" />
                  Create Resume
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showImportModal) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Resume Review</h1>
        <Card className="bg-white dark:bg-gray-900 shadow-sm p-6">
          <CardContent className="pt-6">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Import Resume for Review</h2>
              <p className="text-muted-foreground">
                Upload your existing resume to get AI-powered feedback and suggestions.
              </p>
            </div>
            <ResumeUploader 
              onUploadComplete={handleUploadComplete} 
              onCancel={() => setShowImportModal(false)} 
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume Review</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowImportModal(true)}
          >
            <Upload className="h-4 w-4" />
            Import Resume
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleEditResume}
          >
            <FileText className="h-4 w-4" />
            Edit Resume
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Get AI-powered feedback and optimize your resume for better results.
      </p>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'analyze' | 'keywords')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="analyze">Resume Analysis</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Optimization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analyze">
          <ResumeAnalyzer
            resumeContent={resumeContent}
            onApplySuggestion={handleSectionUpdate}
            freshUpload={freshUpload}
          />
        </TabsContent>
        
        <TabsContent value="keywords">
          <KeywordOptimization
            resumeContent={resumeContent}
            onApplySuggestion={handleSectionUpdate}
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 flex justify-between">
        <Link href="/">
          <Button variant="outline">
            Back to Home
          </Button>
        </Link>
        <Button 
          onClick={handleEditResume}
          className="flex items-center gap-2"
        >
          Edit with Suggestions
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 