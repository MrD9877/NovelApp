"use client";
import React, { use, useEffect, useState } from "react";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import ChapterListNav from "./ChapterListNav";

interface ListChaptersComponent {
  listPromise: Promise<Array<Index>>;
}

export type Index = {
  title: string;
  locked: boolean;
};

export default function ListChapters({ listPromise }: ListChaptersComponent) {
  const [listOrder, setListOrder] = useState(true);
  const [tempList, setTempList] = useState<Array<Index>>();

  const list = use(listPromise);

  useEffect(() => {
    if (!tempList) return;
    setTempList((pre) => {
      const reverse = structuredClone(pre);
      if (!reverse) return [];
      return reverse.reverse();
    });
  }, [listOrder]);

  useEffect(() => {
    setTempList(list);
  }, [list]);
  return (
    <div>
      <ChapterListNav listOrder={listOrder} setListOrder={setListOrder} />
      {tempList &&
        tempList.map((item, index) => {
          const n = list.length;
          return (
            <button key={index} className="w-full h-12 grid grid-cols-7 px-2 my-8 text-lg text-start hover:animate-bounce">
              <span className="mx-3 col-span-1">{(listOrder ? index : n - index) + 1}</span>
              <span className="col-span-5 select-none">{item.title} </span>
              <span className="ml-5 col-span-1">{item.locked ? <LockKeyhole /> : <LockKeyholeOpen />}</span>
            </button>
          );
        })}
    </div>
  );
}
