import { useState } from 'react';
import { ContentSuggestion, KeywordAnalysis, ResumeAnalysis } from '@/lib/ai-service';

// Custom hook for AI features
export const useAI = () => {
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isLoadingKeywords, setIsLoadingKeywords] = useState(false);
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get content suggestions for a specific section
  const getContentSuggestions = async (content: string, section: string): Promise<ContentSuggestion | null> => {
    setIsLoadingSuggestions(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/content-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, section }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get content suggestions');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Analyze entire resume
  const analyzeResume = async (resumeContent: string, targetRole?: string): Promise<ResumeAnalysis | null> => {
    setIsLoadingAnalysis(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/resume-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeContent, targetRole }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze resume');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  // Analyze keywords based on job description
  const analyzeKeywords = async (resumeContent: string, jobDescription: string): Promise<KeywordAnalysis | null> => {
    setIsLoadingKeywords(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/keyword-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeContent, jobDescription }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze keywords');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setIsLoadingKeywords(false);
    }
  };

  // Format achievements from a job description
  const formatAchievements = async (jobDescription: string): Promise<string[] | null> => {
    setIsLoadingAchievements(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/format-achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to format achievements');
      }
      
      const { achievements } = await response.json();
      return achievements;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setIsLoadingAchievements(false);
    }
  };

  return {
    getContentSuggestions,
    analyzeResume,
    analyzeKeywords,
    formatAchievements,
    isLoadingSuggestions,
    isLoadingAnalysis,
    isLoadingKeywords,
    isLoadingAchievements,
    error,
  };
}; 