/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/utils/dbConnect"; 
import Job from '../../../../models/itRefJob';


  

// Update a job by ID
export async function PUT(request: NextRequest) {

    const { pathname } = new URL(request.url);
    const jobId = pathname.split('/').pop();
  console.log(jobId)
  try {
    dbConnect()
    const body = await request.json();
    const {  ...updates } = body;
    if (!jobId) {
      return NextResponse.json({ message: "Job ID is required." }, { status: 400 });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, {...updates,approved:false}, {
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
    dbConnect()
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

