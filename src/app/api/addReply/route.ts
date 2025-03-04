import dbConnect from "@/lib/MonodbConnet";
import { User, UserType } from "@/schema/user";
import { cookies } from "next/headers";
import { authUser } from "../utilities/authUser";
import { Comments } from "@/schema/comments";
import { generateRandom } from "@/utility/random";
import { Reply } from "@/schema/reply";
export type InnerType<T> = T extends Array<infer U> ? U : never;

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { id, comment }: { id: string; comment: string } = body;
  try {
    const userData = await authUser(cookieStore);
    if (userData && userData.email) {
      const user: UserType = await User.findOne({ email: userData.email });
      if (!user) throw Error("401");
      const replyId = generateRandom(32);
      const addReply = await Comments.updateOne({ _id: id }, { $push: { replies: replyId } });
      const newReply = new Reply({ userName: user.userName, email: user.email, comment: comment, replyId, commentId: id });
      await newReply.save();
      if (addReply.acknowledged) return new Response(JSON.stringify({ msg: "added" }), { status: 200 });
      else throw Error("Not acknowledged");
    }
    return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: (err as Error).message }), { status: 500 });
  }
}
