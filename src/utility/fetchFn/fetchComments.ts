import { CommentsSchema } from "@/validators/comment";
type CustomError = { msg: string };

export const fetchComments = async ({ novelId, chapter }: { novelId: string; chapter: string | number }) => {
  const res = await fetch(`/api/getComments?novelId=${novelId}&chapter=${chapter}`);
  const data = await res.json();
  if (res.status === 200) {
    return CommentsSchema.parse(data);
  } else {
    throw Error((data as CustomError).msg);
  }
};
