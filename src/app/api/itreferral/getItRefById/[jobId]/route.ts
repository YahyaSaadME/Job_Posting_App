/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/utils/dbConnect"; 
import itRefJob from '../../../../../models/itRefJob';
import { Types } from 'mongoose';

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const jobId = pathname.split('/').pop();
  
  try {
    await dbConnect();
    if(!jobId){
      return NextResponse.json({ success: false, message: 'Please provide id.' }, { status: 404 });
    }
    const job = await itRefJob.findById({_id:new Types.ObjectId(jobId)});
    if (!job) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: job }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}
