"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { BookMarked, Home, LogIn, PencilLine, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeToggle from "./ThemeButton";
import { useEffect } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Library",
    url: "/library",
    icon: BookMarked,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Search,
  },
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Be a Writer",
    url: "/creator",
    icon: PencilLine,
  },
];

type MenuBadge = {
  Notifications: number;
  Community: number;
};
export default function SideBarMain() {
  const pathname = usePathname();
  const [menuBadgeNumbers, setMenuBadge] = useState<MenuBadge>({ Notifications: 0, Community: 2 });
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  useEffect(() => {
    setMenuBadge({ Notifications: 0, Community: 2 });
  }, []);
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="justify-between flex-row items-center pb-0 pr-4 pt-3">
            {/* app icon  */}
            <Link
              href={"/home"}
              onClick={() => {
                if (isMobile) toggleSidebar();
              }}
            >
              <Image width={40} height={40} src={"/images/icon.ico"} alt="icon" />
            </Link>
            {/* dark light mode  */}
            <ModeToggle />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      href={item.url}
                      onClick={() => {
                        if (isMobile) toggleSidebar();
                      }}
                    >
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                      {menuBadgeNumbers[item.title as keyof MenuBadge] !== undefined && menuBadgeNumbers[item.title as keyof MenuBadge] > 0 && (
                        <SidebarMenuBadge style={{ color: "black" }} className="px-2 bg-white rounded-full py-2">
                          {menuBadgeNumbers[item.title as keyof MenuBadge]}
                        </SidebarMenuBadge>
                      )}
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
