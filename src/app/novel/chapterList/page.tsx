import ChapterListSkeleton from "@/components/skeletons/ChapterListSkeleton";
import ChapterListNav from "@/components/templates/ChapterListNav";
import ListChapters, { Index } from "@/components/templates/ListChapters";
import { getNovelIndex } from "@/utility/getNovelIndex";
import { Suspense } from "react";

export default async function ChapterListPage() {
  const listPromise: Promise<Array<Index>> = getNovelIndex();
  return (
    <div className="bg-white dark:text-white  dark:bg-themeSuperDark min-h-[100vh] pb-10">
      <Suspense
        fallback={
          <>
            <ChapterListNav listOrder={true} setListOrder={null} />
            <ChapterListSkeleton />
          </>
        }
      >
        <ListChapters listPromise={listPromise} />
      </Suspense>
    </div>
  );
}
