"use client";

import ErrorPage from "@/components/templates/ErrorPage";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { ErrorResponse } from "../page";
import { z } from "zod";
import Image from "next/image";
import { useEffect } from "react";

export function ShowGenreTags({ genres }: { genres: string[] }) {
  const router = useRouter();
  return (
    <div className="flex overflow-scroll gap-3 items-center">
      {genres.map((genre) => {
        return (
          <div onClick={() => router.push(`/explore/${genre.trim()}`)} key={genre} className="px-2 py-1 text-xs text-nowrap rounded-lg bg-themeDarkBg text-white dark:bg-white dark:text-black flex hover:opacity-65">
            {genre}
          </div>
        );
      })}
    </div>
  );
}

export default function ExporeGenre() {
  const pathname = usePathname(); // Get the current path
  const genre = pathname.split("/").pop();
  const router = useRouter();

  const novel = z.object({
    novelId: z.string(),
    name: z.string(),
    tags: z.string(),
    author: z.string(),
    cover: z.string(),
    genres: z.array(z.string()),
  });

  const novelsSchema = z.array(novel);

  const { isPending, data, error } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      if (!genre) return null;
      const res = await fetch(`/api/searchNovel?genre=${genre.charAt(0) + genre.slice(1).toLowerCase()}`);

      if (res.status !== 200) {
        const jsonData: ErrorResponse = await res.json();
        throw new Error(jsonData.msg || "error");
      } else {
        const { novels } = await res.json();

        return novelsSchema.parse(novels);
      }
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  const goToNovel = (novelId: string) => {
    router.push(`/novel?novelId=${novelId}`);
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className="px-4">
      {Array.isArray(data) &&
        data.map((item) => {
          return (
            <div key={item.name} className="flex mx-auto w-fit my-4 gap-2 max-w-[80vw]">
              <Image onClick={() => goToNovel(item.novelId)} src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/${item.cover}`} alt="image" width={90} height={100} className="hover:opacity-65" />
              <div className="flex flex-col align-middle overflow-scroll mt-3">
                <ShowGenreTags genres={item.genres} />
                {/* name  */}
                <div onClick={() => goToNovel(item.novelId)} className="hover:opacity-65">
                  {item.name && item.name.length > 40 ? `${item.name.slice(0, 37)}...` : item.name}
                </div>
                <div onClick={() => router.push(`/explore?search=${item.author}`)} className="text-lg font-bold italic hover:opacity-65">
                  Author: {item.author}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
