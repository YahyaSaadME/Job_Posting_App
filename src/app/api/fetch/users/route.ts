/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; 

import {User} from "@/models/User"; // Ensure your models are set up properly

export async function GET(request: NextRequest) {
  
  try {
    await dbConnect()
    // Fetch the count of available jobs
    const jobCount = await User.countDocuments();; // Adjust the condition as needed

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
