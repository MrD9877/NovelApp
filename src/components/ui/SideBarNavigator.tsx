"use client";
import React from "react";
import SideBarNovelChapter from "./SideBarNovelChapter";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SideBarMain from "./SideBarMain";
import { useState } from "react";

export enum SideBars {
  SideBarNovelChapter = "sidebar for novels chapter",
  SideBarMain = "main side bar use in most throughout the app",
}

const PathToSideBar: Record<string, SideBars> = {
  "/novel": SideBars.SideBarMain,
  "/novel/chapter": SideBars.SideBarNovelChapter,
  "/home": SideBars.SideBarMain,
  "/connect": SideBars.SideBarMain,
  "/explore": SideBars.SideBarMain,
  "/library": SideBars.SideBarMain,
};

export default function SideBarNavigator() {
  const [displaySideBar, setDisplay] = useState<SideBars>();
  const pathname = usePathname();

  useEffect(() => {
    setDisplay(PathToSideBar[pathname]);
  }, [pathname]);

  if (displaySideBar === "sidebar for novels chapter") return <SideBarNovelChapter />;
  if (displaySideBar === "main side bar use in most throughout the app") return <SideBarMain />;
}
