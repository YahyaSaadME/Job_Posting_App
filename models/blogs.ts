import { Schema, model, Document } from "mongoose";

interface ITableOfContent {
  title: string;
  description: string;
}

interface IBlog extends Document {
  title: string;
  author: string;
  content: string;
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

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
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

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
