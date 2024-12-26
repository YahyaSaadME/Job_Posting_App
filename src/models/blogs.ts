import { Schema, model, models,Document } from "mongoose";

interface ITableOfContent {
  title: string;
  description: string;
  imageLink?: string;
  videoLink?: string;
}

interface IBlog extends Document {
  title: string;
  author: string;
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

const Blog = models.Blog || model<IBlog>("Blog", blogSchema);

export default Blog;
