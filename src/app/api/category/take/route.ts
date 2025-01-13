import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blogs";
import Course from "@/models/courses";
import Job from "@/models/jobs";
import Category from "../../../../models/categories"; 

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "blog";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category") || "";

    const query = category
      ? { category: { $regex: category, $options: "i" } }
      : {};

    let items, total;
    switch (type) {
      case "course":
        [items, total] = await Promise.all([
          Course.find(query)
            .skip((page - 1) * limit)
            .limit(limit),
          Course.countDocuments(query),
        ]);
        break;
      case "job":
        [items, total] = await Promise.all([
          Job.find(query)
            .skip((page - 1) * limit)
            .limit(limit),
          Job.countDocuments(query),
        ]);
        break;
      case "blog":
      default:
        [items, total] = await Promise.all([
          Blog.find(query)
            .skip((page - 1) * limit)
            .limit(limit),
          Blog.countDocuments(query),
        ]);
        break;
    }

    const categoryQuery = category
      ? {
          $or: [
            { title: { $regex: category, $options: "i" } },
            { desc: { $regex: category, $options: "i" } },
          ],
        }
      : {};

    const foundCategory = await Category.findOne(categoryQuery);

    return NextResponse.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
      category: foundCategory,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching items", error },
      { status: 500 }
    );
  }
}