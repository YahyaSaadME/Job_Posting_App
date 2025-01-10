import Blog from "../../../../models/blogs";
import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../../utils/dbConnect";
await dbConnect();

// Get 4 most recent blogs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // Fetch the 4 most recent blogs sorted by creation date (descending)
    const latestBlogs = await Blog.find({})
      .sort({ createdAt: -1 })  // Sort by createdAt in descending order (newest first)
      .limit(4);  // Limit to the 4 most recent blogs

    return NextResponse.json({
      success: true,
      data: latestBlogs,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching latest blogs", error },
      { status: 500 }
    );
  }
}
