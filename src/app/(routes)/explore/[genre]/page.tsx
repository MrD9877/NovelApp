"use client";

import ErrorPage from "@/components/templates/ErrorPage";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ErrorResponse } from "../page";
import { novelsSchema } from "@/validators/novels";
import DisplayContentCard from "@/components/cards/DisplayContentCard";

export default function ExporeGenre() {
  const pathname = usePathname(); // Get the current path
  const genre = pathname.split("/").pop();

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

  if (isPending) return <div>Loading...</div>;
  if (error) return <ErrorPage message={error.message} />;
  if (data) return <DisplayContentCard data={data} />;
  return <></>;
}
