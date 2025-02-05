import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function NovelInfoSkeleton() {
  return (
    <div className="w-screen  pb-12">
      {/* cover  */}
      <div className="w-fit mx-auto my-3 rounded-lg">
        <Skeleton className="h-[200px] w-[200px] rounded-xl bg-themeLightBg" />
      </div>
      {/* titile  */}
      <div className=" w-fit px-10 text-lg font-bold text-start">
        <Skeleton className="h-[20px] w-[50px] rounded-xl bg-themeLightBg my-7" />
        {/* Author  */}
        <Skeleton className="h-[20px] w-[30px] rounded-xl bg-themeLightBg" />
      </div>
      <hr className="w-[80vw] mx-auto my-4 border-sidebar" />
      <div className="px-4 mx-auto w-fit ">
        <Skeleton className="h-[90px] w-[300px] rounded-xl bg-themeLightBg my-8" />
        <Skeleton className="h-[90px] w-[300px] rounded-xl bg-themeLightBg" />
      </div>
    </div>
  );
}
