import { fetchComments } from "@/utility/fetchFn/fetchComments";
import { keepPreviousData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import ErrorPage from "./ErrorPage";
import CommentCard from "../cards/CommetCard";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/userSlice";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CommentNovelInfo from "./CommentNovelInfo";
import CommentTabNav from "./CommentTabNav";
import CommentBoxNav from "./CommentBoxNav";

export default function CommentSection({ novelId, chapter, setDisplayCommets }: { novelId: string; chapter: string | number; setDisplayCommets: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [tabValue, setTab] = useState<"newest" | "liked">("newest");
  const email = useSelector((state: StoreState) => state.email);
  const { ref, inView } = useInView();
  const queryClinet = useQueryClient();

  const commentQuery = useInfiniteQuery({
    queryKey: ["comments", novelId, chapter, email, tabValue],
    queryFn: async ({ pageParam }) => await fetchComments({ novelId, chapter, tabValue, email, pageParam }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const totalComments = commentQuery.data?.pages[0]?.totalComments;

  const invalidateComment = () => {
    queryClinet.invalidateQueries({ queryKey: ["comments", novelId, chapter, email] });
  };

  useEffect(() => {
    if (inView) {
      commentQuery.fetchNextPage();
    }
  }, [inView, commentQuery]);
  return (
    <div className="h-screen w-screen m-0 p-0">
      <div className="bg-black absolute z-30 min-h-screen w-screen top-0 mb-4 overflow-y-scroll">
        <div className="text-white flex justify-start px-4 gap-5 font-bold text-xl h-12 items-center">
          <MoveLeft strokeWidth={"3px"} height={40} onClick={() => setDisplayCommets(false)} />
          <span>Comment</span>
        </div>

        <CommentNovelInfo novelId={novelId} />
        <CommentTabNav setTab={setTab} totalComments={totalComments} tabValue={tabValue} />

        <div className="w-[94vw] min-h-[80vh] bg-white my-4 mx-auto rounded-xl mb-10">
          {commentQuery.isError ? (
            <ErrorPage message={commentQuery.error.message} />
          ) : commentQuery.isLoading ? (
            <>Loading...</>
          ) : (
            commentQuery.data.pages.map((pageData, index) => {
              return (
                <div key={index}>
                  {Array.isArray(pageData.comments) &&
                    pageData.comments.map((comment) => {
                      return (
                        <div key={comment._id}>
                          <CommentCard comment={comment} invalidateComment={invalidateComment} />
                        </div>
                      );
                    })}
                </div>
              );
            })
          )}
        </div>
        <div ref={ref}></div>
      </div>
      <CommentBoxNav setTab={setTab} novelId={novelId} chapter={chapter} invalidateComment={invalidateComment} />
    </div>
  );
}
