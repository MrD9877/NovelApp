import { InnerType } from "@/app/api/addComment/route";
import { CommentType } from "@/validators/comment";
import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;
interface IComment extends Document, Omit<InnerType<CommentType>, "_id" | "createdAt"> {}

const commentsSchema = new Schema<IComment>(
  {
    novelId: {
      type: Schema.Types.String,
      required: true,
    },
    chapter: {
      type: Schema.Types.Number,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    userName: {
      type: Schema.Types.String,
      required: true,
    },
    comment: {
      type: Schema.Types.String,
      required: true,
    },
    like: [
      {
        email: {
          type: Schema.Types.String,
        },
      },
    ],
    replies: [{ type: Schema.Types.String }],
  },
  { timestamps: true }
);

const CommentsModel: Model<IComment> = mongoose.models.Comments || mongoose.model<IComment>("Comments", commentsSchema);
export { CommentsModel as Comments };
