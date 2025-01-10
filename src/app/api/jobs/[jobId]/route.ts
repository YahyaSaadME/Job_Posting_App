/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/utils/dbConnect"; 
import Job from '../../../../models/jobs';
import { Types } from 'mongoose';
export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const jobId = pathname.split('/').pop();
  
  try {
    await dbConnect();
    if(!jobId){
      return NextResponse.json({ success: false, message: 'Please provide id.' }, { status: 404 });
    }
    const job = await Job.findById({_id:new Types.ObjectId(jobId)});
    if (!job) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: job }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}
// Update a job by ID
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updates } = body;
    if (!_id) {
      return NextResponse.json({ message: "Job ID is required." }, { status: 400 });
    }

    const updatedJob = await Job.findByIdAndUpdate(_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating job", error }, { status: 500 });
  }
}

// Delete a job by ID
export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ message: "Job ID is required." }, { status: 400 });
    }

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting job", error }, { status: 500 });
  }
}
