import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const docsDirectory = path.join(process.cwd(), 'docs');
    
    // Check if docs directory exists
    if (!fs.existsSync(docsDirectory)) {
      return NextResponse.json({ docs: [] });
    }

    // Read all files from docs directory
    const files = fs.readdirSync(docsDirectory);
    
    // Filter for markdown files and read their content
    const docs = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const filePath = path.join(docsDirectory, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Extract title from first line (remove # and trim) or use filename
        const firstLine = content.split('\n')[0] || '';
        const title = firstLine.startsWith('#')
          ? firstLine.replace(/^#+\s*/, '').trim()
          : file.replace('.md', '').replace(/-/g, ' ');
        
        return {
          id: file.replace('.md', ''),
          title: title,
          content: content,
          filename: file,
        };
      });

    return NextResponse.json({ docs });
  } catch (error) {
    console.error('Error reading docs:', error);
    return NextResponse.json(
      { error: 'Failed to read docs', docs: [] },
      { status: 500 }
    );
  }
}

