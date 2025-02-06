"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BookMarked, Home, MessageSquareMore, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeToggle from "./ThemeButton";
import { useEffect } from "react";

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
    title: "Notifications",
    url: "/Notifications",
    icon: BookMarked,
  },
  {
    title: "Community",
    url: "/connect",
    icon: MessageSquareMore,
  },
];

type MenuBadge = {
  Notifications: number;
  Community: number;
};
export default function SideBarMain() {
  const pathname = usePathname();
  const [menuBadgeNumbers, setMenuBadge] = useState<MenuBadge>({ Notifications: 0, Community: 2 });

  useEffect(() => {
    setMenuBadge({ Notifications: 0, Community: 2 });
  }, []);
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="justify-between flex-row items-center pb-0 pr-4 pt-3">
            {/* app icon  */}
            <MessageSquareMore />
            {/* dark light mode  */}
            <ModeToggle />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
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
