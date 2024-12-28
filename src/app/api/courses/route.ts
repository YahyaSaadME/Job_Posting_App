import Course from "../../../models/courses";
import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../utils/dbConnect";
await dbConnect();

// Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, tableOfContent } = body;

    // Validation
    if (!title || !description || !category || !Array.isArray(tableOfContent)) {
      return NextResponse.json(
        { message: "All fields are required, including tableOfContent." },
        { status: 400 }
      );
    }

    // Create a new course
    const newCourse = await Course.create({
      title,
      description,
      category,
      tableOfContent,
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating course", error }, { status: 500 });
  }
}

// Get courses with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const courses = await Course.find().skip(skip).limit(limit);
    const totalCourses = await Course.countDocuments();

    return NextResponse.json({
      data: courses,
      total: totalCourses,
      page,
      pages: Math.ceil(totalCourses / limit),
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching courses", error }, { status: 500 });
  }
}