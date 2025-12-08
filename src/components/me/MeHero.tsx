"use client";

import { useEffect, useState, useRef, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";

const HIGHLIGHT_PALETTE = [
  "#163CE0",
  "#FFD20F",
  "#F6082A",
  "#FF8509",
  "#17A745",
  "#502B92",
];

const emphasized = "font-semibold text-white";
const muted = "font-semibold text-white/55";

const photos = [
  { src: "/images/me/eating1.jpg", alt: "Reece eating sushi (1)" },
  { src: "/images/me/eating2.jpg", alt: "Reece eating sushi (2)" },
];

// Transition duration in ms (matches CSS duration-700)
const FADE_DURATION = 1200;
// How long colors stay visible
const HOLD_DURATION = 3000;

const Paragraph = ({
  highlightColors,
  onHoverStart,
  onHoverEnd,
  isMobile,
}: {
  highlightColors: (string | null)[];
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isMobile: boolean;
}) => {
  const wordStyle = (idx: number) => {
    const color = highlightColors[idx];
    return {
      color: color ?? undefined,
      textShadow: color ? `0 0 18px ${color}55` : undefined,
    } as React.CSSProperties;
  };

  return (
    <p
      className={`text-4xl leading-tight ${muted}`}
      onMouseEnter={isMobile ? undefined : onHoverStart}
      onMouseLeave={isMobile ? undefined : onHoverEnd}
    >
      I love to{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(0)}>
        build
      </span>{" "}
      products that feel simple and steady. The goal is always to{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(1)}>
        ship
      </span>{" "}
      with clarity and calm pace. I obsess over{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(2)}>
        systems
      </span>{" "}
      that reduce friction between people and code.{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(3)}>
        Design
      </span>{" "}
      matters because it channels{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(4)}>
        curiosity
      </span>{" "}
      into things people actually use. I care about{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(5)}>
        craft
      </span>{" "}
      and keeping{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(6)}>
        momentum
      </span>{" "}
      so we keep learning.
    </p>
  );
};

// Hook to detect mobile breakpoint (md = 768px)
function useIsMobile() {
  const subscribe = useCallback((onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const query = window.matchMedia("(max-width: 767px)");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  }, []);

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function MeHero() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [highlightColors, setHighlightColors] = useState<Array<string | null>>(
    Array(7).fill(null)
  );
  const isMobile = useIsMobile();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Photo rotation
  useEffect(() => {
    const id = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const generateRandomColors = useCallback(() => {
    return Array(7)
      .fill(null)
      .map(() => HIGHLIGHT_PALETTE[Math.floor(Math.random() * HIGHLIGHT_PALETTE.length)]);
  }, []);

  const randomizeHighlights = useCallback(() => {
    setHighlightColors(generateRandomColors());
  }, [generateRandomColors]);

  const resetHighlights = useCallback(() => {
    setHighlightColors(Array(7).fill(null));
  }, []);

  // Mobile auto-pulse effect
  useEffect(() => {
    if (!isMobile) return;

    // Phase: "colored" or "white"
    let phase: "colored" | "white" = "white";

    const cycle = () => {
      if (phase === "white") {
        // Fade in to colors
        setHighlightColors(generateRandomColors());
        phase = "colored";
        // Hold colors for HOLD_DURATION, then transition to white
        timeoutRef.current = setTimeout(cycle, HOLD_DURATION);
      } else {
        // Fade out to white
        setHighlightColors(Array(7).fill(null));
        phase = "white";
        // After fade completes, immediately start new colors
        timeoutRef.current = setTimeout(cycle, FADE_DURATION);
      }
    };

    // Start the cycle
    cycle();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setHighlightColors(Array(7).fill(null));
    };
  }, [isMobile, generateRandomColors]);

  return (
    <section>
      {/* Header row - title left, tabs right */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Me</h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-sm font-medium text-white"
            aria-current="page"
          >
            [Summary]
          </button>
          <button
            type="button"
            className="text-sm font-medium text-white/30 cursor-not-allowed"
            aria-disabled="true"
            disabled
          >
            [Timeline]
          </button>
        </div>
      </div>

      {/* Content row - paragraph left, photo right */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
        <div>
          <Paragraph
            highlightColors={highlightColors}
            onHoverStart={randomizeHighlights}
            onHoverEnd={resetHighlights}
            isMobile={isMobile}
          />
        </div>

        <div className="space-y-2 md:flex md:flex-col md:items-end">
          <div className="w-full max-w-[480px] md:ml-auto aspect-[4/5] rounded-2xl border border-white/10 bg-white/5 overflow-hidden relative">
            <Image
              key={photos[photoIndex].src}
              src={photos[photoIndex].src}
              alt={photos[photoIndex].alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 480px, 90vw"
              priority
            />
          </div>
          <p className="text-xs text-white/50 text-left w-full max-w-[480px] md:ml-auto italic">
            New York City — East Village (2025) | Shot by Nicole Lenzen | Fun fact: eel rolls are my favorite.
          </p>
        </div>
      </div>
    </section>
  );
}
