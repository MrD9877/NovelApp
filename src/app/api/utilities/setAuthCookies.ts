import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { tokenGenerator } from "./tokenGenerators";

export async function setAuthCookies(email: string, userName: string, cookieStore: ReadonlyRequestCookies) {
  const accessToken = await tokenGenerator({ email, userName }, "1d");
  const refreshToken = await tokenGenerator({ email, userName }, "50d");
  if (!accessToken && !refreshToken) return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  if (accessToken && refreshToken) {
    cookieStore.set("accessToken", accessToken);
    cookieStore.set("refreshToken", refreshToken);
  }
  return new Response(JSON.stringify({ msg: "welcome" }), { status: 200 });
}
