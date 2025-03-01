"use client";
import { StoreState } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useNovelLibrary(novelId: string) {
  const library = useSelector((state: StoreState) => state.library);
  const [isAdded, setAdded] = useState<boolean>(false);
  const [lastRead, setLastRead] = useState<number>(1);

  useEffect(() => {
    const check = library.find((data) => data.novelId === novelId);
    if (check) {
      setAdded(true);
      setLastRead(check.lastRead);
    } else setAdded(false);
  }, [library, novelId]);
  return [isAdded, lastRead];
}
