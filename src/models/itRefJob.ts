/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, model, models } from 'mongoose';

// Define the ApplicantSchema
const ApplicantSchema = new Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true }, // URL to the uploaded resume
  currentCompany: { type: String },         // Optional field
  noticePeriod: { type: String },           // Optional field
  appliedAt: { type: Date, default: Date.now }, // Automatically track when the application was made
});

// Define the main ItRefJobSchema
const ItRefJobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    companyName: { type: String, required: true },
    jobType: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    location: { type: String, required: true },
    qualification: { type: String, required: true },
    applicants: [ApplicantSchema], // Embed applicants as subdocuments
    by: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      default: null,
    },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Ensure the model is created only once
const itRefJob = models.itRefJob || model('itRefJob', ItRefJobSchema);

export default itRefJob;
