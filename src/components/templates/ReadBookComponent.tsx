"use client";
import React, { useEffect, useRef, useState } from "react";
import BookHiddenNav from "@/components/templates/BookHiddenNav";
import useSwipeNext from "@/hooks/useSwipeNext";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import useHiddenNav from "@/hooks/useHiddenNav";
import { ChapterParamType } from "@/app/(routes)/novel/chapter/page";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import { fetchContent } from "@/utility/fetchFn/fetchContent";
import { fetchLastRead } from "@/utility/fetchFn/fetchLastRead";
import CommentSection from "./CommentSection";

interface ReadBookComponentType {
  searchParams: ChapterParamType;
}
export enum FontStyles {
  serif = "serif",
  monospace = "monospace",
  cursive = "cursive",
}

export interface SwipeSpinnerComponent {
  searchParams: ChapterParamType;
}

function SwipeSpinnerComponent({ searchParams }: SwipeSpinnerComponent) {
  const [nextSpinner, toNext, setToNext] = useSwipeNext();
  const router = useRouter();

  useEffect(() => {
    if (toNext) {
      setToNext(false);
      router.push(`/novel/chapter?novelId=${searchParams?.novelId}&chapter=${Number(searchParams?.chapter) + 1}`);
    }
  }, [toNext, router, searchParams, setToNext]);

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
  const navBar = useRef<HTMLDivElement>(null);
  const [componentFont, displayNav] = useHiddenNav(navBar);
  const { fontSize, fontStyle } = componentFont;
  const [displayComments, setDisplayCommets] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: content,
    isLoading,
    isError,
    error,
    isFetched,
  } = useQuery({
    queryKey: ["chapter", Number(searchParams.chapter), searchParams.novelId],
    queryFn: async () => await fetchContent(searchParams.novelId, searchParams.chapter),
    retry: (failcount, error) => {
      if (error.message.includes("chapter")) return false;
      if (failcount === 3) return false;
      else return true;
    },
  });

  const updateReadChapterQuery = useQuery({
    queryKey: ["lastRead", searchParams.chapter, searchParams.novelId],
    queryFn: async () => await fetchLastRead(searchParams.novelId, searchParams.chapter),
    enabled: content !== undefined,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failcount, error) => {
      if (error.message.includes("library")) return false;
      if (failcount === 2) return false;
      else return true;
    },
  });
  void updateReadChapterQuery;

  useEffect(() => {
    if (isFetched) {
      queryClient.prefetchQuery({
        queryKey: ["chapter", Number(searchParams.chapter) + 1, searchParams.novelId],
        queryFn: async () => await fetchContent(searchParams.novelId, Number(searchParams.chapter) + 1),
      });
    }
  }, [isFetched, queryClient, searchParams]);

  if (isLoading && !isFetched) return <LoadingSpinner width="100vw" height="30vh" />;
  if (isError) return <ErrorPage message={error.message} />;
  if (displayComments) return <CommentSection novelId={searchParams.novelId} chapter={searchParams.chapter} setDisplayCommets={setDisplayCommets} />;
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
        <BookHiddenNav componentFont={componentFont} setDisplayCommets={setDisplayCommets} />
      </div>

      <div className="flex flex-col gap-4 h-[30vh] justify-end">
        <div className="w-fit mx-auto text-xl">Swipe Down To Continue</div>
        <div className="w-fit mx-auto">
          <ChevronDown />
        </div>
      </div>
      <SwipeSpinnerComponent searchParams={searchParams} />
    </div>
  );
}
