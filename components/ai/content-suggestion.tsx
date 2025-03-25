import React from 'react';
import { ContentSuggestion } from '@/lib/ai-service';

interface ContentSuggestionProps {
  suggestion: ContentSuggestion;
  onAccept: (improved: string) => void;
  onReject: () => void;
  loading?: boolean;
}

export function ContentSuggestionCard({
  suggestion,
  onAccept,
  onReject,
  loading = false,
}: ContentSuggestionProps) {
  if (loading) {
    return (
      <div className="mt-2 p-4 border border-blue-200 rounded-md bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 animate-pulse">
        <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-5/6"></div>
        <div className="flex justify-end mt-4 space-x-2">
          <div className="h-8 bg-blue-200 dark:bg-blue-700 rounded w-20"></div>
          <div className="h-8 bg-blue-200 dark:bg-blue-700 rounded w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 p-4 border border-blue-200 rounded-md bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
        AI Suggestion
      </h4>
      
      <div className="bg-white dark:bg-blue-950/50 p-3 rounded border border-blue-100 dark:border-blue-900 mb-3">
        <p className="text-sm whitespace-pre-wrap">{suggestion.improved}</p>
      </div>
      
      <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">
        <strong>Why:</strong> {suggestion.explanation}
      </p>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={onReject}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Dismiss
        </button>
        <button
          onClick={() => onAccept(suggestion.improved)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

interface RequestSuggestionButtonProps {
  onClick: () => void;
  loading?: boolean;
  className?: string;
}

export function RequestSuggestionButton({
  onClick,
  loading = false,
  className = '',
}: RequestSuggestionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-3.5 w-3.5 mr-1 ${loading ? 'animate-spin' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {loading ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        )}
      </svg>
      {loading ? 'Generating...' : 'Improve with AI'}
    </button>
  );
} 