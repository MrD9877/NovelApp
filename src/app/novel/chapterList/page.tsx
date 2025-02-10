import ChapterListSkeleton from "@/components/skeletons/ChapterListSkeleton";
import ChapterListNav from "@/components/templates/ChapterListNav";
import ListChapters from "@/components/templates/ListChapters";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type paramType =
  | {
      novelId: string;
    }
  | undefined;

interface ListPage {
  searchParams: Promise<paramType>;
}

export default async function ChapterListPage({ searchParams }: ListPage) {
  const params: paramType = await searchParams;
  if (!params) redirect("/notFound");
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
        <ListChapters novelId={params.novelId} />
      </Suspense>
    </div>
  );
}
