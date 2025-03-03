import { InnerType } from "@/app/api/addComment/route";
import { CommentType } from "@/validators/comment";
import { useEffect, useState } from "react";

export default function useLikeComment(email: string, comment: InnerType<CommentType>) {
  const [isLiked, setLiked] = useState({});
  const [likes, setLikes] = useState(0);
  const likeCommentFn = async () => {
    if (isLiked[comment._id]) setLiked({ ...isLiked, [comment._id]: false });
    else setLiked({ ...isLiked, [comment._id]: true });
  };
  useEffect(() => {
    const like = comment.like;
  }, [comment, email]);
  return { likeCommentFn, isLiked, likes };
}
