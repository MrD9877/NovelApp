import useNovelInfo from "@/hooks/useNovelInfo";
import { fetchComments } from "@/utility/fetchFn/fetchComments";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import ErrorPage from "./ErrorPage";
import { PopCommentBox } from "./CommentBox";
import CommentCard from "../cards/CommetCard";

export default function CommentSection({ novelId, chapter, setDisplayCommets }: { novelId: string; chapter: string | number; setDisplayCommets: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [tabValue, setTab] = useState<"newest" | "liked">("newest");
  const novelQuery = useNovelInfo(novelId);
  const router = useRouter();
  const novelInfo = novelQuery.data;
  const commentQuery = useQuery({
    queryKey: ["comments", novelId, chapter, tabValue],
    queryFn: async () => await fetchComments({ novelId, chapter, tabValue }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
  console.log(commentQuery.data);
  if (commentQuery.isLoading) return <>Loading...</>;
  if (commentQuery.error) return <ErrorPage message={commentQuery.error.message} />;
  return (
    <div className="h-screen w-screen m-0 p-0">
      <div className="bg-black absolute z-30 min-h-screen w-screen top-0 mb-4 overflow-y-scroll">
        <div className="text-white flex justify-start px-4 gap-5 font-bold text-xl h-12 items-center">
          <MoveLeft strokeWidth={"3px"} height={40} onClick={() => setDisplayCommets(false)} />
          <span>Comment</span>
        </div>

        <div className="h-[130px] my-4 mx-4 text-white">
          {novelQuery.isLoading ? (
            <LoadingSpinner width={"100vw"} height={"130px"} />
          ) : (
            <div className="flex gap-4">
              <Image onClick={() => router.push(`/novel?novelId=${novelId}`)} alt="cover" src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/${novelInfo.cover}`} width={90} height={120} className="w-[90px] h-[120] object-cover rounded-md hover:opacity-65" />
              <div className="flex flex-col my-3 gap-2">
                <span>{novelInfo.name.length <= 50 ? novelInfo.name : `${novelInfo.name.slice(0, 47)}...`}</span>
                <span className="text-themeLightText">{novelInfo.author}</span>
              </div>
            </div>
          )}
        </div>

        <div className="shadow-lg w-[94vw] h-12 mx-auto rounded-xl flex justify-between items-center px-8 bg-white">
          <div className="font-semibold">{commentQuery.data.length}Comments</div>
          <Tabs onValueChange={(value: "newest" | "liked") => setTab(value)} defaultValue="newest">
            <TabsList>
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="w-[94vw] min-h-[80vh] bg-white my-4 mx-auto rounded-xl">
          {Array.isArray(commentQuery.data) &&
            commentQuery.data.map((comment) => {
              return (
                <div key={comment._id}>
                  <CommentCard comment={comment} />
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-screen  fixed bottom-2 z-50 ">
        <div className="w-[90vw] mx-auto bg-themeSuperLight bg-opacity-65 h-14 p-2 rounded-lg">
          <div className="h-full w-full bg-white rounded-lg text-themeSuperLight flex justify-center items-center">
            <PopCommentBox action={{ type: "comment", payload: { novelId, chapter } }}>What&apos;s your Thoughts?</PopCommentBox>
          </div>
        </div>
      </div>
    </div>
  );
}
