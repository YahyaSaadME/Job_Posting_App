import { NextResponse } from 'next/server';

import course from "./../../../../models/courses"; // Adjust the path to your model
import dbConnect from "../../../../utils/dbConnect";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    dbConnect()
  try {
    // Await params before using the ID
    const { id } = params; // Extracting ID after ensuring params are resolved

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
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
