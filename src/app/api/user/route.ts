
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../../../models/User";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ message: "Id is required" }, { status: 400 });
    }
    const user = await User.findById({_id:new mongoose.Types.ObjectId(id)}).select({email:1,name:1,resume:1,number:1});
    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
     
    );
  }
}
