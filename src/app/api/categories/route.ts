import { NextRequest, NextResponse } from "next/server";
import Courses from "../../../models/courses";
import Blogs from "../../../models/blogs";
import Jobs from "../../../models/jobs";
import dbConnect from "@/utils/dbConnect"; 

export async function GET(request: NextRequest) {

  try {
    await dbConnect()
    const { searchParams } = new URL(request.url);

    // Pagination parameters for Courses
    const coursesPage = parseInt(searchParams.get("coursesPage") || "1", 10);
    const coursesLimit = parseInt(searchParams.get("coursesLimit") || "10", 10);
    const coursesSkip = (coursesPage - 1) * coursesLimit;

    // Pagination parameters for Blogs
    const blogsPage = parseInt(searchParams.get("blogsPage") || "1", 10);
    const blogsLimit = parseInt(searchParams.get("blogsLimit") || "10", 10);
    const blogsSkip = (blogsPage - 1) * blogsLimit;

    // Pagination parameters for Jobs
    const jobsPage = parseInt(searchParams.get("jobsPage") || "1", 10);
    const jobsLimit = parseInt(searchParams.get("jobsLimit") || "10", 10);
    const jobsSkip = (jobsPage - 1) * jobsLimit;

    const coursesCategories = await Courses.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
      { $skip: coursesSkip },
      { $limit: coursesLimit },
    ]);

    const blogsCategories = await Blogs.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
      { $skip: blogsSkip },
      { $limit: blogsLimit },
    ]);

    const jobsCategories = await Jobs.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
      { $skip: jobsSkip },
      { $limit: jobsLimit },
    ]);

    const combinedCategories = [...coursesCategories, ...blogsCategories, ...jobsCategories];

    // Combine and count unique categories
    const categoryCountMap = combinedCategories.reduce((acc, { category, count }) => {
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += count;
      return acc;
    }, {});

    const uniqueCategories = Object.entries(categoryCountMap).map(([category, count]) => ({
      category,
      count,
    }));

    return NextResponse.json(uniqueCategories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching categories", error }, { status: 500 });
  }
}