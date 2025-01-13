import mongoose, { Document, Schema } from "mongoose";



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




// Check if the model already exists, if not create it
const OTP = mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);

export default OTP;