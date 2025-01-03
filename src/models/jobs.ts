import { Schema, model, Document,models } from "mongoose";

interface IJob extends Document {
  company: string;
  location: string;
  title: string;
  description: string;
  requirement: string;
  category: string;
  yearsOfExperience: number;
  jobType: string;
  link:string;
  tags:string[];
  by:Schema.Types.ObjectId|null;
  approved:boolean|null;
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
    link:{
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
    tags:[{
      type: String,
    }],
    by:{
      type: Schema.Types.ObjectId,
      default:null
    },
    approved:{type:Boolean,default:null}
  },
  {
    timestamps: true,
  }
);

const Job = models.Job || model<IJob>("Job", jobSchema);
export default Job;
