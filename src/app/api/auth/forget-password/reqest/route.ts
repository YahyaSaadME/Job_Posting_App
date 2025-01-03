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
      body: ` your reset link is ${resetLink}`,
    });

    return NextResponse.json({ message: "Password reset link sent to email" },{status:200});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Server error" },{status:500});
  }
}