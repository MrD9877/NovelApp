import React from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useNovelInfo from "@/hooks/useNovelInfo";

export default function CommentNovelInfo({ novelId }) {
  const router = useRouter();
  const novelQuery = useNovelInfo(novelId);
  const novelInfo = novelQuery.data;

  return (
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
  );
}
