"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

export default function ThemeToaster() {
  const { theme } = useTheme();

  return <Toaster position={"bottom-right"} theme={theme === "dark" ? "dark" : theme === "light" ? "light" : "dark"} />;
}
