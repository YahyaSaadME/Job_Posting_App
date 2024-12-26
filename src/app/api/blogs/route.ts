import Blog from "../../../models/blogs";
import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../utils/dbConnect";
await dbConnect();

// Create a new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, category, tableOfContent } = body;
    console.log(body);
    
    // Validation
    if (!title || !author || !category || !Array.isArray(tableOfContent)) {
      return NextResponse.json(
        { message: "All fields are required, including tableOfContent." },
        { status: 400 }
      );
    }

    // Create a new blog
    const newBlog = await Blog.create({
      title,
      author,
      category,
      tableOfContent,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { message: "Error creating blog", error },
      { status: 500 }
    );
  }
}

// Get blog with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const blog = await Blog.find().skip(skip).limit(limit);
    const totalCourses = await Blog.countDocuments();

    return NextResponse.json({
      data: blog,
      total: totalCourses,
      page,
      pages: Math.ceil(totalCourses / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog", error },
      { status: 500 }
    );
  }
}
