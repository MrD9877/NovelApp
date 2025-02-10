import dbConnect from "@/lib/MonodbConnet";
import { Novel, NovelInfoBackend } from "@/schema/novel";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url); // Get query parameters
  const novelId = searchParams.get("novelId");
  try {
    const novel: Omit<NovelInfoBackend, "index"> | null | undefined = await Novel.findOne({ novelId }, { index: 0 });
    if (novel) {
      return new Response(JSON.stringify(novel), { status: 200 });
    } else {
      return new Response(JSON.stringify({ msg: "No such novel Found" }), { status: 400 });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
