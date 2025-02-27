import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function ExploreCard({ src = `dfdd98716e0cd0a9b56d796ef20f27f0d5b182960427ba3e2fbd46815d676587`, text = "text" }: { src: string; text: string }) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`explore/${text}`)} className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-2 w-28">
      <div className="m-2.5 overflow-hidden rounded-md h-32 flex justify-center items-center">
        <Image width={100} height={100} className="w-full h-full object-cover" src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/${src}`} alt="profile-picture" />
      </div>
      <div className="text-center">
        <h4 className="mb-1 text-sm text-slate-800 overflow-clip">{text}</h4>
      </div>
    </div>
  );
}
