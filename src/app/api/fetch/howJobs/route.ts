/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import Job from "@/models/jobs";

export async function GET(request: NextRequest) {
  try {
    // Count all jobs in the collection
    const jobCount = await Job.countDocuments();

    return NextResponse.json({
      success: true,
      data: { count: jobCount },
    });
  } catch (error) {
    console.error("Error fetching job count:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching job count", error },
      { status: 500 }
    );
  }
}
