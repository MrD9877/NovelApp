"use client";
import { StoreState } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useNovelLibrary(novelId: string) {
  const library = useSelector((state: StoreState) => state.library);
  const [isAdded, setAdded] = useState<boolean>(false);

  useEffect(() => {
    const check = library.findIndex((data) => data.novelId === novelId);
    if (check !== -1) setAdded(true);
    else setAdded(false);
  }, [library, novelId]);
  return [isAdded];
}
