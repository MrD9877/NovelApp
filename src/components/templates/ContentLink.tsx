import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getDisplayTime } from "@/utility/converTime";
import { NovelInfo } from "./NovelDisplay";
interface ContentLinkComponent {
  novelInfo: NovelInfo;
  className?: string;
}

export default function ContentLink({ novelInfo, className }: ContentLinkComponent) {
  const { novelId, totalChapters } = novelInfo;
  return (
    <div className={`mx-auto p-4 ${className}`}>
      <Link href={`/novel/chapterList?novelId=${novelId}`}>
        <button className=" flex justify-between items-center w-full">
          <div className="flex flex-col text-lg text-start">
            {totalChapters} Chapters
            <div className="text-sidebar dark:text-themeLightText text-xs">Latest Update {getDisplayTime(novelInfo.lastUpdate)}</div>
          </div>
          <div>
            <ChevronRight />
          </div>
        </button>
      </Link>
    </div>
  );
}
