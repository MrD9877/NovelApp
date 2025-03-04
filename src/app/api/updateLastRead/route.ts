import dbConnect from "@/lib/MonodbConnet";
import { User, UserType } from "@/schema/user";
import { cookies } from "next/headers";
import { authUser } from "../utilities/authUser";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url); // Get query parameters
  const novelId = searchParams.get("novelId");
  const chapterNumber = searchParams.get("chapter");
  const cookieStore = await cookies();
  try {
    const userData = await authUser(cookieStore);
    if (userData && userData.email) {
      const user: UserType = await User.findOne({ email: userData.email });
      const filter = user.library.findIndex((novel) => novel.novelId === novelId);
      if (filter === -1) {
        return new Response(JSON.stringify({ msg: "No such book in library" }), { status: 400 });
      } else {
        await User.updateOne({ email: userData.email, "library.novelId": novelId }, { $set: { "library.$.lastRead": chapterNumber } });
        return new Response(JSON.stringify({ msg: "added" }), { status: 200 });
      }
    }
    return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
