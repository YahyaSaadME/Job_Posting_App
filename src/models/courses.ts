import { Schema, model, Document, models } from "mongoose";

interface ITableOfContent {
  title: string;
  description: string;
  imageLink?: string;
  videoLink?: string;
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
  imageLink: {
    type: String,
    required: false,
  },
  videoLink: {
    type: String,
    required: false,
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

const Course = models.Course || model<ICourse>("Course", courseSchema);
export default Course;
