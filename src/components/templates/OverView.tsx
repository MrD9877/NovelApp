"use client";
import React, { useState } from "react";

interface OverViewComponent {
  overview: string[];
  className?: string;
}

function DisplayOverview({ overview }: { overview: string[] }) {
  return (
    <>
      {overview.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </>
  );
}

export default function OverView({ overview, className }: OverViewComponent) {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className={`mx-auto p-4 ${className}`}>
      <div className="text-start text-xl pb-2">Overview</div>
      {/* overview  */}
      <div className="text-sidebar dark:text-themeLightText">
        {overview.length < 2 && (
          <div>
            <DisplayOverview overview={overview} />
          </div>
        )}
        {overview.length > 2 &&
          (readMore ? (
            <div>
              <DisplayOverview overview={overview} />
              <button className="text-blue-700" onClick={() => setReadMore(false)}>
                ...Read Less
              </button>
            </div>
          ) : (
            <div>
              {<DisplayOverview overview={overview.slice(0, 2)} />}...
              <button className="text-blue-700" onClick={() => setReadMore(true)}>
                Read More
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
