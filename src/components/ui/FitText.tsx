"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

type FitTextProps = {
  children: ReactNode;
  className?: string;
  minFontSize?: number;
  maxFontSize?: number;
};

export default function FitText({
  children,
  className = "",
  minFontSize = 16,
  maxFontSize = 500,
}: FitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const calculateFontSize = () => {
      const containerWidth = container.offsetWidth;
      
      // Binary search for the right font size
      let low = minFontSize;
      let high = maxFontSize;
      let bestFit = minFontSize;

      // Temporarily make text visible for measurement
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

      // Reset styles
      text.style.visibility = "";
      text.style.position = "";
      text.style.whiteSpace = "";

      setFontSize(bestFit);
    };

    calculateFontSize();

    const resizeObserver = new ResizeObserver(calculateFontSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [children, minFontSize, maxFontSize]);

  // Calculate offset to eliminate baseline gap
  // For uppercase text, we can use a very tight line-height
  // and shift down slightly to sit on the bottom edge
  const baselineOffset = fontSize * 0.12; // ~12% of font size for baseline adjustment

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ 
        lineHeight: 0, 
        margin: 0, 
        padding: 0,
        height: `${fontSize * 0.75}px`, // Crop to just the visible cap height
      }}
    >
      <span
        ref={textRef}
        className={className}
        style={{ 
          fontSize: `${fontSize}px`, 
          display: "block",
          lineHeight: 1,
          padding: 0,
          margin: 0,
          transform: `translateY(-${baselineOffset}px)`,
        }}
      >
        {children}
      </span>
    </div>
  );
}
