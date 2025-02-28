"use client";
import React from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "@/components/templates/ErrorPage";
import { novelsSchema } from "@/validators/novels";
import DisplayContentCard from "@/components/cards/DisplayContentCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const {
    error,
    data: searchResults,
    isPending,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(`/api/searchNovel?search=${search}`);
      console.log(response.status);
      if (response.status === 404) {
        throw Error("404");
      } else if (response.status !== 200) {
        const { msg }: { msg: string } = await response.json();
        throw Error(msg);
      } else {
        const { novels } = await response.json();
        console.log(novels);
        return novelsSchema.parse(novels);
      }
    },
  });

  if (isPending) return <>Loading...</>;
  if (error) return <ErrorPage message={error.message} />;
  if (!search) redirect("/explore");
  return <DisplayContentCard data={searchResults} />;
}
