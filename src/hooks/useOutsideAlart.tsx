"use client";

import { useCallback } from "react";
import { useEffect, useState } from "react";

export default function useOutSideAlart(inside: React.RefObject<HTMLDivElement | null>, handlerToRun: (inside: boolean) => void) {
  const [isInside, setInside] = useState(false);

  const handler = useCallback(
    (e: MouseEvent) => {
      const itemClicked = e.target as HTMLElement;
      if (inside.current && inside.current.contains(itemClicked)) {
        console.log("in");
        handlerToRun(true);
        setInside(true);
      } else {
        console.log("out");
        handlerToRun(false);
        setInside(false);
      }
    },
    [handlerToRun, inside]
  );
  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [handler]);
  return isInside;
}
