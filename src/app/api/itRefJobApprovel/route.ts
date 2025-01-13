import Job from "../../../models/itRefJob";
import {  NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect"; 



export async function GET() {
  try {
    dbConnect()

    const courses = await Job.find();
    const totalCourses = await Job.countDocuments();

    return NextResponse.json({
      data: courses,
      total: totalCourses,

    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching courses", error }, { status: 500 });
  }
}
