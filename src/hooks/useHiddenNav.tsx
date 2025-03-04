import { FontStyles } from "@/components/templates/ReadBookComponent";
import React, { useRef, useState } from "react";
import useOutSideAlert from "./useOutsideAlart";

export default function useHiddenNav(navBar: React.RefObject<HTMLDivElement | null>) {
  const [displayNav, setDisplayNav] = useState(false);
  const [fontSize, setFont] = useState<number>(22);
  const [fontStyle, setfonstStyle] = useState<FontStyles>(FontStyles.serif);
  const timer = useRef<NodeJS.Timeout>(null);
  const isInside = useOutSideAlert(navBar, showBottomNav);
  void isInside;

  function showBottomNav(inside: boolean) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (inside) {
      setDisplayNav(true);
    } else {
      setDisplayNav(!displayNav);
      timer.current = setTimeout(() => {
        setDisplayNav(false);
      }, 3000);
    }
  }

  return [{ fontSize, setFont, fontStyle, setfonstStyle }, displayNav] as const;
}
