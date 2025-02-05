import NovelInfoSkeleton from "@/components/skeletons/NovelInfoSkeleton";
import NovelDisplay, { NovelInfo } from "@/components/templates/NovelDisplay";
import NavbarMain from "@/components/ui/NavbarMain";
import { getNovelInfo } from "@/utility/getNovelInfo";
import React, { Suspense } from "react";

export default async function NovelPage() {
  const infoPromise: Promise<NovelInfo> = getNovelInfo();
  return (
    <div>
      <NavbarMain />
      <Suspense fallback={<NovelInfoSkeleton />}>
        <NovelDisplay infoPromise={infoPromise} />
      </Suspense>
    </div>
  );
}
