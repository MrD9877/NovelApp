"use client";
import ErrorPage from "@/components/templates/ErrorPage";
import ExploreCard from "@/components/ui/ExploreCard";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export type Category = {
  src: string;
  genre: string;
};
export type ErrorResponse = { msg: string };

export default function ExplorePage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const {
    isPending,
    error,
    data: category,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await fetch(`/api/getGenre`);

      if (res.status !== 200) {
        const jsonData: ErrorResponse = await res.json();
        throw new Error(jsonData.msg || "error");
      } else {
        const { data }: { data: Category[] } = await res.json();
        return data;
      }
    },
  });

  if (isPending) return <div>Loading....</div>;
  if (error) return <ErrorPage message={error.message} />;
  if (search) return <>{search}</>;

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {category &&
          category.map((item) => {
            return (
              <div key={item.genre}>
                <ExploreCard src={item.src} text={item.genre} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
