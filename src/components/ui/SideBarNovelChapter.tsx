"use client";
import React, { useCallback, useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getNovelInfo } from "@/utility/backEndFnc/getNovelInfo";
import { NovelInfo } from "../templates/NovelDisplay";
import Image from "next/image";
import { getNovelIndex } from "@/utility/backEndFnc/getNovelIndex";
import { Index } from "../templates/ListChapters";
import LoadingSpinner from "./LoadingSpinner";

export default function SideBarNovelChapter() {
  const [novelInfo, setNovelInfo] = useState<NovelInfo | null>(null);
  const searchParams = useSearchParams();
  const novelId = searchParams.get("novelId");
  const currentChapter = searchParams.get("chapter");

  const [items, setItem] = useState<Index[]>();

  const fetchInfo = useCallback(async () => {
    const info = await getNovelInfo(novelId);
    setNovelInfo(info);
  }, [novelId]);

  const fetchIndex = useCallback(async () => {
    const info = await getNovelIndex(novelId);
    setItem(info);
  }, [novelId]);

  useEffect(() => {
    fetchInfo();
    fetchIndex();
  }, [fetchInfo, fetchIndex]);

  if (!novelInfo)
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="text-white">
            <LoadingSpinner className="text-white" height="20vh" />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );

  const { author, title, cover } = novelInfo;
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className=" flex flex-row  gap-3 pb-0 pr-4 pt-3 items-center">
            <Image width={100} height={100} src="/images/bookCover.png" alt={cover} />
            <div>
              <h2 className="text-lg mb-4">{title}</h2>
              {/* to do add link  */}
              <Link className="text-themeLightText underline text-base" href={`${author}`}>
                {author}
              </Link>
            </div>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Volume 1</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items ? (
                  items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <Link href={`/novel/chapter/?novelId=${novelId}&chapter=${index + 1}`}>
                        <SidebarMenuButton asChild isActive={Number(currentChapter) === index + 1}>
                          <div className="select-none  flex ">
                            <div>{index + 1}</div>
                            <div className="text-wrap text-sm">{item.title}</div>
                          </div>
                        </SidebarMenuButton>
                        <SidebarMenuBadge style={{ color: "white" }}>{item.locked ? <LockKeyhole /> : <LockKeyholeOpen />}</SidebarMenuBadge>
                      </Link>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <LoadingSpinner className="text-white" height="10vh" />
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
