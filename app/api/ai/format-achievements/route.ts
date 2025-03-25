import { NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    // Rate limiting could be implemented here
    
    const achievements = await aiService.formatAchievements(jobDescription);
    
    return NextResponse.json({ achievements });
  } catch (error) {
    console.error('Error formatting achievements:', error);
    return NextResponse.json(
      { error: 'Failed to format achievements' },
      { status: 500 }
    );
  }
} 