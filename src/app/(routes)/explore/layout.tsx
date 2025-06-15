import SearchNav from "@/components/templates/SearchNav";
import React from "react";

export default function ExpoloreLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-fit relative">
      <SearchNav />
      {children}
    </main>
  );
}
