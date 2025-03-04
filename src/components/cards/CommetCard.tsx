import { InnerType } from "@/app/api/addComment/route";
import { CommentType } from "@/validators/comment";
import { ThumbsUp } from "lucide-react";
import React from "react";
import { useState } from "react";
import { PopCommentBox } from "../templates/CommentBox";
import { convertTime } from "@/utility/convertTime";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/userSlice";
import useLikeComment from "@/hooks/useLikeComment";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchReply } from "@/utility/fetchFn/fetchReply";

export default function CommentCard({ comment, invalidateComment }: { comment: InnerType<CommentType>; invalidateComment: () => void }) {
  const [replyVisible, setVisible] = useState(false);
  const email = useSelector((state: StoreState) => state.email);
  const queryClinet = useQueryClient();
  const showReplies = () => {
    setVisible(true);
  };
  const replyQuery = useInfiniteQuery({
    queryKey: ["reply", comment._id],
    queryFn: async ({ pageParam }) => await fetchReply(comment._id, email, pageParam),
    enabled: replyVisible,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const invalidateReply = (id: string) => {
    queryClinet.invalidateQueries({ queryKey: ["reply", id] });
  };
  const { likeCommentFn, isLiked, likeCount, likeReplyFn } = useLikeComment(email, comment, replyQuery?.data?.pages, invalidateComment, invalidateReply);

  return (
    <>
      <section className="bg-white dark:bg-gray-900   antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />
                  {comment.userName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time title={convertTime(comment.createdAt)}>{convertTime(comment.createdAt)}</time>
                </p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.comment}</p>
            <div className="flex items-center mt-4 space-x-4 justify-end">
              <PopCommentBox action={{ type: "reply", payload: { id: comment._id, invalidateReply } }}>
                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                  <svg className="mr-1.5 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                  </svg>
                  Reply{" "}
                </button>
              </PopCommentBox>
              <button onClick={likeCommentFn} style={{ color: isLiked[comment._id] ? "blue" : "" }} type="button" className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                <ThumbsUp fill={isLiked[comment._id] ? "blue" : "none"} />
              </button>
              <div style={{ color: isLiked[comment._id] ? "blue" : "" }} className="text-gray-500 dark:text-gray-400 my-4">
                {(likeCount[comment._id] ? likeCount[comment._id] : 0) + (isLiked[comment._id] ? 1 : 0)}
              </div>
            </div>
            {!replyVisible && comment.replies.length > 0 && (
              <div onClick={showReplies} className="text-gray-500 dark:text-gray-400 my-4">
                ─── View {comment.replies.length} Replies
              </div>
            )}
          </article>
          {replyVisible && replyQuery.isError ? (
            <>{replyQuery.error.message}</>
          ) : replyQuery.isLoading ? (
            <>Loading...</>
          ) : (
            replyQuery.data?.pages.map((page) => {
              return (
                <>
                  {page.replies?.map((reply) => {
                    return (
                      <article key={reply.replyId} className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos" />
                              {reply.userName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <time title={convertTime(reply.createdAt)}>{convertTime(comment.createdAt)}</time>
                            </p>
                          </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">{reply.comment}</p>
                        <div className="flex items-center mt-4 space-x-4">
                          <button onClick={() => likeReplyFn(reply.replyId)} style={{ color: isLiked[reply.replyId] ? "blue" : "" }} type="button" className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <ThumbsUp fill={isLiked[reply.replyId] ? "blue" : "none"} />
                          </button>
                          <div style={{ color: isLiked[reply.replyId] ? "blue" : "" }} className="text-gray-500 dark:text-gray-400 my-4">
                            {(likeCount[reply.replyId] ? likeCount[reply.replyId] : 0) + (isLiked[reply.replyId] ? 1 : 0)}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </>
              );
            })
          )}
          {replyQuery.hasNextPage && (
            <div onClick={() => replyQuery.fetchNextPage()} className="text-gray-500 dark:text-gray-400 my-4 ml-6">
              ─── Load More
            </div>
          )}
        </div>
      </section>
      <hr className="text-gray-500 mx-auto w-[70vw]  h-[4px]" />
    </>
  );
}
