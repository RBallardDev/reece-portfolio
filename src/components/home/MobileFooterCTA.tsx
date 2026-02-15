"use client";

import { useRef, useState, useEffect } from "react";

function FullWidthLine({ label, color }: { label: string; color: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const calculateFontSize = () => {
      const containerWidth = window.innerWidth;

      let low = 16;
      let high = 500;
      let bestFit = 16;

      text.style.visibility = "hidden";
      text.style.position = "absolute";
      text.style.whiteSpace = "nowrap";

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        if (text.offsetWidth <= containerWidth) {
          bestFit = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      text.style.visibility = "";
      text.style.position = "";
      text.style.whiteSpace = "";

      setFontSize(bestFit);
    };

    calculateFontSize();
    window.addEventListener("resize", calculateFontSize);
    return () => window.removeEventListener("resize", calculateFontSize);
  }, [label]);

  const baselineOffset = fontSize * 0.12;

  return (
    <div
      className="w-screen overflow-hidden"
      style={{
        lineHeight: 0,
        margin: 0,
        padding: 0,
        height: `${fontSize * 0.75}px`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <span
        ref={textRef}
        className="font-bold tracking-tight uppercase whitespace-nowrap block"
        style={{
          fontSize: `${fontSize}px`,
          color,
          lineHeight: 1,
          padding: 0,
          margin: 0,
          transform: `translateX(-${fontSize * 0.02}px) translateY(-${baselineOffset}px)`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function MobileFooterCTA() {
  return (
    <div className="sm:hidden flex flex-col">
      <FullWidthLine label="WANT TO WORK" color="rgba(255,255,255,0.5)" />
      <FullWidthLine label="TOGETHER?" color="rgba(255,255,255,0.5)" />
      <FullWidthLine label="CONTACT ME!" color="#FFFFFF" />
    </div>
  );
}
