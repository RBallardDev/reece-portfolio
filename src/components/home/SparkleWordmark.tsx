"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const SPARKLE_COLORS = [
  "#163CE0",
  "#FFD20F",
  "#F6082A",
  "#FF8509",
  "#17A745",
  "#502B92",
];

// Spawn sparkles on document.body so they're not clipped
function spawnSparkles(x: number, y: number) {
  const particleCount = 8 + Math.floor(Math.random() * 4);
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "contact-sparkle";
    const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
    const size = 3 + Math.random() * 3;
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
    const velocity = 20 + Math.random() * 30;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      --sparkle-vx: ${vx}px;
      --sparkle-vy: ${vy}px;
    `;

    document.body.appendChild(particle);
    particles.push(particle);
  }

  setTimeout(() => {
    particles.forEach((p) => p.remove());
  }, 800);
}

type CharData = {
  char: string;
  flipped?: boolean;
};

// The wordmark characters with the flipped D
const WORDMARK_CHARS: CharData[] = [
  { char: "R" },
  { char: "B" },
  { char: "A" },
  { char: "L" },
  { char: "L" },
  { char: "A" },
  { char: "R" },
  { char: "D", flipped: true },
  { char: "D" },
  { char: "E" },
  { char: "V" },
];

export default function SparkleWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(500);

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

    return () => {
      window.removeEventListener("resize", calculateFontSize);
    };
  }, []);

  const handleCharHover = useCallback((e: React.MouseEvent) => {
    spawnSparkles(e.clientX, e.clientY);
  }, []);

  const baselineOffset = fontSize * 0.12;

  return (
    <div
      ref={containerRef}
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
        className="font-bold tracking-tight uppercase text-white/90 whitespace-nowrap"
        style={{
          fontSize: `${fontSize}px`,
          display: "block",
          lineHeight: 1,
          padding: 0,
          margin: 0,
          transform: `translateX(-${fontSize * 0.04}px) translateY(-${baselineOffset}px)`,
        }}
      >
        {WORDMARK_CHARS.map((charData, index) => {
          // Add gap between "RBALL" and "ARDDEV" (after index 4, the second L)
          const gapStyle = index === 5 ? { marginLeft: "0.04em" } : undefined;
          const flipStyle = charData.flipped ? { transform: "scaleX(-1)" } : undefined;
          const combinedStyle = { ...flipStyle, ...gapStyle };
          
          return (
            <span
              key={index}
              className="inline-block cursor-default"
              style={Object.keys(combinedStyle).length > 0 ? combinedStyle : undefined}
              onMouseEnter={handleCharHover}
            >
              {charData.char}
            </span>
          );
        })}
      </span>
    </div>
  );
}

