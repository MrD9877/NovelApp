"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { toast } from "sonner";
import CloseDarwer from "../ui/CloseDrawer";
import { useEffect } from "react";

type CommentBoxAction =
  | {
      type: "comment";
      payload: {
        novelId: string;
        chapter: string | number;
      };
    }
  | {
      type: "reply";
      payload: {
        id: string;
      };
    };

export function PopCommentBox({ children, action }: { children: string | React.ReactElement; action: CommentBoxAction }) {
  const [comment, setComment] = useState("");
  const [loading, setloading] = useState(false);
  const [close, setClose] = useState(false);
  const addComment = async () => {
    setloading(true);
    try {
      if (action.type === "comment") {
        const res = await fetch("/api/addComment", { method: "POST", body: JSON.stringify({ comment, ...action.payload }) });
        if (res.status === 200) {
          toast("Comment Added");
          setComment("");
          setClose(true);
        } else if (res.status == 401) {
          toast("Login to add comment");
        } else {
          const data = await res.json();
          toast(data.msg);
        }
      }
    } catch (err) {
      console.log(err);
      toast("Error: Comment Not added");
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (loading) {
      setClose(false);
    }
  }, [loading]);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>{children}</button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add a Comment</DrawerTitle>
          </DrawerHeader>
          <div className="h-32 my-4 mx-10  rounded-2xl border-[3px] p-1 border-black dark:border-white">
            <textarea value={comment || ""} onChange={(e) => setComment(e.target.value)} className="w-full h-full p-3  outline-none  " />
          </div>

          <DrawerFooter>
            <Button variant="outline" onClick={addComment} disabled={loading}>
              <span style={{ opacity: loading ? 0.65 : 1 }} className="text-white dark:text-black">
                Add
              </span>
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
      <CloseDarwer close={close} />
    </Drawer>
  );
}
