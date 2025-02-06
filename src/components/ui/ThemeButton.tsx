"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useState } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return <></>;
  return (
    <div>
      <button onClick={() => setTheme("dark")}>
        <Sun style={theme === "light" ? {} : { display: "none" }} className=" h-[30] w-[30] scale-100 transition-all dark:-rotate-90  " />
      </button>
      <button onClick={() => setTheme("light")}>
        <Moon style={theme === "dark" ? {} : { display: "none" }} className=" h-[28] w-[28] rotate-90  scale-100  transition-all  dark:rotate-0 " />
      </button>
    </div>
  );
}
