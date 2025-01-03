/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/utils/dbConnect";
import {User} from "@/models/User";
//import OTP from "@/models/otp";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
//import mailSender from "@/lib/utility/mailSender";
export async function POST(req: Request) {
  try {
    const { email, name, password, type, mobile } = await req.json();
    console.log(email, name, password, type, mobile);

    if (!email || !name || !password || !type || !mobile) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      type,
      mobile,
    });

    await newUser.save();

    return NextResponse.json(
      {
        user: newUser,
        success: true,
        message: "User registered successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: "Validation error.", errors: error.errors },
        { status: 400 }
      );
    } else if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error. Email already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
