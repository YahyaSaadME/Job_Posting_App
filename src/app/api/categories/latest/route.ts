/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blogs";
import Course from "@/models/courses";
import Job from "@/models/jobs";
import Category from "../../../../models/categories";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    // Fetch all categories
    const categories = await Category.find();

    // Calculate the total count of blogs, jobs, and courses for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category: { title: any; toObject: () => any; }) => {
        const categoryQuery = { category: category.title };

        const [blogCount, courseCount, jobCount] = await Promise.all([
          Blog.countDocuments(categoryQuery),
          Course.countDocuments(categoryQuery),
          Job.countDocuments(categoryQuery),
        ]);

        return {
          ...category.toObject(),
          count: blogCount + courseCount + jobCount,
        };
      })
    );

    // Sort categories by count in descending order and pick the top 6
    const topCategories = categoriesWithCounts
      .sort((a: { count: number; }, b: { count: number; }) => b.count - a.count)
      .slice(0, 7);

    return NextResponse.json({ categories: topCategories });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching categories", error },
      { status: 500 }
    );
  }
}
