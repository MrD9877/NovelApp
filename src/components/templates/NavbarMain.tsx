"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function NavbarMain() {
  const pathname = usePathname();
  return (
    <div className="sm:hidden ">
      <span className="absolute h-14 flex items-center px-2 py-4 ">
        <SidebarTrigger hidden={false} className="text-white" />
      </span>
      <div className="w-screen h-14 flex items-center justify-center text-white font-sans text-lg px-2 py-4 bg-themeDarkBg overflow-clip ">
        <span className=" w-fit mx-auto">{pathname.replace("/", "").toUpperCase()}</span>
      </div>
    </div>
  );
}
