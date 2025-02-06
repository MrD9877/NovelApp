"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import BookHiddenNav from "@/components/templates/BookHiddenNav";
import { useRef } from "react";
import useOutSideAlart from "@/hooks/useOutsideAlart";
import { use } from "react";
import { GetContentReturn } from "@/utility/backEndFnc/getContent";
import { ChapterParamType } from "@/app/novel/chapter/page";
import useSwipeNext from "@/hooks/useSwipeNext";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface ReadBookComponentType {
  chapterDataPromise: Promise<GetContentReturn>;
  searchParams: ChapterParamType;
}
export enum FontStyles {
  serif = "serif",
  monospace = "monospace",
  cursive = "cursive",
}

function SwipeSpinnerComponent({ setLoading, searchParams }: { setLoading: React.Dispatch<React.SetStateAction<boolean>>; searchParams: ChapterParamType }) {
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

export default function ReadBookComponent({ chapterDataPromise, searchParams }: ReadBookComponentType) {
  const [displayNav, setDisplayNav] = useState(false);
  const [fontSize, setFont] = useState<number>(22);
  const [fontStyle, setfonstStyle] = useState<FontStyles>(FontStyles.serif);
  const [loading, setLoading] = useState(false);

  const timer = useRef<NodeJS.Timeout>(null);
  const navBar = useRef<HTMLDivElement>(null);

  const isInside = useOutSideAlart(navBar, showNav);
  void isInside;
  const content = use(chapterDataPromise);

  function showNav(inside: boolean) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (inside) {
      setDisplayNav(true);
    } else {
      setDisplayNav(!displayNav);
      timer.current = setTimeout(() => {
        setDisplayNav(false);
      }, 3000);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [content]);
  if (loading) return <LoadingSpinner width="100vw" height="30vh" />;
  return (
    <div className="w-screen py-4">
      {content && (
        <div className="px-4">
          <div className="select-none w-fit mx-auto text-xl my-3 font-bold">{content.topic}</div>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: `${fontSize}px`, lineHeight: `${fontSize + 1 + fontSize / 5}px`, fontFamily: fontStyle }} className="select-none">
            {content.content}
          </pre>
        </div>
      )}
      <div ref={navBar} style={{ display: displayNav ? "" : "none" }} className=" w-screen ">
        <BookHiddenNav setFont={setFont} fontSize={fontSize} setfonstStyle={setfonstStyle} fontStyle={fontStyle} />
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
