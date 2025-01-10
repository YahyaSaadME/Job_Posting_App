/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Job from "../../../models/jobs"; // Adjust the path to your model
import dbConnect from "@/utils/dbConnect"; 



// Create a new job posting
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      company,
      location,
      title,
      description,
      requirement,
      category,
      yearsOfExperience,
      link,
      jobType,
      tags,
      by,
      approved,
    } = body;

    // Validation
    if (
      !company ||
      !location ||
      !title ||
      !description ||
      !requirement ||
      !category ||
      yearsOfExperience == null ||
      !link ||
      !jobType ||
      !tags ||
      approved == undefined
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Create a new job
    const newJob = await Job.create({
      company,
      location,
      title,
      description,
      requirement,
      category,
      yearsOfExperience,
      link,
      jobType,
      tags,
      by,
      approved,
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating job", error },
      { status: 500 }
    );
  }
}
// Get jobs with filters, search, and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const filters: any = {};
    const status = searchParams.get("status");
    if (status !== "undefined") {
      const jobs = await Job.find({
        approved: status == "null" ? null : status,
      })
        .skip(skip)
        .limit(limit);
      const totalJobs = await Job.countDocuments({
        approved: status == "null" ? null : status,
      });
      return NextResponse.json({
        data: jobs,
        total: totalJobs,
        page,
        pages: Math.ceil(totalJobs / limit),
      });
    }
    // Apply filters
    if (searchParams.get("company"))
      filters.company = searchParams.get("company");
    if (searchParams.get("location"))
      filters.location = searchParams.get("location");
    if (searchParams.get("category"))
      filters.category = searchParams.get("category");
    if (searchParams.get("jobType"))
      filters.jobType = searchParams.get("jobType");
    if (searchParams.get("minExperience")) {
      filters.yearsOfExperience = {
        $gte: parseInt(searchParams.get("minExperience")!, 10),
      };
    }
    if (searchParams.get("maxExperience")) {
      filters.yearsOfExperience = filters.yearsOfExperience || {};
      filters.yearsOfExperience.$lte = parseInt(
        searchParams.get("maxExperience")!,
        10
      );
    }

    // Apply search
    if (searchParams.get("search")) {
      const search = searchParams.get("search")!;
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { requirement: { $regex: search, $options: "i" } },
        { qualifications: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await Job.find(filters).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(filters);

    // Map _id to id
    const formattedJobs = jobs.map(job => ({
      ...job.toObject(),
      id: job._id.toString(),
    }));

    return NextResponse.json({
      data: formattedJobs,
      total: totalJobs,
      page,
      pages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching jobs", error },
      { status: 500 }
    );
  }
}
