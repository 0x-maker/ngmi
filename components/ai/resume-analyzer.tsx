import React, { useState } from 'react';
import { useAI } from '@/hooks/useAI';
import { ResumeAnalysis } from '@/lib/ai-service';

interface ResumeAnalyzerProps {
  resumeContent: string;
  onApplySuggestion: (section: string, suggestion: string) => void;
}

export function ResumeAnalyzer({
  resumeContent,
  onApplySuggestion,
}: ResumeAnalyzerProps) {
  const [targetRole, setTargetRole] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const { analyzeResume, isLoadingAnalysis, error } = useAI();

  const handleAnalyze = async () => {
    const result = await analyzeResume(resumeContent, targetRole || undefined);
    if (result) {
      setAnalysis(result);
      setIsAnalyzed(true);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
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
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        AI Resume Analysis
      </h3>
      
      <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
        Get a comprehensive analysis of your resume with tailored feedback and improvement suggestions.
      </p>
      
      <div className="mb-4">
        <label htmlFor="targetRole" className="block text-sm font-medium mb-1">
          Target Role (Optional)
        </label>
        <input
          type="text"
          id="targetRole"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          placeholder="e.g., Software Engineer, Product Manager, etc."
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Specifying a target role will provide more tailored feedback.
        </p>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={isLoadingAnalysis || !resumeContent.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoadingAnalysis ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Resume'
          )}
        </button>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}
      
      {isAnalyzed && analysis && (
        <div className="mt-6">
          {/* Overall Score */}
          <div className="mb-6 text-center">
            <h4 className="text-md font-medium mb-2">Overall Score</h4>
            <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full w-24 h-24 dark:bg-gray-800">
              <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}/100
              </span>
            </div>
          </div>
          
          {/* Strengths and Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-green-50 border border-green-100 rounded-md dark:bg-green-900/20 dark:border-green-900">
              <h5 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
                Strengths
              </h5>
              <ul className="list-disc list-inside space-y-1">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-3 bg-red-50 border border-red-100 rounded-md dark:bg-red-900/20 dark:border-red-900">
              <h5 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                Areas for Improvement
              </h5>
              <ul className="list-disc list-inside space-y-1">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Improvement Suggestions */}
          <div>
            <h4 className="text-md font-medium mb-3">Suggested Improvements</h4>
            <div className="space-y-3">
              {analysis.improvementSuggestions
                .sort((a, b) => {
                  const priorityOrder = { high: 0, medium: 1, low: 2 };
                  return priorityOrder[a.priority as keyof typeof priorityOrder] - 
                         priorityOrder[b.priority as keyof typeof priorityOrder];
                })
                .map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 border border-blue-100 rounded-md dark:bg-blue-900/20 dark:border-blue-900"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium">
                        For your <span className="text-blue-700 dark:text-blue-400">{suggestion.section}</span> section:
                      </p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getPriorityColor(suggestion.priority)} bg-opacity-10 border`}>
                        {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)} Priority
                      </span>
                    </div>
                    <p className="text-sm mb-3">{suggestion.suggestion}</p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => onApplySuggestion(suggestion.section, suggestion.suggestion)}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Apply Suggestion
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