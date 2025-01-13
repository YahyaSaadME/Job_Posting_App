/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Category from "../../../../models/categories"; // Adjust the path as necessary
import dbConnect from "@/utils/dbConnect";

// ✅ GET Handler
export async function GET(request: NextRequest) {
  await dbConnect();
  const { pathname } = new URL(request.url);
  const catId = pathname.split("/").pop();
  try {
    if (!catId) {
      return NextResponse.json(
        { success: false, message: "Please provide id." },
        { status: 404 }
      );
    }
    const category = await Category.findById({
      _id: new mongoose.Types.ObjectId(catId),
    });
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || error },
      { status: 400 }
    );
  }
}

// ✅ PUT Handler
export async function PUT(
  request: NextRequest,
  { params }: { params: { catId: string } }
) {
  try {
    await dbConnect();
    const { catId } = params;
    const body = await request.json();

    const updatedCategory = await Category.findByIdAndUpdate(catId, body, {
      new: true,
    });

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating category", error },
      { status: 500 }
    );
  }
}

// ✅ DELETE Handler
export async function DELETE(
  request: NextRequest,
  { params }: { params: { catId: string } }
) {
  try {
    await dbConnect();
    const { catId } = params;

    const deletedCategory = await Category.findByIdAndDelete(catId);

    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting category", error },
      { status: 500 }
    );
  }
}
