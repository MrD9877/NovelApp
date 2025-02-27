import NovelDisplay from "@/components/templates/NovelDisplay";
import NavbarMain from "@/components/templates/NavbarMain";
import React from "react";
import { redirect } from "next/navigation";

type paramType =
  | {
      novelId: string;
    }
  | undefined;

interface NovelPage {
  searchParams: Promise<paramType>;
}

export default async function NovelPage({ searchParams }: NovelPage) {
  const params: paramType = await searchParams;
  if (!params?.novelId) redirect("/notFound");

  return (
    <div className="mb-10">
      <NavbarMain />
      <NovelDisplay novelId={params.novelId} />
    </div>
  );
}
