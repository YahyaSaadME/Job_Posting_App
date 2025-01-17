import mongoose, { Document, Schema } from "mongoose";

// Interface to define the structure of the OTP document
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  expirationTime: Date;  // New field to specify when the OTP expires
}

// OTP Schema definition
const OTPSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationTime: {
    type: Date,
    required: true,  // New field to store the expiration time
  },
});

// Check if the model already exists, if not create it
const OTP = mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);

export default OTP;
