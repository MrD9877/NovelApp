"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import ModeToggle from "../ui/ThemeButton";
import { MessageCircleCode, AArrowDown, AArrowUp } from "lucide-react";
import { useState } from "react";
import { useRef } from "react";
import useOutSideAlart from "@/hooks/useOutsideAlart";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FontStyles } from "./ReadBookComponent";

export interface FontState {
  setFont: React.Dispatch<React.SetStateAction<number>>;
  fontSize: number;
  setfonstStyle: React.Dispatch<React.SetStateAction<FontStyles>>;
  fontStyle: FontStyles;
}

function HiddenNavAlphabet({ componentFont }: { componentFont: FontState }) {
  const { setFont, fontSize, setfonstStyle, fontStyle } = componentFont;
  const onValueChangeSize = (setArray: number[]) => {
    setFont(setArray[0]);
  };
  const onValueChangeFont = (value: FontStyles) => {
    setfonstStyle(value);
  };
  return (
    <div className="md:invisible ">
      <div className=" bg-themeSuperDark h-20  flex items-center m-0  justify-between  fixed bottom-0 w-screen text-white  z-20">
        {/* set font size  */}
        <div>
          <div className="flex px-2 gap-4 w-screen">
            <AArrowDown className="w-[32] h-[32]" />
            <Slider onValueChange={onValueChangeSize} defaultValue={[fontSize]} min={16} max={32} step={1} />
            <AArrowUp className="w-[32] h-[32]" />
          </div>
          <ToggleGroup defaultValue={fontStyle} onValueChange={onValueChangeFont} type="single">
            <ToggleGroupItem value={FontStyles.serif}>Serif</ToggleGroupItem>
            <ToggleGroupItem value={FontStyles.cursive}>Cursive</ToggleGroupItem>
            <ToggleGroupItem value={FontStyles.monospace}>Monospace</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}

export default function BookHiddenNav({ componentFont, setDisplayCommets }: { componentFont: FontState; setDisplayCommets: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [displayNav, setDisplayNav] = useState(false);
  const navBar = useRef<HTMLDivElement>(null);
  const isInside = useOutSideAlart(navBar, showNav);

  function showNav(inside: boolean) {
    console.log(isInside);
    if (inside) {
      setDisplayNav(true);
    } else {
      setDisplayNav(false);
    }
  }

  return (
    <div className="md:invisible text-white">
      {displayNav && (
        <div ref={navBar}>
          <HiddenNavAlphabet componentFont={componentFont} />
        </div>
      )}
      <div className=" bg-themeSuperDark/70 h-20  flex items-center m-0  justify-between px-6 fixed bottom-0 w-screen">
        <SidebarTrigger hidden={false} className="text-white" />
        <div className="pt-[10px]">
          <ModeToggle />
        </div>
        <button onClick={() => setDisplayNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-a-large-small">
            <path d="M21 14h-5" />
            <path d="M16 16v-3.5a2.5 2.5 0 0 1 5 0V16" />
            <path d="M4.5 13h6" />
            <path d="m3 16 4.5-9 4.5 9" />
          </svg>
        </button>
        <MessageCircleCode onClick={() => setDisplayCommets(true)} className="w-[30] h-[30]" />
      </div>
    </div>
  );
}
