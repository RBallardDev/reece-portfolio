"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type InteractiveHeadlineProps = {
  text: ReactNode;
  className?: string;
};

export default function InteractiveHeadline({
  text,
  className = "",
}: InteractiveHeadlineProps) {
  const [loveAnimating, setLoveAnimating] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const LOVE_ANIM_DURATION = 2500;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const triggerLoveAnimation = () => {
    if (loveAnimating) return;
    setLoveAnimating(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLoveAnimating(false), LOVE_ANIM_DURATION);
  };

  const loveClassNames = [
    "loveWord",
    loveAnimating ? "love-animating" : "",
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
            onMouseEnter={triggerLoveAnimation}
            onFocus={triggerLoveAnimation}
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
