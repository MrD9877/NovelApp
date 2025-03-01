import useNovelInfo from "@/hooks/useNovelInfo";
import { fetchComments } from "@/utility/fetchFn/fetchComments";
import { useQuery } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CommentSection({ novelId, chapter, setDisplayCommets }: { novelId: string; chapter: string | number; setDisplayCommets: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [tabValue, setTab] = useState<"newest" | "liked">("newest");
  const novelQuery = useNovelInfo(novelId);
  const router = useRouter();
  const novelInfo = novelQuery.data;
  const commentQuery = useQuery({
    queryKey: ["comments", novelId, chapter],
    queryFn: async () => await fetchComments({ novelId, chapter }),
  });

  if (commentQuery.isLoading) <>Loading...</>;
  return (
    <div className="bg-black absolute z-30 m-h-screen w-screen top-0 mb-4">
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

      <div className="shadow-lg w-[94vw] h-12 mx-auto rounded-xl flex justify-between   items-center px-8 bg-white">
        <div className="font-semibold">{commentQuery.data.length}Comments</div>
        <Tabs onValueChange={(value: "newest" | "liked") => setTab(value)} defaultValue="newest">
          <TabsList>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="liked">Liked</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="w-[94vw] min-h-[80vh] bg-white my-4 mx-auto rounded-xl">
        <Tabs value={tabValue} className="w-[400px]">
          <TabsContent value="newest">Make changes to your account here.</TabsContent>
          <TabsContent value="liked">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
