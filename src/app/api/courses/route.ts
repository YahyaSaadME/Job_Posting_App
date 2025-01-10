import Course from "../../../models/courses";
import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect"; 


// Create a new course
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      title, 
      description, 
      category, 
      tags, 
      link, 
      thumbnail, 
      duration, 
      responsibilities, 
      courseContent, 
      prerequisites, 
      instructorName
    } = body;
    

    // Validation
    if (
      !title || 
      !description || 
      !category || 
      !Array.isArray(tags) || 
      !link || 
      !thumbnail || 
      !duration || 
      !responsibilities || 
      !courseContent || 
      !prerequisites || 
      !instructorName
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }
    const newCourse = await Course.create({
      title,
      description,
      category,
      tags,
      link,
      thumbnail,
      duration,
      responsibilities,
      courseContent,
      prerequisites,
      instructorName,
    });
    console.log('New course created:', newCourse);
    
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating course", error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const searchQuery = searchParams.get("search") || "";

    // Build search criteria
    const searchCriteria = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const courses = await Course.find(searchCriteria).skip(skip).limit(limit);
    const totalCourses = await Course.countDocuments(searchCriteria);

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
