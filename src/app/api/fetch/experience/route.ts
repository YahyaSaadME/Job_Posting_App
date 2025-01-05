/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import Job from "@/models/jobs";

export async function GET(request: NextRequest) {
    try {
        const yearsOfExperience = await Job.distinct('yearsOfExperience');
  
  
      return NextResponse.json({
   
       data: yearsOfExperience
      });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching courses", error }, { status: 500 });
    }
  }