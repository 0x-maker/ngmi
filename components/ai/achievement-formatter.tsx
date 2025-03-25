import React, { useState } from 'react';
import { useAI } from '@/hooks/useAI';

interface AchievementFormatterProps {
  onSelectAchievement: (achievement: string) => void;
}

export function AchievementFormatter({ onSelectAchievement }: AchievementFormatterProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { formatAchievements, isLoadingAchievements, error } = useAI();

  const handleFormat = async () => {
    if (!jobDescription.trim()) return;
    
    const result = await formatAchievements(jobDescription);
    if (result) {
      setAchievements(result);
      setShowResults(true);
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
          className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
        Achievement Formatter
      </h3>
      
      <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
        Transform your job descriptions into achievement-oriented bullet points using the STAR or PAR method.
      </p>
      
      <div className="mb-4">
        <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
          rows={6}
          placeholder="Describe your responsibilities and what you did in this role..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Add context about your role, team size, and company to get better results.
        </p>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleFormat}
          disabled={isLoadingAchievements || !jobDescription.trim()}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoadingAchievements ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Transforming...
            </>
          ) : (
            'Transform to Achievements'
          )}
        </button>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}
      
      {showResults && achievements.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium mb-3">Achievement-Oriented Bullet Points</h4>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-3 bg-purple-50 border border-purple-100 rounded-md dark:bg-purple-900/20 dark:border-purple-900 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer"
                onClick={() => onSelectAchievement(achievement)}
              >
                <p className="text-sm mb-1">{achievement}</p>
                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAchievement(achievement);
                    }}
                    className="text-xs px-2 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Use This
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md dark:bg-yellow-900/20 dark:border-yellow-900">
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              <strong>Tip:</strong> Customize these achievements further by adding specific metrics, numbers, or percentages to make them even more impactful.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 