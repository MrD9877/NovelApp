"use client";
import { useEffect, useState } from "react";

export default function useSwipeNext() {
  const [nextSpinner, setNextSpinner] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [toNext, setToNext] = useState(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (nextSpinner) {
        setToNext(true);
      }
      setTouchStartY(null);
      setNextSpinner(false);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === null) return;
      const touchEndY = e.touches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition < pageHeight - 60) {
        setNextSpinner(false);
        setTouchStartY(null);
      }
      if (swipeDistance > 20 && scrollPosition > pageHeight - 50) {
        setNextSpinner(true);
      }
    };

    document.addEventListener("touchmove", handleTouchMove);

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [nextSpinner, touchStartY]);

  const arr: [boolean, boolean, React.Dispatch<React.SetStateAction<boolean>>] = [nextSpinner, toNext, setToNext];
  return arr;
}
