"use client";
import { MoveLeft, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
interface ChapterListNavComponent {
  listOrder: boolean;
  setListOrder: Dispatch<SetStateAction<boolean>> | null;
}

export default function ChapterListNav({ listOrder, setListOrder }: ChapterListNavComponent) {
  const router = useRouter();
  return (
    <>
      <div className="w-screen flex justify-between px-3 items-center py-5 text-lg">
        <button onClick={() => router.back()}>
          <MoveLeft />
        </button>
        <div>Contents</div>
        {listOrder ? (
          <button onClick={() => setListOrder && setListOrder(false)}>
            <ArrowUpNarrowWide />
          </button>
        ) : (
          <button onClick={() => setListOrder && setListOrder(true)}>
            <ArrowDownWideNarrow />
          </button>
        )}
      </div>
      <hr className="w-full my-1 h-3 border-themeSuperLight" />
    </>
  );
}
