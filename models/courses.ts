import { Schema, model, Document } from "mongoose";

interface ITableOfContent {
  title: string;
  description: string;
}

interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  tableOfContent: ITableOfContent[];
}

const tableOfContentSchema = new Schema<ITableOfContent>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

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
    tableOfContent: {
      type: [tableOfContentSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = model<ICourse>("Course", courseSchema);

export default Course;
