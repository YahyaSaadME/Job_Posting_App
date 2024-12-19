import mongoose, { Document, Schema } from "mongoose";

import mailSender from "@/utils/mailSender";

// Interface to define the structure of the OTP document
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
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
    expires: "5m", // The document will be automatically deleted after 5 minutes
  },
});

// Function to send verification email
async function sendVerificationEmail(
  email: string,
  otp: string
): Promise<void> {
  try {

    const mailResponse = await mailSender({
      email:email,
      title:`otp is ${otp}`,
      body:`
         this is your ${otp} 
      `}
    );
    console.log("Email sent Successfully", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email", error);
    throw error;
  }
}

// Pre-save hook to send verification email
OTPSchema.pre("save", async function (this: IOTP, next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

// Check if the model already exists, if not create it
const OTP = mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);

export default OTP;