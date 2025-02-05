export const getNovelInfo = async () => {
  console.log("server");
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
    title: "String",
    author: "String",
    novelId: "Dvsdvds",
  };
  await promise;
  return arr;
};
