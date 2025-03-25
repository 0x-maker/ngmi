"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ResumeUploader } from '@/components/resume/resume-uploader';
import { ResumeExporter } from '@/components/resume/resume-exporter';
import { loadResumeData } from '@/lib/local-storage';
import { ResumeData } from '@/lib/ai-service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, FileText, Home } from 'lucide-react';
import Link from 'next/link';

export default function ImportExportPage() {
  const [activeTab, setActiveTab] = useState<string>('import');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // Load resume data on component mount
  useEffect(() => {
    const data = loadResumeData();
    if (data) setResumeData(data);
  }, []);

  // Handle completion of resume upload
  const handleUploadComplete = (data: Partial<ResumeData>) => {
    setResumeData(data as ResumeData);
    setActiveTab('export'); // Switch to export tab after successful import
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Resume Import & Export</h1>
        <p className="text-muted-foreground">
          Upload your existing resume or export your resume in different formats
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resume Tools</CardTitle>
              <CardDescription>Import or export your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  variant={activeTab === 'import' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('import')}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import Resume
                </Button>
                <Button 
                  variant={activeTab === 'export' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('export')}
                  disabled={!resumeData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Resume
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/builder">
                    <FileText className="mr-2 h-4 w-4" />
                    Edit Resume
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start mt-4"
                  asChild
                >
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="import">Import</TabsTrigger>
              <TabsTrigger value="export" disabled={!resumeData}>Export</TabsTrigger>
            </TabsList>
            <TabsContent value="import">
              <ResumeUploader onUploadComplete={handleUploadComplete} />
            </TabsContent>
            <TabsContent value="export">
              {resumeData ? (
                <ResumeExporter resumeData={resumeData} />
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center p-6">
                      <p className="text-muted-foreground">
                        No resume data available. Please import or create a resume first.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setActiveTab('import')}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Import Resume
                      </Button>
                      <Button 
                        variant="outline" 
                        className="mt-4 ml-2"
                        asChild
                      >
                        <Link href="/builder">
                          <FileText className="mr-2 h-4 w-4" />
                          Create Resume
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 