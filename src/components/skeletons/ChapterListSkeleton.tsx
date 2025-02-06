import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function ChapterListSkeleton() {
  const arr = new Array(8).fill("placeholders");
  return (
    <div>
      {arr.map((p, index) => {
        return (
          <div key={index} className="text-white h-12 grid grid-cols-7 px-2 my-8 text-lg">
            <span className="mx-3">
              <Skeleton className="h-8 w-full rounded-xl  bg-themeLightBg" />
            </span>
            <span className="col-span-5">
              <Skeleton className="h-8 w-full rounded-xl bg-themeLightBg" />
            </span>
            <span className="ml-5">
              <Skeleton className="h-8 w-full rounded-full bg-themeLightBg" />
            </span>
          </div>
        );
      })}
    </div>
  );
}
