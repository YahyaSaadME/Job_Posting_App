/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; 

import Job from "@/models/jobs";






export async function GET(request: NextRequest) {
 
    try {
      await dbConnect()
        const location = await Job.distinct('location');
  
  
      return NextResponse.json({
   
       data: location
      });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching courses", error }, { status: 500 });
    }
  }