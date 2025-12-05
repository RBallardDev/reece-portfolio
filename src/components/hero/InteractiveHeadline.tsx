"use client";

import { type ReactNode, useEffect, useState } from "react";

type InteractiveHeadlineProps = {
  text: ReactNode;
  className?: string;
};

export default function InteractiveHeadline({
  text,
  className = "",
}: InteractiveHeadlineProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const loveClassNames = [
    "loveWord",
    reduceMotion ? "love-reduce-motion" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={`interactive-headline relative inline cursor-default ${className}`}
      style={{
        // Ensure tight bounding box around text
        lineHeight: 1,
        padding: 0,
        margin: 0,
      }}
    >
      {typeof text === "string" ? (
        text
      ) : (
        <>
          Doing what I{" "}
          <span
            className={loveClassNames}
            tabIndex={0}
            role="text"
          >
            <span className="loveFill">love</span>
            <span className="loveStroke" aria-hidden="true">
              love
            </span>
          </span>
          .
        </>
      )}
    </span>
  );
}
