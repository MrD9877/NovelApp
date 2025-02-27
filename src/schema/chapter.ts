import mongoose from "mongoose";
const { Schema } = mongoose;

export type ChapterType = {
  chapterNumber: number;
  title: string;
  content: string[];
  chapterId: string;
  novelId: string;
};

const chapterSchema = new Schema(
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

const ChapterModel = mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);
export { ChapterModel as Chapter };
