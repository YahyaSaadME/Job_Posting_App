/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Category from "../../../../models/categories";
import dbConnect from "@/utils/dbConnect";

// GET Handler
export async function GET(request: NextRequest) {
  await dbConnect();
  const catId = request.nextUrl.pathname.split("/").pop();

  if (!catId) {
    return NextResponse.json(
      { success: false, message: "Please provide an ID." },
      { status: 404 }
    );
  }

  try {
    const category = await Category.findById(new mongoose.Types.ObjectId(catId));

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

<<<<<<< HEAD
// ✅ PUT Handler
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { pathname } = new URL(request.url);
    const catId = pathname.split("/").pop();
    const body = await request.json();
=======
// PUT Handler
export async function PUT(request: NextRequest) {
  await dbConnect();
  const catId = request.nextUrl.pathname.split("/").pop();
>>>>>>> a30765f2de9d41378e1ddf4927966cb9a2bc0a29

  try {
    const body = await request.json();
    const updatedCategory = await Category.findByIdAndUpdate(catId, body, {
      new: true,
    });

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCategory }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating category.", error: error.message },
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
// ✅ DELETE Handler
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { pathname } = new URL(request.url);
    const catId = pathname.split("/").pop();
=======
// DELETE Handler
export async function DELETE(request: NextRequest) {
  await dbConnect();
  const catId = request.nextUrl.pathname.split("/").pop();

  try {
>>>>>>> a30765f2de9d41378e1ddf4927966cb9a2bc0a29
    const deletedCategory = await Category.findByIdAndDelete(catId);

    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting category.", error: error.message },
      { status: 500 }
    );
  }
}
