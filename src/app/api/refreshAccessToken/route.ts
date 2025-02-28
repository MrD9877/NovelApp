import dbConnect from "@/lib/MonodbConnet";

import { cookies } from "next/headers";
import { tokenGenerator, verifyToken } from "../utilities/tokenGenerators";

export async function POST() {
  await dbConnect();
  const cookieStore = await cookies();
  try {
    const refreshToken = cookieStore.get("refreshToken");
    if (refreshToken.value) {
      const data = await verifyToken(refreshToken.value);
      if (data.email && data.userName) {
        const accessToken = await tokenGenerator({ email: data.email, userName: data.userName }, "1d");
        if (accessToken === "_Error") throw Error("error");
        cookieStore.set("accessToken", accessToken);
        return new Response(JSON.stringify({ msg: "new token generated" }), { status: 201 });
      }
    }
    return new Response(JSON.stringify({ msg: "UnAuthorized" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
