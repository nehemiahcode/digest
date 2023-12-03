import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    description: {
      type: String,
    },
    gestImage: {
      type: String,
    },
    userId: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Posts = mongoose.models.Posts || mongoose.model("Posts", PostSchema);

export default Posts;
