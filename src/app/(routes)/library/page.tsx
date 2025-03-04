"use client";
import NavbarMain from "@/components/templates/NavbarMain";
import { StoreState } from "@/redux/userSlice";
import { Ellipsis, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import addNovelToLiberary from "@/utility/addToLibrary";
import useUser from "@/hooks/useUser";
import { Switch } from "@/components/ui/switch";

export default function LibraryPage() {
  const library = useSelector((state: StoreState) => state.library);
  const { reFetch } = useUser();
  const router = useRouter();
  const goToNovel = (novelId: string, chapter: number) => {
    router.push(`/novel/chapter?novelId=${novelId}&chapter=${chapter}`);
  };
  const removeNovel = async (novelId: string) => {
    await addNovelToLiberary(novelId);
    reFetch();
  };

  return (
    <div className="w-screen m-0">
      <NavbarMain />
      <div className="grid grid-cols-3 gap-3 w-screen my-4 px-1 overflow-clip">
        {Array.isArray(library) &&
          library.map((novel) => {
            return (
              <div className=" flex flex-col justify-center items-center overflow-clip" key={novel.novelId}>
                <div className="h-[150px]" onClick={() => goToNovel(novel.novelId, novel.lastRead)}>
                  <Image alt="image" src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/${novel.cover}`} height={150} width={100} layout="intrinsic" className="w-[100px] h-[150px] object-cover rounded-sm hover:opacity-65" />
                </div>
                <div className="text-sm px-2">{novel.name && novel.name.length > 30 ? `${novel.name.slice(0, 27)}...` : novel.name}</div>
                <div className="text-themeLightBg flex justify-between w-full px-4">
                  <span>
                    {novel.lastRead}/{novel.totalChapters}
                  </span>
                  <span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <Ellipsis />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-36">
                        <DropdownMenuItem className="flex items-center justify-center mb-1">
                          <button onClick={() => removeNovel(novel.novelId)}>Remove</button>
                          <Trash2 width={16} stroke="red" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="w-fit mx-auto mb-1">
                          <button onClick={() => router.push(`/novel?novelId=${novel.novelId}`)}>About Book</button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div className="flex items-center justify-center mb-1 gap-1">
                          Notifications
                          <Switch checked={true} />
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
