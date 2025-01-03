import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // MongoDB connection utility
import Job from "../../../../models/jobs"; // Job model
import { Types } from "mongoose";

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const jobId = pathname.split('/').pop();
    console.log(jobId);
    
    await dbConnect();
    try {
      if(!jobId){
        return NextResponse.json({ success: false, message: 'Please provide id.' }, { status: 404 });
      }
      const job = await Job.findById({_id:new Types.ObjectId(jobId)});
      console.log(job);
      
      if (!job) {
        return NextResponse.json({ success: false, message: 'job not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: job }, { status: 200 });
    } catch (error:any) {
        console.log(error);
        
      return NextResponse.json({ success: false, message: error }, { status: 400 });
    }
  }

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, by,...updates } = body;
    if (!_id || !by) {
      return NextResponse.json({ message: "job ID and UID is required." }, { status: 400 });
    }
    const job  =await Job.findById(new Types.ObjectId(_id))
    
    if(String(job.by )!== by){
      return NextResponse.json({ message: "You are not authorized to update this job." }, { status: 401 });
    }

    const updatedCourse = await Job.findByIdAndUpdate(_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return NextResponse.json({ message: "job not found." }, { status: 404 });
    }


    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
    try {
      const { pathname } = new URL(request.url);
      const _id = pathname.split('/').pop();
  
      if (!_id) {
        return NextResponse.json({ message: "job ID is required." }, { status: 400 });
      }
      const job  =await Job.findById(new Types.ObjectId(_id))
    

      const deletedjob = await Job.findByIdAndDelete(_id);
  
      if (!deletedjob) {
        return NextResponse.json({ message: "job not found." }, { status: 404 });
      }
  
      return NextResponse.json({ message: "job deleted successfully." }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error deleting job", error }, { status: 500 });
    }
  }
  