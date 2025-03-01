import dbConnect from "@/lib/MonodbConnet";
import { Comments } from "@/schema/comments";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url); // Get query parameters
  const novelId = searchParams.get("novelId");
  const chapter = searchParams.get("chapter");
  if (!novelId || !chapter) return new Response(JSON.stringify({ msg: "Missing Params" }), { status: 400 });
  try {
    const comments = await Comments.find({ novelId, chapter });
    if (comments) return new Response(JSON.stringify([...comments]), { status: 200 });
    else return new Response(JSON.stringify({ msg: "No comments Found" }), { status: 404 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
