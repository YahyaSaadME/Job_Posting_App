import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blogs";
import Course from "@/models/courses";
import Job from "@/models/jobs";
import Category from "../../../models/categories"

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const blogPage = parseInt(searchParams.get("blogPage") || "1");
    const blogLimit = parseInt(searchParams.get("blogLimit") || "3");
    const coursePage = parseInt(searchParams.get("coursePage") || "1");
    const courseLimit = parseInt(searchParams.get("courseLimit") || "3");
    const jobPage = parseInt(searchParams.get("jobPage") || "1");
    const jobLimit = parseInt(searchParams.get("jobLimit") || "3");
    const category = searchParams.get("category") || "";
    
    const query = category
      ? { category: { $regex: category, $options: "i" } }
      : {};

    const [blogs, blogTotal] = await Promise.all([
      Blog.find(query)
        .skip((blogPage - 1) * blogLimit)
        .limit(blogLimit),
      Blog.countDocuments(query),
    ]);

    const [courses, courseTotal] = await Promise.all([
      Course.find(query)
        .skip((coursePage - 1) * courseLimit)
        .limit(courseLimit),
      Course.countDocuments(query),
    ]);

    const [jobs, jobTotal] = await Promise.all([
      Job.find(query)
        .skip((jobPage - 1) * jobLimit)
        .limit(jobLimit),
      Job.countDocuments(query),
    ]);

    const categoryQuery = category
      ? {
          $or: [
            { title: { $regex: category, $options: "i" } },
            { desc: { $regex: category, $options: "i" } },
          ],
        }
      : {};

    const foundCategory = await Category.findOne(categoryQuery);

    const totalItemsCount = blogTotal + courseTotal + jobTotal;

    return NextResponse.json({
      blogs: {
        items: blogs,
        total: blogTotal,
        page: blogPage,
        pages: Math.ceil(blogTotal / blogLimit),
      },
      courses: {
        items: courses,
        total: courseTotal,
        page: coursePage,
        pages: Math.ceil(courseTotal / courseLimit),
      },
      jobs: {
        items: jobs,
        total: jobTotal,
        page: jobPage,
        pages: Math.ceil(jobTotal / jobLimit),
      },
      category: {
        ...foundCategory?.toObject(),
        count: totalItemsCount,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching items", error },
      { status: 500 }
    );
  }
}