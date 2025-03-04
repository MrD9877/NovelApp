import dbConnect from "@/lib/MonodbConnet";
import { Comments, IComment } from "@/schema/comments";
export interface GetLike {
  isLiked: boolean;
}
interface GetComments extends IComment, GetLike {}
async function getComments({ page, novelId, chapter, sort, email }: { page: number; novelId: string; chapter: number; sort: "liked" | "newest"; email: string }) {
  const limit = 10;
  const skip = (page - 1) * limit;
  const comments: GetComments[] = await Comments.aggregate([
    { $match: { novelId, chapter } }, // Filter comments
    { $addFields: { likeCount: { $size: "$like" } } }, // Add a new field with like count
    { $sort: sort === "liked" ? { likeCount: -1 } : { createdAt: -1 } }, // Sort based on likeCount or updatedAt
    { $skip: skip },
    { $limit: limit },
  ]);
  const totalComments = await Comments.countDocuments({ novelId, chapter });
  for (let i = 0; i < comments.length; i++) {
    const index = comments[i].like.findIndex((val) => val.email === email);
    if (index === -1) comments[i].isLiked = false;
    else comments[i].isLiked = true;
  }
  return { comments, totalComments, maxPage: Math.ceil(totalComments / limit) };
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const { novelId, chapter, sort, email } = body;
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  if (!novelId || !chapter) return new Response(JSON.stringify({ msg: "Missing Params" }), { status: 400 });
  try {
    const comments = await getComments({ page, novelId, chapter: Number(chapter), sort, email });
    if (comments) return new Response(JSON.stringify({ ...comments }), { status: 200 });
    return new Response(JSON.stringify({ msg: "No comments Found" }), { status: 404 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
