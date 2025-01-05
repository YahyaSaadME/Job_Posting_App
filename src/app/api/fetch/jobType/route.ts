/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import Job from "@/models/jobs";

export async function GET(request: NextRequest) {
    try {
        const jobType = await Job.distinct('jobType');
  
  
      return NextResponse.json({
   
       data: jobType
      });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching courses", error }, { status: 500 });
    }
  }