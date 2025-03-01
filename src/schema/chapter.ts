import mongoose, { Model } from "mongoose";
import { Document } from "mongoose";
const { Schema } = mongoose;

export type ChapterType = {
  chapterNumber: number;
  title: string;
  content: string[];
  chapterId: string;
  novelId: string;
};
export interface IChapter extends ChapterType, Document {}
const chapterSchema = new Schema<IChapter>(
  {
    novelId: {
      type: Schema.Types.String,
      required: true,
    },
    chapterId: {
      type: Schema.Types.String,
      required: true,
    },
    content: [
      {
        type: Schema.Types.String,
        required: true,
      },
    ],
    title: {
      type: Schema.Types.String,
      required: true,
    },
    chapterNumber: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ChapterModel: Model<IChapter> = mongoose.models.Chapter || mongoose.model<IChapter>("Chapter", chapterSchema);
export { ChapterModel as Chapter };
