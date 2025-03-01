export const fetchLastRead = async (novelId: string, chapter: string | number) => {
  try {
    const res = await fetch(`/api/updateLastRead?novelId=${novelId}&chapter=${chapter}`);
    if (res.status !== 200) throw Error("error");
    else return true;
  } catch (err) {
    throw Error(err);
  }
};
