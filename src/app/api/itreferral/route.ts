import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Job from '../../../models/jobs';
import { Types } from 'mongoose';


export async function GET(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const userId = searchParams.get("uid");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  await dbConnect();
  try {
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Please provide user id.' }, { status: 404 });
    }

    const searchQuery = {
      by: userId,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } }
      ]
    };

    const totalDocuments = await Job.countDocuments(searchQuery);
    const jobs = await Job.find(searchQuery).skip(skip).limit(limit);
    const totalPages = Math.ceil(totalDocuments / limit);

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalDocuments: totalDocuments
      }
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const uid = searchParams.get("uid");

    if (!id || !uid) {
      return NextResponse.json({ message: "Job ID & UID is required." }, { status: 400 });
    }
    
    const JobInfo = await Job.findById(new Types.ObjectId(id));
    if(JobInfo.by !== uid){
      return NextResponse.json({ message: "You are not authorized to delete this job." }, { status: 401 });
    }
    const deletedJob = await Job.findByIdAndDelete(new Types.ObjectId(id));
    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting job", error }, { status: 500 });
  }
}
