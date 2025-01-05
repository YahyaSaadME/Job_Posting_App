import { Schema, model, Document, models } from "mongoose";

interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  tags: string[];
  link: string;
  thumbnail: string;
  duration:string;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Course = models.Course || model<ICourse>("Course", courseSchema);
export default Course;