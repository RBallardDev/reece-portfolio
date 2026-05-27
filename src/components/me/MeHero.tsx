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

const HIGHLIGHT_COUNT = 10;

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

  /* --- 34-highlight version (all buzzwords) ---
  return (
    <p
      className={`text-4xl leading-tight ${muted}`}
      onMouseEnter={isMobile ? undefined : onHoverStart}
      onMouseLeave={isMobile ? undefined : onHoverEnd}
    >
      I&apos;m a{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(0)}>full-stack</span>
      {" "}and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(1)}>AI native</span>
      {" "}engineer based in LA and working remote. I{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(2)}>build</span>
      {" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(3)}>web</span>
      {" "}apps,{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(4)}>mobile</span>
      {" "}apps,{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(5)}>internal tools</span>
      , and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(6)}>AI-powered</span>
      {" "}products{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(7)}>end-to-end</span>
      {" "}&mdash;{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(8)}>UI/UX</span>
      ,{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(9)}>database architecture</span>
      ,{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(10)}>integrations</span>
      ,{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(11)}>deployment</span>
      , all of it. My main stack is{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(12)}>React</span>
      ,{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(13)}>Next.js</span>
      , and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(14)}>TypeScript</span>
      {" "}on the{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(15)}>frontend</span>
      ,{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(16)}>Python</span>
      ,{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(17)}>Node.js</span>
      , and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(18)}>Supabase</span>
      {" "}on the{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(19)}>backend</span>
      , and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(20)}>SwiftUI</span>
      {" "}and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(21)}>React Native</span>
      {" "}for{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(22)}>mobile</span>
      .
      <br /><br />
      I&apos;ve{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(23)}>shipped</span>
      {" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(24)}>platforms</span>
      {" "}used by over{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(25)}>20,000</span>
      {" "}people, turned clients&apos;{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(26)}>vibecoded</span>
      {" "}apps into scalable{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(27)}>production-ready</span>
      {" "}products, designed{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(28)}>recommendation engines</span>
      , and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(29)}>founded</span>
      {" "}my own product development company. I work{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(30)}>fast</span>
      , I care about{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(31)}>details</span>
      , and I&apos;m at my best with a{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(32)}>full night of sleep</span>
      {" "}and a{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(33)}>cup of coffee!</span>
    </p>
  );
  --- end 34-highlight version --- */

  return (
    <p
      className={`text-4xl leading-tight ${muted}`}
      onMouseEnter={isMobile ? undefined : onHoverStart}
      onMouseLeave={isMobile ? undefined : onHoverEnd}
    >
      I&apos;m a{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(0)}>full-stack</span>
      {" "}and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(1)}>AI native</span>
      {" "}engineer based in LA and working remote. I{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(2)}>build</span>
      {" "}web apps, mobile apps, internal tools, and AI-powered products{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(3)}>end-to-end</span>
      {" "}&mdash; UI/UX, database architecture, integrations, deployment, all of it. My main stack is React, Next.js, and TypeScript on the frontend, Python, Node.js, and Supabase on the backend, and SwiftUI and React Native for mobile.
      <br /><br />
      I&apos;ve{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(4)}>shipped</span>
      {" "}platforms used by over{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(5)}>20,000</span>
      {" "}people, turned clients&apos;{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(6)}>vibecoded</span>
      {" "}apps into scalable production-ready products, designed recommendation engines, and{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(7)}>founded</span>
      {" "}my own product development company. I work fast, I care about{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(8)}>details</span>
      , and I&apos;m at my best with a full night of sleep and a{" "}
      <span className={`${emphasized} transition-all duration-700`} style={wordStyle(9)}>cup of coffee!</span>
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
    Array(HIGHLIGHT_COUNT).fill(null)
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
    return Array(HIGHLIGHT_COUNT)
      .fill(null)
      .map(() => HIGHLIGHT_PALETTE[Math.floor(Math.random() * HIGHLIGHT_PALETTE.length)]);
  }, []);

  const randomizeHighlights = useCallback(() => {
    setHighlightColors(generateRandomColors());
  }, [generateRandomColors]);

  const resetHighlights = useCallback(() => {
    setHighlightColors(Array(HIGHLIGHT_COUNT).fill(null));
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
        setHighlightColors(Array(HIGHLIGHT_COUNT).fill(null));
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
      setHighlightColors(Array(HIGHLIGHT_COUNT).fill(null));
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

      {/* Content — float layout so text wraps underneath image on desktop */}
      <div className="overflow-hidden">
        {/* Mobile: image below text (stacked) / Desktop: floated right */}
        <div className="mb-8 md:mb-0 md:float-right md:ml-10 md:w-[45%] lg:w-[40%] space-y-2 order-first md:order-none">
          <div className="w-full aspect-[4/5] rounded-2xl border border-white/10 bg-white/5 overflow-hidden relative">
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
          <p className="text-xs text-white/50 text-left italic">
            New York City — East Village (2025) | Shot by Nicole Lenzen | Fun fact: eel rolls are my favorite.
          </p>
        </div>

        <Paragraph
          highlightColors={highlightColors}
          onHoverStart={randomizeHighlights}
          onHoverEnd={resetHighlights}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}
