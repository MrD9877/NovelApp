import dbConnect from "@/lib/MonodbConnet";
import { IUser, User } from "@/schema/user";

import { cookies } from "next/headers";
import { verifyPasswordFn } from "../utilities/hashPassword";
import { setAuthCookies } from "../utilities/setAuthCookies";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { password } = body;
  try {
    const email = body.email.trim().toLowerCase();
    const user: IUser = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ msg: "No User Found" }), { status: 400 });
    const verifyPassword = await verifyPasswordFn(password, user.password);
    if (verifyPassword) {
      const res = await setAuthCookies(email, user.userName, cookieStore);
      return res;
    }
    return new Response(JSON.stringify({ msg: "UnAuthorized" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
