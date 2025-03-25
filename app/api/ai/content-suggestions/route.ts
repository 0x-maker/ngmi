import { NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(request: Request) {
  try {
    const { content, section } = await request.json();

    if (!content || !section) {
      return NextResponse.json(
        { error: 'Content and section are required' },
        { status: 400 }
      );
    }

    // Rate limiting could be implemented here
    
    const suggestions = await aiService.getSuggestions(content, section);
    
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error processing content suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate content suggestions' },
      { status: 500 }
    );
  }
} 