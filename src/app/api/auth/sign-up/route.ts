/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/utils/dbConnect";
import { User } from "@/models/User";
import OTP from "@/models/otp";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mailSender from "@/utils/mailSender"; // Assuming you have a mailSender utility function

export async function POST(req: Request) {
  try {
    const { email, name, password, type, mobile, otp } = await req.json();
    console.log(email, name, password, type, mobile, otp);

    if (!email || !name || !password || !type || !mobile || !otp) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already registered." }, { status: 409 });
    }

    const otpEntry = await OTP.findOne({ email, otp });
    if (!otpEntry) {
      return NextResponse.json({ success: false, message: "Invalid or expired OTP." }, { status: 400 });
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
    await OTP.deleteMany({ email }); // Clear OTPs for this email

 
    await mailSender({
      email,
      title: "Welcome to Shiv InfoSec – Your Cybersecurity Journey Starts Here! ",
      body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Shiv InfoSec</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .header {
            text-align: center;
            color: #333333;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
        }
        .content {
            margin-top: 20px;
            line-height: 1.6;
            color: #666666;
        }
        .content h2 {
            color: #333333;
            font-size: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ffffff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #999999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to Shiv InfoSec, ${name}!</h1>
        </div>
        <div class="content">
            <p>Thank you for signing up with Shiv InfoSec! 🎉 We're excited to have you on board as part of a growing community passionate about cybersecurity.</p>
            <h2>Here’s what you can explore with us:</h2>
            <ul>
                <li><strong>Blogs:</strong> Stay updated with the latest trends in cybersecurity, network security, and IT innovations.</li>
                <li><strong>Courses:</strong> Access free and premium courses to sharpen your skills in cybersecurity, firewalls, cloud, and more.</li>
                <li><strong>Job Opportunities:</strong> Discover top cybersecurity job openings and build your dream career.</li>
                <li><strong>Employee IT Referral Jobs:</strong> Leverage referrals to connect with exciting job prospects in the IT industry.</li>
            </ul>
            <p>Your cybersecurity career is just a step away! Start exploring today at <a href="https://shivinfosec.com" target="_blank">shivinfosec.com</a> or check out our latest updates.</p>
            <a href="https://shivinfosec.com" class="button" target="_blank">Visit Our Website</a>
        </div>
        <div class="footer">
            <p>Stay secure,<br>The Shiv InfoSec Team</p>
            <p><a href="https://shivinfosec.com" target="_blank">shivinfosec.com</a></p>
        </div>
    </div>
</body>
</html>
`,
    });

    return NextResponse.json({ user: newUser, success: true, message: "User registered successfully." }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json({ success: false, message: "Validation error.", errors: error.errors }, { status: 400 });
    } else if (error.code === 11000) {
      return NextResponse.json({ success: false, message: "Duplicate key error. Email already exists." }, { status: 409 });
    }

    return NextResponse.json({ success: false, message: "Server error. Please try again later." }, { status: 500 });
  }
}
