import dbConnect from "@/lib/MonodbConnet";
import { User, UserType } from "@/schema/user";
import { cookies } from "next/headers";
import { authUser } from "../utilities/authUser";
import { Comments } from "@/schema/comments";
import { UpdateWriteOpResult } from "mongoose";
export type InnerType<T> = T extends Array<infer U> ? U : never;

export async function PUT(request: Request) {
  await dbConnect();
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url); // Get query parameters
  const id = searchParams.get("id");
  try {
    const userData = await authUser(cookieStore);
    if (userData && userData.email) {
      const user: UserType = await User.findOne({ email: userData.email });
      if (!user) throw Error("401");
      const checkforLiked = await Comments.findOne({ _id: id, "like.email": user.email });
      console.log(checkforLiked);
      let editComment: UpdateWriteOpResult;
      const like = { email: user.email };
      if (checkforLiked) editComment = await Comments.updateOne({ _id: id }, { $pull: { like } });
      else editComment = await Comments.updateOne({ _id: id }, { $push: { like } });
      if (editComment.acknowledged) return new Response(JSON.stringify({ msg: checkforLiked ? "removed" : "added" }), { status: 200 });
      else throw Error("error");
    }
    return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: (err as Error).message }), { status: 500 });
  }
}
