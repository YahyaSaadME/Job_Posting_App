import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
//import OTP from "@/models/otp";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
//import mailSender from "@/lib/utility/mailSender";

export async function POST(req: Request) {
  try {
    const { email, name, password, type, mobile } = await req.json();
    console.log(email, name, password, type, mobile);

    if (!email || !name || !password || !type  || !mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    // Fetch the most recent OTP for the email
    // const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    // if (!recentOtp) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "OTP not found. Please request a new OTP.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered.",
        },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      type,
      verified: type == "jobSeeker" ? false : undefined,
    });

    
    return NextResponse.json(
      {
        user: newUser,
        success: true,
        message: "User registered successfully.",
      },
      { status: 201 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    console.error("Error verifying OTP:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error. Please check your input.",
        },
        { status: 400 }
      );
    } else if (error.name === "MongoError" || error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Database error. Please try again later.",
        },
        { status: 500 }
      );
    }

    // return NextResponse.json(
    //   {
    //     success: false,
    //     message:
    //       "An error occurred while verifying the OTP. Please try again later.",
    //   },
    //   { status: 500 }
   // );
  }
}