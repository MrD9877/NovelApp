import { InnerType } from "@/app/api/addComment/route";
import { fetchLikeComment } from "@/utility/fetchFn/fetchLikeComment";
import { fetchLikeReply } from "@/utility/fetchFn/fetchLikeReply";
import { CommentType, ReplyType } from "@/validators/comment";
import { useEffect, useState } from "react";

type ReplyPage = {
  replies: ReplyType;
  totalPages: number;
  nextPage: number;
};

export default function useLikeComment(email: string, comment: InnerType<CommentType>, replies: ReplyPage[] | undefined, invalidateComment: () => void, invalidateReply: (id: string) => void) {
  const [isLiked, setIsLiked] = useState({});
  const [likeCount, setLikeCount] = useState({});
  const likeCommentFn = async () => {
    if (isLiked[comment._id]) setIsLiked({ ...isLiked, [comment._id]: false });
    else setIsLiked({ ...isLiked, [comment._id]: true });
    const likeCommet = await fetchLikeComment(comment._id);
    if (!likeCommet) {
      setIsLiked({ ...isLiked, [comment._id]: false });
    } else {
      invalidateComment();
    }
  };
  const likeReplyFn = async (replyId: string) => {
    if (isLiked[replyId]) setIsLiked({ ...isLiked, [replyId]: false });
    else setIsLiked({ ...isLiked, [replyId]: true });
    const likeCommet = await fetchLikeReply(replyId);
    if (!likeCommet) {
      setIsLiked({ ...isLiked, [replyId]: false });
    } else {
      invalidateReply(comment._id);
    }
  };
  useEffect(() => {
    if (comment.isLiked) {
      setIsLiked((pre) => ({ ...pre, [comment._id]: true }));
      setLikeCount({ [comment._id]: comment.likeCount - 1 });
    } else setLikeCount({ [comment._id]: comment.likeCount });
  }, [comment, email]);

  useEffect(() => {
    if (!replies) return;
    replies.map((page) => {
      page.replies.map((reply) => {
        if (reply.isLiked) {
          setIsLiked((pre) => ({ ...pre, [reply.replyId]: true }));
          setLikeCount({ [reply.replyId]: reply.likeCount - 1 });
        } else setLikeCount({ [reply.replyId]: reply.likeCount });
      });
    });
  }, [replies, email]);

  return { likeCommentFn, isLiked, likeCount, likeReplyFn };
}
