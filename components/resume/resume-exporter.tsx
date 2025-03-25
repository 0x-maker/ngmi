"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, FileText } from 'lucide-react';
import { exportResumeToPDF, exportResumeToDocx, exportResumeToMarkdown } from '@/lib/file-service';
import { loadResumeData } from '@/lib/local-storage';
import { useToast } from '@/components/ui/use-toast';
import { ResumeData } from '@/lib/ai-service';

type ExportFormat = 'pdf' | 'docx' | 'md';

interface ResumeExporterProps {
  resumeData?: ResumeData;
  onCancel?: () => void;
}

export function ResumeExporter({ resumeData, onCancel }: ResumeExporterProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);

    try {
      // If resumeData wasn't provided as a prop, load it from localStorage
      const dataToExport = resumeData || loadResumeData();
      
      if (!dataToExport) {
        throw new Error('No resume data found. Please create a resume first.');
      }

      // Export based on selected format
      switch (exportFormat) {
        case 'pdf':
          exportResumeToPDF(dataToExport);
          break;
        case 'docx':
          await exportResumeToDocx(dataToExport);
          break;
        case 'md':
          exportResumeToMarkdown(dataToExport);
          break;
        default:
          throw new Error(`Unsupported export format: ${exportFormat}`);
      }

      // Show success toast
      toast({
        title: "Export successful",
        description: `Your resume has been exported as a ${exportFormat.toUpperCase()} file.`,
      });
    } catch (err) {
      console.error('Error exporting resume:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Export failed",
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Export Resume</CardTitle>
        <CardDescription>
          Export your resume in your preferred format
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Format</label>
            <Select
              value={exportFormat}
              onValueChange={(value) => setExportFormat(value as ExportFormat)}
              disabled={isExporting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                <SelectItem value="docx">Microsoft Word (.docx)</SelectItem>
                <SelectItem value="md">Markdown (.md)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-muted/40 p-3 rounded-md">
            <h4 className="font-medium mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              {exportFormat.toUpperCase()} Format
            </h4>
            <p className="text-sm text-muted-foreground">
              {exportFormat === 'pdf' && 'PDF is great for sharing and printing, maintains formatting across devices.'}
              {exportFormat === 'docx' && 'DOCX is ideal for further editing in Microsoft Word or other word processors.'}
              {exportFormat === 'md' && 'Markdown is perfect for web publishing or using in content management systems.'}
            </p>
          </div>
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
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export as {exportFormat.toUpperCase()}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 