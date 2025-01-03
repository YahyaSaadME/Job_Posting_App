import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), 'public/images');
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
  return uploadDir;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    const uploadDir = await ensureUploadDir();
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `image-${Date.now()}${path.extname(file.name)}`;
    
    await fs.writeFile(
      path.join(uploadDir, filename),
      buffer
    );

    return NextResponse.json({
      success: true,
      url:filename
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};