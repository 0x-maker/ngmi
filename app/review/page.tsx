"use client";

import React, { useState, useEffect } from 'react';
import { ResumeAnalyzer } from '@/components/ai/resume-analyzer';
import { KeywordOptimization } from '@/components/ai/keyword-optimization';
import { ResumeData } from '@/lib/ai-service';
import { loadResumeData, saveResumeData } from '@/lib/local-storage';
import Link from 'next/link';

export default function ReviewPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [resumeContent, setResumeContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'analyze' | 'keywords'>('analyze');

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

  if (!resumeData) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Resume Review</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center dark:bg-yellow-900/20 dark:border-yellow-800">
          <p className="text-lg mb-4">You don't have a resume to analyze yet.</p>
          <Link 
            href="/builder" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Your Resume First
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Resume Review</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Get AI-powered feedback and optimize your resume for better results.
      </p>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6 dark:border-gray-700">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'analyze'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('analyze')}
        >
          Resume Analysis
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'keywords'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('keywords')}
        >
          Keyword Optimization
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'analyze' ? (
          <ResumeAnalyzer
            resumeContent={resumeContent}
            onApplySuggestion={handleSectionUpdate}
          />
        ) : (
          <KeywordOptimization
            resumeContent={resumeContent}
            onApplySuggestion={handleSectionUpdate}
          />
        )}
      </div>
      
      <div className="mt-12 flex justify-between">
        <Link
          href="/builder"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          Back to Builder
        </Link>
        <Link
          href="/templates"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Choose Template
        </Link>
      </div>
    </div>
  );
} 