"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div>
        {theme === "light" ? (
          <button onClick={() => setTheme("dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90  " />
          </button>
        ) : (
          <button onClick={() => setTheme("light")}>
            <Moon className=" h-[1.2rem] w-[1.2rem] rotate-90  scale-100  transition-all  dark:rotate-0 " />
          </button>
        )}
      </div>
    </>
  );
}
