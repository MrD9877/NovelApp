import { Library } from "@/validators/library";
import mongoose, { Model, Document } from "mongoose";
const { Schema } = mongoose;

export type Unlocked = {
  novelId: string;
  chapters: number[];
};

export type UserType = {
  userName: string;
  email: string;
  password: string;
  library: Array<Library>;
  unlocked: Array<Unlocked>;
};
export interface IUser extends Document, UserType {}

const userSchema = new Schema<IUser>({
  userName: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
  },
  library: [
    {
      novelId: { type: Schema.Types.String },
      lastRead: {
        type: Schema.Types.Number,
        default: 1,
      },
      cover: { type: Schema.Types.String },
      name: { type: Schema.Types.String },
      totalChapters: { type: Schema.Types.Number },
    },
  ],
  unlocked: [
    {
      novelId: { type: Schema.Types.String },
      chapters: [
        {
          type: Schema.Types.Number,
        },
      ],
    },
  ],
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export { UserModel as User };
