import mongoose from "mongoose";
const { Schema } = mongoose;

export type Library = {
  novelId: string;
  lastRead: number;
};
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

const userSchema = new Schema({
  userName: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
  },
  library: [
    {
      novelId: { type: Schema.Types.String },
      lastRead: {
        type: Schema.Types.Number,
        default: 0,
      },
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

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export { UserModel as User };
