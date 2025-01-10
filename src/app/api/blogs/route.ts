import Blog from "../../../models/blogs";
import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect"; 


// Create a new blog
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const { title, author, category, tableOfContent, thumbnail, tags } = body;
    console.log(!Array.isArray(tableOfContent));
    
    // Validation
    if (
      !title ||
      !author ||
      !category ||
      !Array.isArray(tableOfContent) ||
      !thumbnail ||
      !Array.isArray(tags)
    ) {
      return NextResponse.json(
        {
          message:
            "All fields are required, including tableOfContent, thumbnail, and tags.",
        },
        { status: 400 }
      );
    }

    // Create a new blog
    const newBlog = await Blog.create({
      title,
      author,
      category,
      tableOfContent,
      thumbnail,
      tags,
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

    const blog = await Blog.find(searchCriteria).skip(skip).limit(limit);
    const totalBlogs = await Blog.countDocuments(searchCriteria);

    return NextResponse.json({
      data: blog,
      total: totalBlogs,
      page,
      pages: Math.ceil(totalBlogs / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog", error },
      { status: 500 }
    );
  }
}