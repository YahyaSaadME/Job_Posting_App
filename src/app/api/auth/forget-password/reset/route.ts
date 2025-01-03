/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/utils/dbConnect';
import {User} from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { token, password, confirmPassword } = await req.json();


  if (!token || !password || !confirmPassword) {
    return NextResponse.json({ error: 'Token, new password, and confirm password are required' }, { status: 400 });
  }

  try {
    await connectToDatabase();

    if (password === confirmPassword) {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() }, // Check if the token is still valid
      });

      if (!user) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;

      await user.save();

      return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Your password and confirm password do not match' }, { status: 400 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}