import { Schema, model, models, Document } from "mongoose";

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
  thumbnail: string;
  tags: string[];
  likes:number;
  tableOfContent: ITableOfContent[];
}

const tableOfContentSchema = new Schema<ITableOfContent>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  videoLink: {
    type: String,
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
    thumbnail: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    tableOfContent: {
      type: [tableOfContentSchema],
    },
    likes:{type:Number,default:0},
  },
  {
    timestamps: true,
  }
);

const Blog = models.Blog || model<IBlog>("Blog", blogSchema);

export default Blog;
