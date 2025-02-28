import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { novelsSchema } from "@/validators/novels";
import { z } from "zod";

export type NovelsData = z.infer<typeof novelsSchema>;

export function ShowGenreTags({ genres }: { genres: string[] }) {
  const router = useRouter();
  return (
    <div className="flex overflow-scroll gap-3 items-center">
      {Array.isArray(genres) &&
        genres.map((genre, index) => {
          return (
            <div onClick={() => router.push(`/explore/${genre.trim()}`)} key={index} className="px-2 py-1 text-xs text-nowrap rounded-lg bg-themeDarkBg text-white dark:bg-white dark:text-black flex hover:opacity-65">
              {genre}
            </div>
          );
        })}
    </div>
  );
}

export default function DisplayContentCard({ data }: { data: NovelsData }) {
  const router = useRouter();
  const goToNovel = (novelId: string) => {
    router.push(`/novel?novelId=${novelId}`);
  };
  return (
    <div className="px-4">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item) => {
          return (
            <div key={item.novelId} className="flex mx-auto w-fit my-4 gap-2 max-w-[80vw]">
              <Image onClick={() => goToNovel(item.novelId)} src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/${item.cover}`} alt="image" width={90} height={100} className="hover:opacity-65" />
              <div className="flex flex-col align-middle overflow-scroll mt-3">
                <ShowGenreTags genres={item.genres} />
                {/* name  */}
                <div onClick={() => goToNovel(item.novelId)} className="hover:opacity-65">
                  {item.name && item.name.length > 40 ? `${item.name.slice(0, 37)}...` : item.name}
                </div>
                <div onClick={() => router.push(`/explore?search=${item.author}`)} className="text-lg font-bold italic hover:opacity-65">
                  Author: {item.author}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-fit mx-auto my-8 ">No Match Found.</div>
      )}
    </div>
  );
}
