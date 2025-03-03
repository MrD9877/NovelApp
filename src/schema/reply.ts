import { ReplyType } from "@/validators/comment";
import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;
interface IReply extends Document, Required<ReplyType> {}

const replySchema = new Schema<IReply>(
  {
    replyId: {
      type: Schema.Types.String,
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
  },
  { timestamps: true }
);

const ReplyModel: Model<IReply> = mongoose.models.Reply || mongoose.model<IReply>("Reply", replySchema);
export { ReplyModel as Reply };
