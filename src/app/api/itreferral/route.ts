import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Job from '../../../models/jobs';
import { Types } from 'mongoose';


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
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
    const status = searchParams.get("status");
    console.log(status);
    
    if (status !== "undefined") {
      const jobs = await Job.find({by: userId,
        approved: status == "null" ? null : status,
      })
        .skip(skip)
        .limit(limit);
      const totalJobs = await Job.countDocuments({by: userId,
        approved: status == "null" ? null : status,
      });
      return NextResponse.json({
        data: jobs,
        total: totalJobs,
        page,
        pages: Math.ceil(totalJobs / limit),
      });
    }
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


export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const { company, location, title, description, requirement, category, yearsOfExperience, jobType, link, tags, by } = body;

    if (!company || !location || !title || !description || !requirement || !category || !yearsOfExperience || !jobType || !link || !tags || !by) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const newJob = new Job({
      company,
      location,
      title,
      description,
      requirement,
      category,
      yearsOfExperience,
      jobType,
      link,
      tags,
      by,
      approved:false
    });

    const savedJob = await newJob.save();

    return NextResponse.json({ success: true, data: savedJob }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
