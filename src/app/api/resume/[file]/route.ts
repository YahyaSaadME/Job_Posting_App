import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const filename = pathname.split('/').pop();
    const image = path.join(process.cwd(), './assets/resume/'+filename);
    if(image){

      const fs = require('fs');
      const fileStream = fs.createReadStream(image);
      return new NextResponse(fileStream, {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });
    }else{
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error on loading file' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};