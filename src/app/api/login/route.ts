import dbConnect from "@/lib/MonodbConnet";
import { User } from "@/schema/user";

import { cookies } from "next/headers";
import { verifyPasswordFn } from "../utilities/hashPassword";
import { tokenGenerator } from "../utilities/tokenGenerators";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { email, password } = body;
  try {
    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ msg: "No User Found" }), { status: 400 });
    const verifyPassword = await verifyPasswordFn(password, user.password);
    if (verifyPassword) {
      const accessToken = await tokenGenerator({ email, userName: user.userName }, "1d");
      const refreshToken = await tokenGenerator({ email, userName: user.userName }, "50d");
      cookieStore.set("accessToken", accessToken);
      cookieStore.set("refreshToken", refreshToken);
      return new Response(JSON.stringify({ msg: "welcome" }), { status: 200 });
    }
    return new Response(JSON.stringify({ msg: "UnAuthorized" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
