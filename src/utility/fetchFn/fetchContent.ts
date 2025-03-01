import { ChapterType } from "@/schema/chapter";

export const fetchContent = async (novelId: string, chapter: string | number) => {
  try {
    const res = await fetch(`/api/chapter?novelId=${novelId}&chapter=${chapter}`);
    if (res.status === 200) {
      const data: ChapterType = await res.json();
      return data;
    } else {
      const data = await res.json();
      throw Error(data.msg);
    }
  } catch (err) {
    throw Error(err);
  }
};
