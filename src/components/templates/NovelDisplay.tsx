"use client";
import ContentLink from "@/components/templates/ContentLink";
import OverView from "@/components/templates/OverView";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
export interface NovelInfo {
  overview: string;
  totalChapters: number;
  lastUpdate: Date;
  cover: string;
  title: string;
  author: string;
  novelId: string;
}
interface NovelDisplayComponent {
  infoPromise: Promise<NovelInfo | null>;
}

export default function NovelDisplay({ infoPromise }: NovelDisplayComponent) {
  const novelInfo = use(infoPromise);
  if (!novelInfo)
    return (
      <>
        <div className="h-screen w-fit mx-auto">No Such Book If found Try again</div>
      </>
    );
  return (
    <div>
      {/* cover  */}
      <div className="w-fit mx-auto my-3 rounded-lg">
        <Image width={200} height={200} src="/images/bookCover.png" alt="Novel cover" />
      </div>
      {/* titile  */}
      <div className=" w-fit px-10 text-lg font-bold text-start">
        <h2>{novelInfo?.title} </h2>
        {/* Author  */}
        <Link href={"/"}>
          <span className="flex align-bottom mt-4 text-gray-800 underline dark:text-blue-800">{novelInfo?.author}</span>
        </Link>
      </div>
      <hr className="w-[80vw] mx-auto my-4 border-sidebar" />
      <div className="px-4 mx-auto">
        <div className=" bg-themeSuperLight dark:bg-themeDarkBg rounded-xl">
          <OverView overview={novelInfo?.overview} />
          <hr className="w-[80vw] mx-auto my-1 border-sidebar" />
          {/* to do prams  */}
          <ContentLink novelInfo={novelInfo} />
        </div>
      </div>
    </div>
  );
}
