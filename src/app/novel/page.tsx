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
  if (!params) redirect("/notFound");

  return (
    <div>
      <NavbarMain />
      <NovelDisplay novelId={params.novelId} />
    </div>
  );
}
