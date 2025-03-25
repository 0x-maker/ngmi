import { ResumeData } from './ai-service';

const STORAGE_KEY = 'resumeData';
const SELECTED_TEMPLATE_KEY = 'selectedTemplate';

// Save resume data to localStorage
export const saveResumeData = (data: ResumeData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save resume data to localStorage:', error);
  }
};

// Load resume data from localStorage
export const loadResumeData = (): ResumeData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return null;
    
    return JSON.parse(storedData) as ResumeData;
  } catch (error) {
    console.error('Failed to load resume data from localStorage:', error);
    return null;
  }
};

// Save selected template to localStorage
export const saveSelectedTemplate = (templateId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SELECTED_TEMPLATE_KEY, templateId);
  } catch (error) {
    console.error('Failed to save selected template to localStorage:', error);
  }
};

// Load selected template from localStorage
export const loadSelectedTemplate = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(SELECTED_TEMPLATE_KEY);
  } catch (error) {
    console.error('Failed to load selected template from localStorage:', error);
    return null;
  }
};

// Create empty resume data template
export const createEmptyResumeData = (): ResumeData => {
  return {
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  };
}; 