import { NextRequest, NextResponse } from 'next/server';
// Import directly from the module's main file to avoid triggering tests
// @ts-ignore - No type definitions available for the specific import path
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

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
    const data = await pdfParse(buffer);
    
    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to parse PDF file' },
      { status: 500 }
    );
  }
} 