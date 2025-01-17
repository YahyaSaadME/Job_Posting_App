import Course from "../../../../models/courses";
import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect"; 


// Get 4 most recent courses
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // Fetch the 4 most recent courses sorted by creation date (descending)
    const latestCourses = await Course.find({})
      .sort({ createdAt: -1 })  // Sort by createdAt in descending order (newest first)
      .limit(8);  // Limit to the 4 most recent courses

    return NextResponse.json({
      success: true,
      data: latestCourses,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching latest courses", error },
      { status: 500 }
    );
  }
}
