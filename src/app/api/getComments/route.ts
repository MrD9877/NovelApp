import dbConnect from "@/lib/MonodbConnet";
import { Comments } from "@/schema/comments";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url); // Get query parameters
  const novelId = searchParams.get("novelId");
  const chapter = searchParams.get("chapter");
  const sort = searchParams.get("sort");
  if (!novelId || !chapter) return new Response(JSON.stringify({ msg: "Missing Params" }), { status: 400 });
  try {
    if (sort === "liked") {
      const likeSort = await Comments.find({ novelId, chapter }).sort({ "like.length": -1 });
      if (likeSort) return new Response(JSON.stringify([...likeSort]), { status: 200 });
    } else {
      const timeSort = await Comments.find({ novelId, chapter }).sort({ updatedAt: -1 });
      if (timeSort) return new Response(JSON.stringify([...timeSort]), { status: 200 });
    }
    return new Response(JSON.stringify({ msg: "No comments Found" }), { status: 404 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
