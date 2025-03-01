import dbConnect from "@/lib/MonodbConnet";
import { User, UserType } from "@/schema/user";
import { cookies } from "next/headers";
import { authUser } from "../utilities/authUser";
import { INovel, Novel } from "@/schema/novel";
import { Comments } from "@/schema/comments";
import { CommentType } from "@/validators/comment";
export type InnerType<T> = T extends Array<infer U> ? U : never;

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { novelId, comment }: { novelId: string; comment: string } = body;
  const chapter = Number(body.chapter);
  try {
    const checkNovel: INovel | null = await Novel.findOne({ novelId });
    if (!checkNovel) return new Response(JSON.stringify({ msg: "No novel found" }), { status: 400 });
    const userData = await authUser(cookieStore);
    if (userData && userData.email) {
      const user: UserType = await User.findOne({ email: userData.email });
      if (!user) throw Error("401");
      const saveComment: InnerType<CommentType> = { novelId, chapter, comment, email: user.email, userName: user.userName };
      const newComment = new Comments(saveComment);
      await newComment.save();
      return new Response(JSON.stringify({ msg: "added" }), { status: 200 });
    }
    return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
  } catch (err) {
    return new Response(JSON.stringify({ msg: (err as Error).message }), { status: 500 });
  }
}
