"use client";
import React, { useCallback, useEffect, useState } from "react";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import ChapterListNav from "./ChapterListNav";
import { useRouter } from "next/navigation";

interface ListChaptersComponent {
  novelId: string;
}

export type Index = {
  title: string;
  locked: boolean;
};

export default function ListChapters({ novelId }: ListChaptersComponent) {
  const [listOrder, setListOrder] = useState(true);
  const [tempList, setTempList] = useState<Array<Index>>();

  const router = useRouter();

  const fetchList = useCallback(async () => {
    try {
      const res = await fetch(`/api/novelIndex?novelId=${novelId}`);
      const list = await res.json();
      setTempList(list);
    } catch {}
  }, [novelId]);

  useEffect(() => {
    if (!tempList) return;
    setTempList((pre) => {
      const reverse = structuredClone(pre);
      if (!reverse) return [];
      return reverse.reverse();
    });
  }, [listOrder]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);
  return (
    <div>
      <ChapterListNav listOrder={listOrder} setListOrder={setListOrder} />
      {tempList &&
        tempList.map((item, index) => {
          const n = tempList.length;
          return (
            <button onClick={() => router.push(`/novel/chapter/?novelId=${novelId}&chapter=${index + 1}`)} key={index} className="w-full h-12 grid grid-cols-7 px-2 my-8 text-lg text-start ">
              <span className="mx-3 col-span-1">{(listOrder ? index : n - index) + 1}</span>
              <span className="col-span-5 select-none overflow-clip h-12">{item.title} </span>
              <span className="ml-5 col-span-1">{item.locked ? <LockKeyhole /> : <LockKeyholeOpen />}</span>
            </button>
          );
        })}
    </div>
  );
}
