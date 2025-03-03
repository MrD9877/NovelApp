import dbConnect from "@/lib/MonodbConnet";
import { INovel, Novel } from "@/schema/novel";

async function searchNovel({ query, path }: { query: string; path: string[] }): Promise<Partial<INovel>[] | null | undefined> {
  const result = await Novel.aggregate([
    {
      $search: {
        index: "custom-search",
        text: {
          query: query,
          path: path,
          fuzzy: { maxEdits: 2 },
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        author: 1,
        tags: 1,
        genres: 1,
        cover: 1,
        novelId: 1,
      },
    },
  ]);
  return result;
}

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url); // Get query parameters
  const search = searchParams.get("search");
  const genre = searchParams.get("genre");
  if (!search && !genre) return new Response(JSON.stringify({ msg: "Missing Params" }), { status: 400 });
  try {
    let novels: Partial<INovel>[] | null | undefined;
    if (search) {
      novels = await searchNovel({ path: ["name", "author"], query: search });
    }
    if (genre) {
      novels = await searchNovel({ path: ["genres"], query: genre });
      // novels = await Novel.find({ genres: { $in: [genre] } }).select(["name", "author", "novelId", "cover", "genres", "tags"]);
    }

    return new Response(JSON.stringify({ novels }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
