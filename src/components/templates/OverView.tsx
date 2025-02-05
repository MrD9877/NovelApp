"use client";
import React, { useState } from "react";

interface OverViewComponent {
  overview: string;
  className?: string;
}

export default function OverView({ overview, className }: OverViewComponent) {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className={`mx-auto p-4 ${className}`}>
      <div className="text-start text-xl pb-2">Overview</div>
      {/* overview  */}
      <div className="text-sidebar dark:text-themeLightText">
        {overview.length < 100 && <div>{overview}</div>}
        {overview.length > 100 &&
          (readMore ? (
            <div>
              {overview}.
              <button className="text-blue-700" onClick={() => setReadMore(false)}>
                ...Read Less
              </button>
            </div>
          ) : (
            <div>
              {overview.split("").slice(0, 100).join("")}...
              <button className="text-blue-700" onClick={() => setReadMore(true)}>
                Read More
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
