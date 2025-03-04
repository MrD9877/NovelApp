import { ReplySchema } from "@/validators/comment";

export const fetchReply = async (id: string, email: string, pageParam: number) => {
  try {
    const res = await fetch(`/api/getReply?id=${id}&email=${email}&page=${pageParam}`);
    const data = await res.json();
    if (res.status === 200) {
      return { replies: ReplySchema.parse(data.replies), totalPages: data.totalPages as number, nextPage: pageParam < data.totalPages ? pageParam + 1 : null };
    } else {
      throw Error(data.msg);
    }
  } catch (err) {
    throw Error(err.message);
  }
};
