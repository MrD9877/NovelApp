import { CommentsSchema, CommentType } from "@/validators/comment";
type CustomError = { msg: string };
type CommentsResponse = {
  comments: CommentType;
  totalComments: number; // ✅ Ensure this is included
  nextPage?: number; // Can be `undefined` if no more pages
};
export const fetchComments = async ({ novelId, chapter, tabValue, email, pageParam }: { novelId: string; chapter: string | number; tabValue: string; email: string; pageParam: number }) => {
  const res = await fetch(`/api/getComments?page=${pageParam}`, { method: "POST", body: JSON.stringify({ novelId, chapter, sort: tabValue, email }) });
  const data = await res.json();
  if (res.status === 200) {
    const result: CommentsResponse = { comments: CommentsSchema.parse(data.comments), totalComments: data.totalComments as number, nextPage: pageParam < data.maxPage ? pageParam + 1 : null };
    return result;
  } else {
    throw Error((data as CustomError).msg);
  }
};
