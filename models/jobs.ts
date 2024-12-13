import { Schema, model, Document } from "mongoose";

interface IJob extends Document {
  company: string;
  location: string;
  title: string;
  description: string;
  requirement: string;
  category: string;
  yearsOfExperience: number;
  jobType: string;
}

const jobSchema = new Schema<IJob>(
  {
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = model<IJob>("Job", jobSchema);

export default Job;
