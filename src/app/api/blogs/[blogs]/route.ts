import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // MongoDB connection utility
import Blogs from "../../../../models/blogs"; // Blogs model
import { Types } from "mongoose";

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const blogId = pathname.split('/').pop();
    await dbConnect();
    try {
      if(!blogId){
        return NextResponse.json({ success: false, message: 'Please provide id.' }, { status: 404 });
      }
      const blog = await Blogs.findById({_id:new Types.ObjectId(blogId)});
      if (!blog) {
        return NextResponse.json({ success: false, message: 'blog not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: blog }, { status: 200 });
    } catch (error:any) {
      return NextResponse.json({ success: false, message: error }, { status: 400 });
    }
  }

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updates } = body;
    console.log(updates);
    
    if (!_id) {
      return NextResponse.json({ message: "blog ID is required." }, { status: 400 });
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(_id, {$set :updates}, { new: true, runValidators: true });
    
    if (!updatedBlog) {
      return NextResponse.json({ message: "blog not found." }, { status: 404 });
    }


    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
    try {
      const { pathname } = new URL(request.url);
      const id = pathname.split('/').pop();
  
      if (!id) {
        return NextResponse.json({ message: "blog ID is required." }, { status: 400 });
      }
  
      const deletedBlog = await Blogs.findByIdAndDelete(id);
  
      if (!deletedBlog) {
        return NextResponse.json({ message: "blog not found." }, { status: 404 });
      }
  
      return NextResponse.json({ message: "blog deleted successfully." }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error deleting blog", error }, { status: 500 });
    }
  }
  