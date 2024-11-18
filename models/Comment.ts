import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  { instrumentId: { type: String, required: true },
    userName: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true } },
  { timestamps: true },
);

export default mongoose.model('Comment', commentSchema);
