"use client";
import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorResponse } from "@/app/(routes)/explore/page";
import { novelsSchema } from "@/validators/novels";
import LoadingSpinner from "../ui/LoadingSpinner";
import DisplaySearchCard from "../cards/DisplaySearchCard";
import ErrorPage from "./ErrorPage";
import { useRouter } from "next/navigation";

export default function SearchNav() {
  const [search, setSearch] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending, data, error } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      if (search === "") return null;
      const res = await fetch(`/api/searchNovel?search=${search}`);

      if (res.status !== 200) {
        const jsonData: ErrorResponse = await res.json();
        throw new Error(jsonData.msg || "error");
      } else {
        const { novels } = await res.json();

        return novelsSchema.parse(novels);
      }
    },
  });

  const onInputFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    queryClient.invalidateQueries({ queryKey: ["search"] });
  };

  return (
    <div>
      <div className="flex flex-col absolute h-12 w-full sm:px-10">
        <div className=" flex align-middle items-center justify-between px-4 text-black bg-white py-4 dark:bg-inherit dark:text-white ">
          <SidebarTrigger hidden={false} className="text-black dark:text-white dark:hover:text-black sm:hidden" />
          <input onChange={onInputFn} value={search || ""} className="outline-none px-3 sm:w-3/4" type="text" placeholder="Search by name or author.." />
          <svg
            onClick={() => {
              setSearch("");
              router.push(`/explore/search?search=${search}`);
            }}
            className="hover:opacity-55"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.35 18L13 13.65" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="bg-white h-52 z-10 text-black dark:text-white dark:bg-themeDarkBg">
          {isPending && <LoadingSpinner width="100vw" height="100px" />}
          {error && <ErrorPage message={error.message} />}
          {search !== "" && Array.isArray(data) && <DisplaySearchCard data={data} />}
        </div>
      </div>
      <div className="h-16"></div>
    </div>
  );
}
