import dbConnect from "@/lib/MonodbConnet";
import { User } from "@/schema/user";
import { cookies } from "next/headers";
import { hashPassword } from "../utilities/hashPassword";
import { setAuthCookies } from "../utilities/setAuthCookies";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { password } = body;
  try {
    const email = body.email.trim().toLowerCase();
    const userName = email.split("@")[0];
    const checkUser = await User.findOne({ email });
    if (checkUser) return new Response(JSON.stringify({ msg: "Email Already in use to Register an Account." }), { status: 400 });
    const hashedPassword = await hashPassword(password);
    const user = new User({ email, password: hashedPassword, userName });
    await user.save();
    cookieStore.set("email", JSON.stringify({ email }));
    const res = await setAuthCookies(email, userName, cookieStore);
    return res;
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
