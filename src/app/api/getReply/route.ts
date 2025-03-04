import dbConnect from "@/lib/MonodbConnet";
import { Reply } from "@/schema/reply";
import { ReplyType } from "@/validators/comment";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const limit = 1;
  const skip = (page - 1) * limit;
  try {
    const replies: ReplyType = await Reply.aggregate([
      { $match: { commentId: id } }, // Filter comments
      { $addFields: { likeCount: { $size: "$like" } } }, // Add a new field with like count
      { $sort: { createdAT: -1 } }, // Sort based on likeCount or updatedAt
      { $skip: skip },
      { $limit: limit },
    ]);
    for (let i = 0; i < replies.length; i++) {
      const index = replies[i].like.findIndex((val) => val.email === email);
      replies[i].like = [];
      if (index === -1) replies[i].isLiked = false;
      else replies[i].isLiked = true;
    }
    const totalReplies = await Reply.countDocuments({ commentId: id });
    const totalPages = Math.ceil(totalReplies / limit);
    if (replies) return new Response(JSON.stringify({ replies: [...replies], totalPages }), { status: 200 });

    return new Response(JSON.stringify({ msg: "No comments Found" }), { status: 404 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
