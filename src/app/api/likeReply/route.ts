import dbConnect from "@/lib/MonodbConnet";
import { User, UserType } from "@/schema/user";
import { cookies } from "next/headers";
import { authUser } from "../utilities/authUser";
import { UpdateWriteOpResult } from "mongoose";
import { Reply } from "@/schema/reply";
export type InnerType<T> = T extends Array<infer U> ? U : never;

export async function PUT(request: Request) {
  await dbConnect();
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url); // Get query parameters
  const replyId = searchParams.get("replyId");
  if (!replyId) return new Response(JSON.stringify({ msg: "Missing fields" }), { status: 400 });
  try {
    const userData = await authUser(cookieStore);
    if (userData && userData.email) {
      const user: UserType = await User.findOne({ email: userData.email });
      if (!user) throw Error("401");
      const checkforLiked = await Reply.findOne({ replyId, "like.email": user.email });
      let editComment: UpdateWriteOpResult;
      const like = { email: user.email };
      if (checkforLiked) editComment = await Reply.updateOne({ replyId }, { $pull: { like } });
      else editComment = await Reply.updateOne({ replyId }, { $push: { like } });
      if (editComment.acknowledged) return new Response(JSON.stringify({ msg: checkforLiked ? "removed" : "added" }), { status: 200 });
      else throw Error("error");
    }
    return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: (err as Error).message }), { status: 500 });
  }
}
