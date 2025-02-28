"use client";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function Testpage() {
  const { toast } = useToast();
  const test = () => {
    toast({ title: "test", description: "It is working just Fine" });
  };
  return (
    <div>
      <button onClick={test}>Test test</button>
    </div>
  );
}
