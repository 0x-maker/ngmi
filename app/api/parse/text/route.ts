import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // For text files, we can simply read the text content
    const text = await file.text();
    
    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error parsing text file:', error);
    return NextResponse.json(
      { error: 'Failed to parse text file' },
      { status: 500 }
    );
  }
} 