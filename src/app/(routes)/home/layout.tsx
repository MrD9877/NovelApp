// import MainNav from "@/components/ui/MainNav";
import NavbarMain from "@/components/templates/NavbarMain";
import React from "react";

export default function layout({ children }: { children: React.JSX.Element }) {
  return (
    <div>
      <NavbarMain />
      {children}
    </div>
  );
}
