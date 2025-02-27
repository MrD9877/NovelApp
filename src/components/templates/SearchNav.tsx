import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

export default function SearchNav() {
  return (
    <div className=" flex align-middle items-center justify-between px-4 text-black bg-white py-4 dark:bg-inherit dark:text-white w-screen">
      <SidebarTrigger hidden={false} className="text-black dark:text-white" />
      <input className="outline-none px-3" type="text" placeholder="Search by name or email.." />
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.35 18L13 13.65" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
