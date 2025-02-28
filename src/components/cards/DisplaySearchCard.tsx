import React from "react";
import { NovelsData } from "./DisplayContentCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DisplaySearchCard({ data }: { data: NovelsData }) {
  const router = useRouter();
  const goToNovel = (novelId: string) => {
    router.push(`/novel?novelId=${novelId}`);
  };
  return (
    <div className="shadow-2xl pb-5">
      {Array.isArray(data) &&
        data.map((item) => {
          return (
            <div className="hover:opacity-65 flex my-2 gap-4 px-4 " onClick={() => goToNovel(item.novelId)} key={item.novelId}>
              <Image alt="image" src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/${item.cover}`} width={30} height={30} className="rounded-sm" />
              <div>{item.name && item.name.length > 30 ? `${item.name.slice(0, 27)}...` : item.name}</div>
            </div>
          );
        })}
    </div>
  );
}
