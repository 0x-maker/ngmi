import { NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(request: Request) {
  try {
    const { resumeContent, targetRole } = await request.json();

    if (!resumeContent) {
      return NextResponse.json(
        { error: 'Resume content is required' },
        { status: 400 }
      );
    }

    // Rate limiting could be implemented here
    
    const analysis = await aiService.analyzeResume(resumeContent, targetRole);
    
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error processing resume analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
} 