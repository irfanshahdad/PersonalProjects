import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both Next.js 15 (Promise) and older versions (direct object)
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    const docsDirectory = path.join(process.cwd(), 'docs');
    const filePath = path.join(docsDirectory, `${id}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title from first line (remove # and trim) or use filename
    const firstLine = content.split('\n')[0] || '';
    const title = firstLine.startsWith('#')
      ? firstLine.replace(/^#+\s*/, '').trim()
      : id.replace(/-/g, ' ');
    
    return NextResponse.json({
      id: id,
      title: title,
      content: content,
      filename: `${id}.md`,
    });
  } catch (error) {
    console.error('Error reading doc:', error);
    return NextResponse.json(
      { error: 'Failed to read document' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both Next.js 15 (Promise) and older versions (direct object)
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    const docsDirectory = path.join(process.cwd(), 'docs');
    const filePath = path.join(docsDirectory, `${id}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Write content to file
    fs.writeFileSync(filePath, content, 'utf-8');
    
    // Extract title from first line for response
    const firstLine = content.split('\n')[0] || '';
    const title = firstLine.startsWith('#')
      ? firstLine.replace(/^#+\s*/, '').trim()
      : id.replace(/-/g, ' ');
    
    return NextResponse.json({
      id: id,
      title: title,
      content: content,
      filename: `${id}.md`,
      message: 'Document saved successfully',
    });
  } catch (error) {
    console.error('Error saving doc:', error);
    return NextResponse.json(
      { error: 'Failed to save document' },
      { status: 500 }
    );
  }
}

