import { Novel } from "@/schema/novel";

const getCoverByGenre = async (genre: string) => {
  try {
    const novels = await Novel.find({ genres: { $in: [genre] } }).select("cover");
    return novels;
  } catch (err) {
    console.log((err as Error).message);
    return null;
  }
};

export default getCoverByGenre;
