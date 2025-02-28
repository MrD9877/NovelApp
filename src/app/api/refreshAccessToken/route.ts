import dbConnect from "@/lib/MonodbConnet";
import { cookies } from "next/headers";
import { refreshToken } from "../utilities/refreshToken";

export async function POST() {
  await dbConnect();
  const cookieStore = await cookies();
  try {
    const data = await refreshToken(cookieStore);
    if (!data) return new Response(JSON.stringify({ msg: "UnAuthorized" }), { status: 401 });
    return new Response(JSON.stringify({ msg: "new token generated" }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
