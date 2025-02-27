import dbConnect from "@/lib/MonodbConnet";
import getCoverByGenre from "../utilities/getCoverByGenre";

export async function GET() {
  await dbConnect();
  try {
    const data = await getCoverByGenre("Action");
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
