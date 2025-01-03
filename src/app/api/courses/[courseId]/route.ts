import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // MongoDB connection utility
import Course from "../../../../models/courses"; // Course model
import { Types } from "mongoose";

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const courseId = pathname.split('/').pop();
    await dbConnect();
    try {
      if(!courseId){
        return NextResponse.json({ success: false, message: 'Please provide id.' }, { status: 404 });
      }
      const course = await Course.findById({_id:new Types.ObjectId(courseId)});
      if (!course) {
        return NextResponse.json({ success: false, message: 'course not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: course }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      return NextResponse.json({ success: false, message: error }, { status: 400 });
    }
  }

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updates } = body;
    if (!_id) {
      return NextResponse.json({ message: "course ID is required." }, { status: 400 });
    }

    const updatedCourse = await Course.findByIdAndUpdate(_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return NextResponse.json({ message: "course not found." }, { status: 404 });
    }


    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
    try {
      const { pathname } = new URL(request.url);
      const id = pathname.split('/').pop();
  
      if (!id) {
        return NextResponse.json({ message: "course ID is required." }, { status: 400 });
      }
  
      const deletedcourse = await Course.findByIdAndDelete(id);
  
      if (!deletedcourse) {
        return NextResponse.json({ message: "course not found." }, { status: 404 });
      }
  
      return NextResponse.json({ message: "course deleted successfully." }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error deleting course", error }, { status: 500 });
    }
  }
  