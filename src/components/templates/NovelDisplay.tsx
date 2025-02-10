"use client";
import ContentLink from "@/components/templates/ContentLink";
import OverView from "@/components/templates/OverView";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import NovelInfoSkeleton from "../skeletons/NovelInfoSkeleton";

export interface NovelInfo {
  overview: string[];
  totalChapters: number;
  lastUpdate: string;
  cover: string;
  name: string;
  author: string;
  novelId: string;
  genres: string[];
  tags: string;
  status: string;
}

interface NovelDisplayComponent {
  novelId: string;
}

export default function NovelDisplay({ novelId }: NovelDisplayComponent) {
  const [novelInfo, setNovelInfo] = useState<NovelInfo>();

  const fetchInfo = useCallback(async () => {
    try {
      const res = await fetch(`/api/novelInfo?novelId=${novelId}`);
      const info = await res.json();
      setNovelInfo(info);
    } catch {}
  }, [novelId]);

  useEffect(() => {
    fetchInfo();
  }, [novelId, fetchInfo]);

  if (!novelInfo)
    return (
      <>
        <div className="h-screen w-fit mx-auto">
          <NovelInfoSkeleton />
        </div>
      </>
    );
  return (
    <div>
      {/* cover  */}
      <div className="w-fit mx-auto my-3 rounded-lg">
        <Image width={200} height={200} src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/${novelInfo.cover}`} alt="Novel cover" />
      </div>
      {/* titile  */}
      <div className=" w-fit px-10 text-lg font-bold text-start">
        <h2>{novelInfo?.name} </h2>
        {/* Author  */}
        <Link href={"/"}>
          <span className="flex align-bottom mt-4 text-gray-800 underline dark:text-blue-800">{novelInfo?.author}</span>
        </Link>
      </div>
      <hr className="w-[80vw] mx-auto my-4 border-sidebar" />
      <div className="px-4 mx-auto">
        <div className=" bg-themeSuperLight dark:bg-themeDarkBg rounded-xl">
          {novelInfo.overview && <OverView overview={novelInfo.overview} />}
          <hr className="w-[80vw] mx-auto my-1 border-sidebar" />
          {/* to do prams  */}
          <ContentLink novelInfo={novelInfo} />
        </div>
      </div>
    </div>
  );
}
