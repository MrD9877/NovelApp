import React from "react";
import { Loader } from "lucide-react";

export default function LoadingSpinner({ className, width, height }: { className?: string; width?: string; height?: string }) {
  return (
    <div style={{ width: width, height: height }} className={`justify-center items-center flex ${className}`}>
      <div className="w-fit mx-auto">
        <Loader className=" animate-spin" />
      </div>
    </div>
  );
}
