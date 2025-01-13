/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import itRefJob from '../../../models/itRefJob';

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
      const jobs = await itRefJob.find({by: userId,
        approved: status == "null" ? null : status,
      })
        .skip(skip)
        .limit(limit);
      const totalJobs = await itRefJob.countDocuments({by: userId,
        approved: status == "null" ? null : status,
      });
      return NextResponse.json({
        data: jobs,
        total: totalJobs,
        page,
        pages: Math.ceil(totalJobs / limit),
      });
    }
    const totalDocuments = await itRefJob.countDocuments(searchQuery);
    const jobs = await itRefJob.find(searchQuery).skip(skip).limit(limit);
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
    const { title, description, companyName, jobType, by, yearsOfExperience, location, qualification } = body;

    if (!location || !title || !description || !yearsOfExperience || !jobType || !by) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const postCount = await itRefJob.countDocuments({
      by: by,
      createdAt: { $gte: firstDayOfMonth }
    });

    if (postCount >= 10) {
      return NextResponse.json({ message: "You have reached your posting limit for this month." }, { status: 403 });
    }

    const newJob = new itRefJob({
      title,
      description,
      companyName,
      jobType,
      yearsOfExperience,
      location,
      qualification,
      applicants: [],
      by,
      approved: false
    });

    const savedJob = await newJob.save();

    return NextResponse.json({ success: true, data: savedJob }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
