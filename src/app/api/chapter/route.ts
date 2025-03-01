import dbConnect from "@/lib/MonodbConnet";
import { Chapter, IChapter } from "@/schema/chapter";
import { Index, Novel } from "@/schema/novel";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url); // Get query parameters
  const novelId = searchParams.get("novelId");
  const chapterNumber = searchParams.get("chapter");
  if (!novelId || !chapterNumber) return new Response(JSON.stringify({ msg: "Missing Params" }), { status: 400 });
  try {
    const novel: Index | null = await Novel.findOne({ novelId }, { index: 1, _id: 0 });
    if (novel) {
      if (!novel.index[Number(chapterNumber) - 1]) {
        return new Response(JSON.stringify({ msg: "No such chapter Found" }), { status: 400 });
      }
      const chapterId = novel.index[Number(chapterNumber) - 1].chapterId;

      if (!chapterId) {
        return new Response(JSON.stringify({ msg: "No such chapterId" }), { status: 400 });
      }

      const chapter: IChapter | null = await Chapter.findOne({ chapterId });
      if (!chapter) return new Response(JSON.stringify({ msg: "No such chapter Found" }), { status: 400 });

      return new Response(JSON.stringify(chapter), { status: 200 });
    } else {
      return new Response(JSON.stringify({ msg: "No such chapter Found" }), { status: 400 });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
