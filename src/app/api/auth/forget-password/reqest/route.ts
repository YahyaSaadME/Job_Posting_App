/* eslint-disable @typescript-eslint/no-explicit-any */
import connectToDatabase from "@/utils/dbConnect";
import {User} from "@/models/User";
import { generateResetToken } from "@/utils/token";
import mailSender from "@/utils/mailSender";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email ) {
    return NextResponse.json({ error: "Email is required " },{status:400});
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" },{status:400});
    }
    console.log(user);
    
    const resetToken = generateResetToken();
    const resetPasswordExpiresAt = new Date(Date.now() + 3600000); // Token valid for 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset/${resetToken}`;

    await mailSender({
      email: user.email,
      title: "Password Reset Request",
      body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request - Shiv InfoSec</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
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
            color: #333;
        }
        .header {
            text-align: center;
            color: #007BFF;
        }
        .header h1 {
            font-size: 26px;
            margin: 0;
        }
        .content {
            margin-top: 20px;
            line-height: 1.6;
            font-size: 16px;
        }
        .content p {
            margin: 10px 0;
        }
        .content a {
            color: #007BFF;
            text-decoration: none;
            font-weight: bold;
        }
        .button {
            display: inline-block;
      
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            margin-top: 20px;
            text-align: center;
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
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Dear ${email},</p>
            <p>You have requested to reset your password. Please use the link below to reset your password:</p>
            <p><a href="${resetLink}" class="button" target="_blank">Reset Your Password</a></p>
            <p>If you did not request a password reset, please ignore this email or contact us immediately.</p>
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

    return NextResponse.json({ message: "Password reset link sent to email" },{status:200});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Server error" },{status:500});
  }
}