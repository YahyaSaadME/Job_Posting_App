/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Category.countDocuments(query);

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

    return NextResponse.json({
      categories: categoriesWithCounts,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching categories", error },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { title, desc, bg, icon } = await request.json();

    if (!title || !desc || !bg || !icon) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newCategory = new Category({
      title,
      desc,
      bg,
      icon,
    });

    await newCategory.save();

    return NextResponse.json({ message: "Category created successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating category", error },
      { status: 500 }
    );
  }
}