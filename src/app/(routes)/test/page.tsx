"use client";
import { useToast } from "@/hooks/use-toast";
import { StoreState } from "@/redux/userSlice";
import React from "react";
import { useSelector } from "react-redux";

export default function Testpage() {
  const { toast } = useToast();
  const test = () => {
    toast({ title: "test", description: "It is working just Fine" });
  };
  const userName = useSelector((state: StoreState) => state.email);
  return (
    <div>
      <button onClick={test}>Test test</button>
      userName:{userName}
    </div>
  );
}
