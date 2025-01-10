/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import course from "./../../../../models/courses"; // Adjust the path to your model
import dbConnect from "@/utils/dbConnect"; 


export async function GET(request: Request) {

  const { pathname } = new URL(request.url);
  console.log('Extracted Path:', pathname);
  const id : any = pathname.split('/').pop();
  
  try {

   await dbConnect()
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const data = await course.findById(id); // Fetch the course by ID from MongoDB

    if (!data) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
