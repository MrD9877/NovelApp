import dbConnect from "@/lib/MonodbConnet";
import { User, UserType } from "@/schema/user";
import { cookies } from "next/headers";
import { verifyToken } from "../utilities/tokenGenerators";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { novelId } = body;
  try {
    const checkNovel = await User.findOne({ novelId });
    if (checkNovel) return new Response(JSON.stringify({ msg: "No novel found" }), { status: 400 });
    const accessToken = cookieStore.get("accessToken");
    if (accessToken) {
      const userData = await verifyToken(accessToken.value);
      if (userData.email) {
        const user: UserType = await User.findOne({ email: userData.email });
        const filter = user.library.findIndex((novel) => novel.novelId === novelId);
        if (filter !== -1) {
          await User.updateOne({ email: userData.email }, { $pull: { library: { novelId } } });
          return new Response(JSON.stringify({ msg: "removed" }), { status: 200 });
        } else {
          await User.updateOne({ email: userData.email }, { $push: { library: { novelId } } });
          return new Response(JSON.stringify({ msg: "added" }), { status: 200 });
        }
      }
    }
    return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
