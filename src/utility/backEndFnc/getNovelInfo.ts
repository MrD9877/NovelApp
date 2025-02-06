import { NovelInfo } from "@/components/templates/NovelDisplay";

export const getNovelInfo = async (novelId: string | null | undefined): Promise<NovelInfo | null> => {
  if (!novelId) return null;
  const promise = new Promise((ress) => {
    setTimeout(() => {
      ress("d");
    }, 1000);
  });
  const arr = {
    overview: "Loading...",
    totalChapters: 99,
    lastUpdate: new Date(),
    cover: "String",
    title: "String this is a longer Titile sjcnasovcdkjvnkj ",
    author: "String",
    novelId: "Dvsdvds",
  };
  await promise;
  return arr;
};
