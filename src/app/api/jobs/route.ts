/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Job from "../../../models/jobs"; // Adjust the path to your model
import dbConnect from "@/utils/dbConnect"; 



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
      companyImgLink,
      companySummary,
      Qualifications,
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
      !companyImgLink ||
      !companySummary ||
      !Qualifications
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
      companyImgLink,
      companySummary,
      Qualifications,
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error :any) {
    return NextResponse.json(
      { message: "Error creating job", error: error.message },
      { status: 500 }
    );
  }
}
