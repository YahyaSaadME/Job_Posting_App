// Named export for User model
import mongoose, { Model } from "mongoose";

export interface IUser {
  name?: string;
  email: string;
  password: string;
  type: "jobSeeker" | "jobPoster";
  otp?: string;
  otpExpiresAt?: Date;
  verified: "approved" | "declined";
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: {
    type: String,
    enum: ["jobSeeker", "jobPoster"],
    default: "jobSeeker",
  },
  verified: { type: String, enum: ["approved", "declined"], default: "declined" },
  resetPasswordToken: { type: String },
  resetPasswordExpiresAt: { type: Date },
  otp: { type: String },
  otpExpiresAt: { type: Date },
});

// Named export
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
