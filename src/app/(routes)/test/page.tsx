"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

export default function Testpage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam }) => {
      console.log(pageParam);
      return { nextPage: pageParam < 10 ? pageParam + 1 : null };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  return (
    <div>
      <button onClick={() => fetchNextPage()}>Test test</button>
    </div>
  );
}
