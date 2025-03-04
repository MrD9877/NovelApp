export const fetchLikeComment = async (id: string) => {
  try {
    const res = await fetch(`/api/likeComment?id=${id}`, { method: "PUT" });
    if (res.status !== 200) throw Error("");
    else return true;
  } catch {
    return false;
  }
};
