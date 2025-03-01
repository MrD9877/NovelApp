"use client";
import React, { useCallback, useRef, useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Index } from "../templates/ListChapters";
import LoadingSpinner from "./LoadingSpinner";
import { NovelInfoType } from "@/validators/novelInfo";

export default function SideBarNovelChapter() {
  const [novelInfo, setNovelInfo] = useState<NovelInfoType | null>(null);
  const searchParams = useSearchParams();
  const novelId = searchParams.get("novelId");
  const currentChapter = searchParams.get("chapter");
  const { toggleSidebar, openMobile } = useSidebar();
  const activeBtn = useRef<HTMLButtonElement>(null);
  const timeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    setTimeout(() => {
      if (activeBtn.current) {
        activeBtn.current.scrollIntoView();
      }
    }, 1000);
  }, [openMobile]);

  const [items, setItem] = useState<Index[]>();

  const fetchInfo = useCallback(async () => {
    const res = await fetch(`/api/novelInfo?novelId=${novelId}`);
    const info = await res.json();
    setNovelInfo(info);
  }, [novelId]);

  const fetchIndex = useCallback(async () => {
    const res = await fetch(`/api/novelIndex?novelId=${novelId}`);
    const info = await res.json();
    setItem(info);
  }, [novelId]);

  useEffect(() => {
    fetchInfo();
    fetchIndex();
  }, [fetchInfo, fetchIndex]);

  if (!novelInfo)
    return (
      <Sidebar aria-describedby={"chapterBar"}>
        <SidebarContent>
          <SidebarGroup className="text-white">
            <LoadingSpinner className="text-white" height="20vh" />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );

  const { author, name, cover } = novelInfo;
  return (
    <>
      <Sidebar aria-describedby={"chapterBar"}>
        <SidebarContent>
          <SidebarGroup className=" flex flex-row  gap-3 pb-0 pr-4 pt-3 items-center">
            <Link href={`/novel?novelId=${novelId}`} onClick={() => toggleSidebar()}>
              <Image width={100} height={100} src="/images/bookCover.png" alt={cover} />
            </Link>
            <div>
              <Link href={`/novel?novelId=${novelId}`} onClick={() => toggleSidebar()}>
                <h2 className="text-lg mb-4">{name}</h2>
              </Link>
              {/* to do add link  */}
              <Link className="text-themeLightText underline text-base" href={`${author}`} onClick={() => toggleSidebar()}>
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
                      <Link href={`/novel/chapter/?novelId=${novelId}&chapter=${index + 1}`} onClick={() => toggleSidebar()}>
                        <SidebarMenuButton asChild isActive={Number(currentChapter) === index + 1} ref={Number(currentChapter) === index + 1 ? activeBtn : null}>
                          <div className="select-none  flex ">
                            <div>{index + 1}</div>
                            <div className="text-wrap text-sm h-10 overflow-clip w-[78%]">{item.title}</div>
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
