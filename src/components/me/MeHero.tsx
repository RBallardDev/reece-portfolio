"use client";

import { useEffect, useState } from "react";
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

const Paragraph = ({
  highlightColors,
  onHoverStart,
  onHoverEnd,
}: {
  highlightColors: (string | null)[];
  onHoverStart: () => void;
  onHoverEnd: () => void;
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
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      I love to{" "}
      <span className={`${emphasized} transition-all duration-300`} style={wordStyle(0)}>
        build
      </span>{" "}
      products that feel simple and steady. The goal is always to{" "}
      <span className={`${emphasized} transition-all duration-300`} style={wordStyle(1)}>
        ship
      </span>{" "}
      with clarity and calm pace. I obsess over{" "}
      <span className={`${emphasized} transition-all duration-300`} style={wordStyle(2)}>
        systems
      </span>{" "}
      that reduce friction between people and code.{" "}
      <span className={`${emphasized} transition-all duration-300`} style={wordStyle(3)}>
        Design
      </span>{" "}
      matters because it channels{" "}
      <span className={`${emphasized} transition-all duration-300`} style={wordStyle(4)}>
        curiosity
      </span>{" "}
      into things people actually use. I care about{" "}
      <span className={`${emphasized} transition-all duration-300`} style={wordStyle(5)}>
        craft
      </span>{" "}
      and keeping{" "}
      <span className={`${emphasized} transition-all duration-300`} style={wordStyle(6)}>
        momentum
      </span>{" "}
      so we keep learning.
    </p>
  );
};

export default function MeHero() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [highlightColors, setHighlightColors] = useState<Array<string | null>>(
    Array(7).fill(null)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const randomizeHighlights = () => {
    setHighlightColors(
      Array(7)
        .fill(null)
        .map(() => HIGHLIGHT_PALETTE[Math.floor(Math.random() * HIGHLIGHT_PALETTE.length)])
    );
  };

  const resetHighlights = () => {
    setHighlightColors(Array(7).fill(null));
  };

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
