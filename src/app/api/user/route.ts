import dbConnect from "@/lib/MonodbConnet";
import { User, UserType } from "@/schema/user";
import { cookies } from "next/headers";
import { authUser } from "../utilities/authUser";

export async function GET() {
  await dbConnect();
  const cookieStore = await cookies();
  try {
    const userData = await authUser(cookieStore);
    if (!userData) return new Response(JSON.stringify({ msg: "UnAuthorized" }), { status: 401 });
    const user: UserType = await User.findOne({ email: userData.email });
    if (user) return new Response(JSON.stringify({ userName: user.userName, email: user.email, library: user.library, unlocked: user.unlocked }), { status: 200 });
    else return new Response(JSON.stringify({ msg: "user not found" }), { status: 404 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
