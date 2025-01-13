import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
  title: string;
  desc: string;
  bg: string;
  icon: string;
}

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  bg: { type: String, required: true },
  icon: { type: String, required: true },
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);