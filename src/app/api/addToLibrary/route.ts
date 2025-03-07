import dbConnect from "@/lib/MonodbConnet";
import { IUser, User } from "@/schema/user";
import { cookies } from "next/headers";
import { authUser } from "../utilities/authUser";
import { Library } from "@/validators/library";
import { INovel, Novel } from "@/schema/novel";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { novelId } = body;
  try {
    const checkNovel: INovel = await Novel.findOne({ novelId });
    if (!checkNovel) return new Response(JSON.stringify({ msg: "No novel found" }), { status: 400 });
    const userData = await authUser(cookieStore);
    if (userData && userData.email) {
      const user: IUser = await User.findOne({ email: userData.email });
      const filter = user.library.findIndex((novel) => novel.novelId === novelId);
      if (filter !== -1) {
        await User.updateOne({ email: userData.email }, { $pull: { library: { novelId } } });
        return new Response(JSON.stringify({ msg: "removed" }), { status: 200 });
      } else {
        const library: Required<Library> = { novelId: novelId, name: checkNovel.name, lastRead: 1, totalChapters: checkNovel.totalChapters, cover: checkNovel.cover };
        await User.updateOne({ email: userData.email }, { $push: { library } });
        return new Response(JSON.stringify({ msg: "added" }), { status: 200 });
      }
    }
    return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
