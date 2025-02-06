"use server";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBarMain from "@/components/ui/SideBarMain";
import { ThemeProvider } from "@/components/providers/theme-provider";
import SideBarNovelChapter from "../ui/SideBarNovelChapter";
import { headers } from "next/headers";
import dotenv from "dotenv";
dotenv.config();
export default async function MainProvider({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const referer = (await headersList).get("referer") || "";
  const pathname = new URL(referer, process.env.SITE_URL).pathname;
  //   for(let i=0;i<)
  console.log(pathname.startsWith("/novel"));
  const sidebar = true;
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        {sidebar ? <SideBarNovelChapter /> : <SideBarMain />}
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
