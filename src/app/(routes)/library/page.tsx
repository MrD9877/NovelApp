"use client";
import NavbarMain from "@/components/templates/NavbarMain";
import { StoreState } from "@/redux/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function LibraryPage() {
  const library = useSelector((state: StoreState) => state.library);
  console.log(library);
  const router = useRouter();
  const goToNovel = (novelId: string, chapter: number) => {
    router.push(`/novel/chapter?novelId=${novelId}&chapter=${chapter}`);
  };
  return (
    <div>
      <NavbarMain />
      <div className="grid grid-cols-3 gap-4 w-screen my-4">
        {Array.isArray(library) &&
          library.map((novel) => {
            return (
              <div className="hover:opacity-65 flex flex-col justify-center items-center overflow-clip" onClick={() => goToNovel(novel.novelId, novel.lastRead)} key={novel.novelId}>
                <div className="h-[175px]">
                  <Image alt="image" src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/${novel.cover}`} height={175} width={120} layout="intrinsic" className="w-[120px] h-[175px] object-cover rounded-sm " />
                </div>
                <div className="text-sm px-2">{novel.name && novel.name.length > 30 ? `${novel.name.slice(0, 27)}...` : novel.name}</div>
                <div className="text-themeLightBg flex justify-start w-full px-2">
                  {novel.lastRead}/{novel.totalChapters}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
