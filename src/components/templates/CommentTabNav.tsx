import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function CommentTabNav({ setTab, totalComments, tabValue }) {
  return (
    <div className="shadow-lg w-[94vw] h-12 mx-auto rounded-xl flex justify-between items-center px-8 bg-white">
      <div className="font-semibold">{totalComments || 0}Comments</div>
      <Tabs value={tabValue} onValueChange={(value: "newest" | "liked") => setTab(value)} defaultValue="newest">
        <TabsList>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
