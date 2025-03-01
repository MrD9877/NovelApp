import dbConnect from "@/lib/MonodbConnet";
import { INovel, Novel } from "@/schema/novel";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url); // Get query parameters
  const search = searchParams.get("search");
  const genre = searchParams.get("genre");
  if (!search && !genre) return new Response(JSON.stringify({ msg: "Missing Params" }), { status: 400 });
  try {
    let novels: Partial<INovel>[] | null | undefined;
    if (search) {
      novels = await Novel.aggregate([
        {
          $search: {
            index: "custom-search", // Use the custom index name
            text: {
              query: search,
              path: ["name", "author"],
              fuzzy: { maxEdits: 2 }, // Allows minor typos
            },
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id field (optional)
            name: 1, // Include name
            author: 1, // Include author
            tags: 1,
            genres: 1,
            cover: 1,
            novelId: 1,
          },
        },
      ]);
    }
    if (genre) {
      novels = await Novel.aggregate([
        {
          $search: {
            index: "custom-search", // Use the custom index name
            text: {
              query: genre,
              path: ["genres"],
              fuzzy: { maxEdits: 2 }, // Allows minor typos
            },
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id field (optional)
            name: 1, // Include name
            author: 1, // Include author
            tags: 1,
            genres: 1,
            cover: 1,
            novelId: 1,
          },
        },
      ]);
      // novels = await Novel.find({ genres: { $in: [genre] } }).select(["name", "author", "novelId", "cover", "genres", "tags"]);
    }

    return new Response(JSON.stringify({ novels }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
