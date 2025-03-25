import { NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(request: Request) {
  try {
    const { resumeContent, jobDescription } = await request.json();

    if (!resumeContent || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume content and job description are required' },
        { status: 400 }
      );
    }

    // Rate limiting could be implemented here
    
    const analysis = await aiService.analyzeKeywords(resumeContent, jobDescription);
    
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error processing keyword analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze keywords' },
      { status: 500 }
    );
  }
} 