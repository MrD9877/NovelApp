"use client";
import ContentLink from "@/components/templates/ContentLink";
import OverView from "@/components/templates/OverView";
import Image from "next/image";
import Link from "next/link";
import NovelInfoSkeleton from "../skeletons/NovelInfoSkeleton";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import { useRouter } from "next/navigation";
import addNovelToLiberary from "@/utility/addToLibrary";
import useUser from "@/hooks/useUser";
import useNovelLibrary from "@/hooks/useNovelLibrary";

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
  const router = useRouter();
  const { reFetch } = useUser();
  const [isAdded] = useNovelLibrary(novelId);
  const {
    isPending,
    error,
    data: novelInfo,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await fetch(`/api/novelInfo?novelId=${novelId}`);
      const jsonData = await res.json();
      if (res.status !== 200) throw new Error(jsonData.msg || "error");
      return jsonData;
    },
  });

  const handleAddLibrary = async (novelId: string) => {
    await addNovelToLiberary(novelId);
    await reFetch();
  };

  if (isPending)
    return (
      <>
        <div className="h-screen w-fit mx-auto">
          <NovelInfoSkeleton />
        </div>
      </>
    );
  if (error) return <ErrorPage message={error.message} />;
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
        <hr className="w-[80vw] mx-auto my-4 border-sidebar" />

        <div className="bg-themeSuperLight dark:bg-themeDarkBg rounded-xl flex justify-center items-center py-4">
          <div>
            <button className="hover:opacity-65 text-nowrap col-start-4 col-span-4" onClick={() => router.push(`/novel/chapter?novelId=${novelId}&chapter=${1}`)}>
              Read Now
            </button>
          </div>
          <div className="bg-white text-black flex justify-center rounded-sm px-2 py-1 absolute right-10">{isAdded ? <button onClick={() => handleAddLibrary(novelId)}>✔</button> : <button onClick={() => handleAddLibrary(novelId)}>+</button>}</div>
        </div>
      </div>
    </div>
  );
}
