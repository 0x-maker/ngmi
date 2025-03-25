import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

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

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await mammoth.extractRawText({ buffer });
    
    return NextResponse.json({ text: result.value });
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    return NextResponse.json(
      { error: 'Failed to parse DOCX file' },
      { status: 500 }
    );
  }
} 