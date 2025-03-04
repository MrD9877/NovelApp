export const fetchLikeReply = async (replyId: string): Promise<boolean> => {
  try {
    const res = await fetch(`/api/likeReply?replyId=${replyId}`, { method: "PUT" });
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
