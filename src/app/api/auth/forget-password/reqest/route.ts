/* eslint-disable @typescript-eslint/no-explicit-any */
import connectToDatabase from "@/utils/dbConnect";
import UserModel from "@/models/User";
import { generateResetToken } from "@/utils/token";
import mailSender from "@/utils/mailSender";

import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email is required and password" },{status:400});
  }

  try {
    await connectToDatabase();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" },{status:400});
    }
    console.log(user);
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid password" },{status:400});
    }
    const resetToken = generateResetToken();
    const resetPasswordExpiresAt = new Date(Date.now() + 3600000); // Token valid for 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    await mailSender({
      email: user.email,
      title: "Password Reset Request",
      body: ` your reset link is ${resetLink}`,
    });

    return NextResponse.json({ message: "Password reset link sent to email" },{status:200});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Server error" },{status:500});
  }
}