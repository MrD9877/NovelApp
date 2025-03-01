import dbConnect from "@/lib/MonodbConnet";
import { Explore, IExplore } from "@/schema/genre";
import getCoverByGenre from "../utilities/getCoverByGenre";
import { Category } from "@/app/(routes)/explore/page";

export async function GET() {
  await dbConnect();
  try {
    const genres: IExplore[] | null = await Explore.find();
    const data: Array<Category> = [];
    for (let i = 0; i < genres[0].genre.length; i++) {
      const genre = genres[0].genre[i];
      const covers = await getCoverByGenre(genre.charAt(0) + genre.slice(1).toLowerCase());
      if (covers && covers?.length > 0) {
        data.push({ src: covers[0].cover, genre });
      } else {
        data.push({ src: "dfdd98716e0cd0a9b56d796ef20f27f0d5b182960427ba3e2fbd46815d676587", genre });
      }
    }
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
