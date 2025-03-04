import React from "react";
import { PopCommentBox } from "./CommentBox";

export default function CommentBoxNav({ novelId, chapter, invalidateComment, setTab }) {
  return (
    <div className="w-screen  fixed bottom-2 z-50 ">
      <div className="w-[90vw] mx-auto bg-themeSuperLight bg-opacity-65 h-14 p-2 rounded-lg">
        <div className="h-full w-full bg-white rounded-lg text-themeSuperLight flex justify-center items-center">
          <PopCommentBox action={{ type: "comment", payload: { novelId, chapter, invalidateComment, setTab } }}>What&apos;s your Thoughts?</PopCommentBox>
        </div>
      </div>
    </div>
  );
}
