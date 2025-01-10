/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import Job from "@/models/jobs";

import dbConnect from "@/utils/dbConnect"; 




export async function GET(request: NextRequest) {
  
    try {
      await dbConnect()
        const categories = await Job.distinct('category');
  
  
      return NextResponse.json({
   
       data: categories
      });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching courses", error }, { status: 500 });
    }
  }