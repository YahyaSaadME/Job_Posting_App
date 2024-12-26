import { NextRequest, NextResponse } from "next/server";
import Job from "../../../models/jobs"; // Adjust the path to your model
import dbConnect from "../../../utils/dbConnect";
await dbConnect();

// Create a new job posting
export async function POST(request: NextRequest) {
  try {
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
      jobType
    } = body;
    console.log((
      !company ||
      !location ||
      !title ||
      !description ||
      !requirement ||
      !category ||
      !yearsOfExperience ||
      !link ||
      !jobType
    ));
    
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
      !jobType
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
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating job", error }, { status: 500 });
  }
}

// Get jobs with filters, search, and pagination
export async function GET(request: NextRequest) {

  // curl -X POST -H "Content-Type: application/json" -d '{
  //   "company": "TechCorp",
  //   "location": "San Francisco",
  //   "title": "Software Engineer",
  //   "description": "Develop cutting-edge software.",
  //   "requirement": "Proficiency in JavaScript.",
  //   "category": "Engineering",
  //   "yearsOfExperience": 3,
  //   "jobType": "Full-time"
  // }' http://localhost:3000/api/jobs
  
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const filters: any = {};

    // Apply filters
    if (searchParams.get("company")) filters.company = searchParams.get("company");
    if (searchParams.get("location")) filters.location = searchParams.get("location");
    if (searchParams.get("category")) filters.category = searchParams.get("category");
    if (searchParams.get("jobType")) filters.jobType = searchParams.get("jobType");
    if (searchParams.get("minExperience")) {
      filters.yearsOfExperience = { $gte: parseInt(searchParams.get("minExperience")!, 10) };
    }
    if (searchParams.get("maxExperience")) {
      filters.yearsOfExperience = filters.yearsOfExperience || {};
      filters.yearsOfExperience.$lte = parseInt(searchParams.get("maxExperience")!, 10);
    }

    // Apply search
    if (searchParams.get("search")) {
      const search = searchParams.get("search")!;
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { requirement: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await Job.find(filters).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(filters);

    return NextResponse.json({
      data: jobs,
      total: totalJobs,
      page,
      pages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching jobs", error }, { status: 500 });
  }
}
