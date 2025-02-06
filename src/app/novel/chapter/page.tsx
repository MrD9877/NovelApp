import ReadBookComponent from "@/components/templates/ReadBookComponent";
import React from "react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getContent } from "@/utility/backEndFnc/getContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export type ChapterParamType =
  | {
      novelId: string;
      chapter: string;
    }
  | undefined;

interface ChatperPage {
  searchParams: Promise<ChapterParamType>;
}
export default async function NovelChapterPage({ searchParams }: ChatperPage) {
  const params = await searchParams;
  if (!params) return redirect("/notFound");

  const chapterDataPromise = getContent(params.novelId, Number(params.chapter));

  return (
    <div>
      <Suspense fallback={<LoadingSpinner width="100vw" height="50vh" />}>
        <ReadBookComponent chapterDataPromise={chapterDataPromise} searchParams={params} />
      </Suspense>
    </div>
  );
}
