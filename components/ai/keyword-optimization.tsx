import React, { useState } from 'react';
import { useAI } from '@/hooks/useAI';
import { KeywordAnalysis } from '@/lib/ai-service';

interface KeywordOptimizationProps {
  resumeContent: string;
  onApplySuggestion: (section: string, content: string) => void;
}

export function KeywordOptimization({
  resumeContent,
  onApplySuggestion,
}: KeywordOptimizationProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<KeywordAnalysis | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { analyzeKeywords, isLoadingKeywords, error } = useAI();

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    const result = await analyzeKeywords(resumeContent, jobDescription);
    if (result) {
      setAnalysis(result);
      setShowSuggestions(true);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-6 bg-white dark:bg-gray-900 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          <path d="M14.5 2v4M18.5 6l-4 4M14.5 14h4M8.5 14h2" />
        </svg>
        ATS Keyword Optimization
      </h3>
      
      <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
        Paste a job description to analyze and optimize your resume for Applicant Tracking Systems (ATS).
      </p>
      
      <div className="mb-4">
        <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          rows={6}
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={isLoadingKeywords || !jobDescription.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoadingKeywords ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Job Description'
          )}
        </button>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}
      
      {showSuggestions && analysis && (
        <div className="mt-6">
          <div className="mb-4">
            <h4 className="text-md font-medium mb-2">Key Missing Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-2">Suggested Improvements</h4>
            <div className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 bg-green-50 border border-green-100 rounded-md dark:bg-green-900/20 dark:border-green-900"
                >
                  <p className="text-sm font-medium mb-1">
                    For your <span className="text-green-700 dark:text-green-400">{suggestion.section}</span> section:
                  </p>
                  <p className="text-sm mb-2">{suggestion.content}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{suggestion.reason}</p>
                    <button
                      onClick={() => onApplySuggestion(suggestion.section, suggestion.content)}
                      className="text-xs px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 