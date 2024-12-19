import mongoose, { Model } from "mongoose";



// Define interface for user
export interface IUser {
  name?: string;
  email: string;
  password: string;
  type: string;
  otp?: string;
  otpExpiresAt?: Date;
  role: "jobSeeker" ;
  verified: string;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
}

// Define the User schema
const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: {
    type: String,
    enum: ["jobSeeker"],
    default: "jobSeeker",
  },
  verified: { type: String, enum:['approved','declined'] },
  resetPasswordToken: { type: String },
  resetPasswordExpiresAt: { type: Date },
  otp: { type: String },
  otpExpiresAt: { type: Date }

});

// Use type assertion to ensure the model has the correct type
export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
