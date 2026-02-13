"use client";

import { useCallback, useRef, useState } from "react";
import type { CreativeGallery } from "@/data/creativeGalleries";

type GalleryStackCardProps = {
  gallery: CreativeGallery;
  onClick?: () => void;
};

// Stack layer configurations (from back to front)
const STACK_LAYERS = [
  { offset: 12, rotate: 3 },
  { offset: 8, rotate: -2 },
  { offset: 4, rotate: 1.5 },
  { offset: 0, rotate: 0 }, // Top card
];

export default function GalleryStackCard({
  gallery,
  onClick,
}: GalleryStackCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useState(() => {
    if (typeof window !== "undefined") {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(query.matches);
    }
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick]
  );

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="relative w-full aspect-[4/5] cursor-pointer group outline-none"
      aria-label={`Open ${gallery.title} gallery with ${gallery.count} ${gallery.countLabel.toLowerCase()}`}
    >
      {/* Stack layers */}
      {STACK_LAYERS.map((layer, index) => {
        const isTopCard = index === STACK_LAYERS.length - 1;
        const hoverOffset = !reducedMotion && isHovered ? -2 : 0;
        const hoverRotate =
          !reducedMotion && isHovered ? layer.rotate * 0.5 : layer.rotate;

        return (
          <div
            key={index}
            className="absolute inset-0 rounded-2xl border border-white/15 overflow-hidden transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${layer.offset + hoverOffset}px) rotate(${hoverRotate}deg)`,
              zIndex: index,
              background: isTopCard ? gallery.theme.gradient : "#1a1a1a",
              boxShadow: isTopCard
                ? "0 8px 32px rgba(0,0,0,0.4)"
                : "0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            {/* Top card content */}
            {isTopCard && (
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                {/* Top row: title and count */}
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                    {gallery.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-white/90">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM3.5 4.25a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v8.19l-2.72-2.72a.75.75 0 00-1.06 0l-2.72 2.72-1.22-1.22a.75.75 0 00-1.06 0L3.5 14.44V4.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">
                      {gallery.count} {gallery.countLabel}
                    </span>
                  </div>
                </div>

                {/* Bottom: subtle hover indicator */}
                <div
                  className={`text-xs text-white/50 transition-opacity duration-200 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Coming soon
                </div>
              </div>
            )}

            {/* Subtle inner glow for back cards */}
            {!isTopCard && (
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(180deg, ${gallery.theme.accent}20 0%, transparent 50%)`,
                }}
              />
            )}
          </div>
        );
      })}

      {/* Focus ring */}
      <div
        className="absolute inset-0 rounded-2xl ring-2 ring-white/0 group-focus-visible:ring-white/40 transition-all duration-200 pointer-events-none"
        style={{ zIndex: STACK_LAYERS.length }}
      />
    </button>
  );
}



