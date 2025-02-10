"use client";
import React, { useEffect, useState, useRef } from "react";
import BookHiddenNav from "@/components/templates/BookHiddenNav";
import { ChapterParamType } from "@/app/novel/chapter/page";
import useSwipeNext from "@/hooks/useSwipeNext";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import useHiddenNav from "@/hooks/useHiddenNav";
import { ChapterType } from "@/schema/chapter";

interface ReadBookComponentType {
  searchParams: ChapterParamType;
}
export enum FontStyles {
  serif = "serif",
  monospace = "monospace",
  cursive = "cursive",
}

export interface SwipeSpinnerComponent {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchParams: ChapterParamType;
}

function SwipeSpinnerComponent({ setLoading, searchParams }: SwipeSpinnerComponent) {
  const [nextSpinner, toNext, setToNext] = useSwipeNext();
  const router = useRouter();

  useEffect(() => {
    if (toNext) {
      setToNext(false);
      setLoading(true);
      router.push(`/novel/chapter?novelId=${searchParams?.novelId}&chapter=${Number(searchParams?.chapter) + 1}`);
    }
  }, [toNext, router, searchParams, setLoading, setToNext]);

  return (
    <>
      {nextSpinner && (
        <div>
          <LoadingSpinner width="100vw" height="50px" />
        </div>
      )}
    </>
  );
}

export default function ReadBookComponent({ searchParams }: ReadBookComponentType) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<ChapterType>();
  const navBar = useRef<HTMLDivElement>(null);
  const [componentFont, displayNav] = useHiddenNav(navBar);
  const { fontSize, fontStyle } = componentFont;

  const fetchContent = async (novelId: string, chapter: string) => {
    setLoading(true);
    try {
      console.log(chapter);
      const res = await fetch(`/api/chapter?novelId=${novelId}&chapter=${chapter}`);
      const data = await res.json();
      setContent(data);
    } catch {}
  };

  useEffect(() => {
    if (content) {
      setLoading(false);
    }
  }, [content]);

  useEffect(() => {
    if (searchParams) {
      fetchContent(searchParams.novelId, searchParams.chapter);
    }
  }, [searchParams]);

  if (loading) return <LoadingSpinner width="100vw" height="30vh" />;
  return (
    <div className="w-screen py-4">
      {content && (
        <div className="px-4">
          <div className="select-none w-fit mx-auto text-xl my-3 font-bold">{content.title}</div>
          <div style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize + 1 + fontSize / 5}px`, fontFamily: fontStyle }} className="select-none">
            {content.content &&
              content.content.map((item, index) => {
                return (
                  <div className="my-2" key={index}>
                    <p>{item}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div ref={navBar} style={{ display: displayNav ? "" : "none" }} className=" w-screen ">
        <BookHiddenNav componentFont={componentFont} />
      </div>

      <div className="flex flex-col gap-4 h-[30vh] justify-end">
        <div className="w-fit mx-auto text-xl">Swipe Down To Continue</div>
        <div className="w-fit mx-auto">
          <ChevronDown />
        </div>
      </div>

      <SwipeSpinnerComponent setLoading={setLoading} searchParams={searchParams} />
    </div>
  );
}
