import Job from "../../../../models/itRefJob";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; 

export async function GET() {
  try {
    dbConnect();

    // Fetch only approved jobs
    const courses = await Job.find({ approved: true });
    const totalCourses = await Job.countDocuments({ approved: true });

    return NextResponse.json({
      data: courses,
      total: totalCourses,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching courses", error }, { status: 500 });
  }
}
