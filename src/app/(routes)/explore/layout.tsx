import SearchNav from "@/components/templates/SearchNav";
import React from "react";

export default function ExpoloreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SearchNav />
      {children}
    </div>
  );
}
