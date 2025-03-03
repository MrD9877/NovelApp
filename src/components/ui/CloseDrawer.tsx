import { DrawerClose } from "@/components/ui/drawer";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function CloseDarwer({ close }: { close: boolean }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (close) {
      btn.current.click();
    }
  }, [close]);
  return (
    <DrawerClose asChild>
      <button ref={btn}></button>
    </DrawerClose>
  );
}
