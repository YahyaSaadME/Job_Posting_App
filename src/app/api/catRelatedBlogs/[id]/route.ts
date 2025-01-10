/* eslint-disable @typescript-eslint/no-explicit-any */
import Blog from "../../../../models/blogs";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import dbConnect from "@/utils/dbConnect"; 

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const blogId = pathname.split('/').pop();

  // Connect to the database
 

  try {
    await dbConnect();
    if (!blogId) {
      return NextResponse.json({ success: false, message: "Please provide an ID." }, { status: 404 });
    }

    // Find the specific blog by ID
    const blog = await Blog.findById(new Types.ObjectId(blogId));
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found." }, { status: 404 });
    }

    // Fetch blogs with the same category (excluding the current blog)
    const relatedBlogs = await Blog.find({
      category: blog.category,
      _id: { $ne: blog._id },  // Exclude the current blog
    });

    return NextResponse.json({ success: true, data: relatedBlogs }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Error fetching related blogs.", error }, { status: 500 });
  }
}
