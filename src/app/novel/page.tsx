import NovelInfoSkeleton from "@/components/skeletons/NovelInfoSkeleton";
import NovelDisplay, { NovelInfo } from "@/components/templates/NovelDisplay";
import NavbarMain from "@/components/templates/NavbarMain";
import { getNovelInfo } from "@/utility/backEndFnc/getNovelInfo";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";

type paramType =
  | {
      novelId: string;
    }
  | undefined;

interface NovelPage {
  searchParams: Promise<paramType>;
}

export default async function NovelPage({ searchParams }: NovelPage) {
  const params: paramType = await searchParams;
  if (!params) redirect("/notFound");
  const infoPromise: Promise<NovelInfo | null> = getNovelInfo(params.novelId);
  return (
    <div>
      <NavbarMain />
      <Suspense fallback={<NovelInfoSkeleton />}>
        <NovelDisplay infoPromise={infoPromise} />
      </Suspense>
    </div>
  );
}
