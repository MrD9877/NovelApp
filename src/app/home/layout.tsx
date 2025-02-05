// import MainNav from "@/components/ui/MainNav";
import NavbarMain from "@/components/ui/NavbarMain";
import React from "react";

export default function layout({ children }: { children: React.JSX.Element }) {
  return (
    <div>
      <NavbarMain />
      {children}
    </div>
  );
}
