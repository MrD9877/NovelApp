import { NovelInfoType } from "@/validators/novelInfo";
import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;

interface IndexType {
  chapterId: string;
  updateDate: string;
  title: string;
}
export interface Index {
  index: IndexType[];
}
export interface INovel extends Document, NovelInfoType, Index {}

const novelSchema = new Schema<INovel>(
  {
    novelId: {
      type: Schema.Types.String,
      required: true,
    },
    overview: [
      {
        type: Schema.Types.String,
      },
    ],
    totalChapters: {
      type: Schema.Types.Number,
    },
    genres: [
      {
        type: Schema.Types.String,
      },
    ],
    tags: {
      type: Schema.Types.String,
    },
    lastUpdate: {
      type: Schema.Types.String,
    },
    cover: {
      type: Schema.Types.String,
    },
    name: {
      type: Schema.Types.String,
    },
    author: {
      type: Schema.Types.String,
    },

    status: {
      type: Schema.Types.String,
    },
    index: [
      {
        chapterId: {
          type: Schema.Types.String,
        },
        title: {
          type: Schema.Types.String,
          require: true,
          default: "chapter",
        },
        updateDate: {
          type: Schema.Types.String,
        },
      },
    ],
  },
  { timestamps: true }
);

novelSchema.pre("save", function (next) {
  this.totalChapters = this.index.length;
  next();
});
novelSchema.index({ name: "text", tags: "text", genres: "text" });
const NovelModel: Model<INovel> = mongoose.models.Novel || mongoose.model<INovel>("Novel", novelSchema);
export { NovelModel as Novel };
