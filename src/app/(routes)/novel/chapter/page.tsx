import ReadBookComponent from "@/components/templates/ReadBookComponent";
import React from "react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
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

  return (
    <div>
      <Suspense fallback={<LoadingSpinner width="100vw" height="50vh" />}>
        <ReadBookComponent searchParams={params} />
      </Suspense>
    </div>
  );
}
