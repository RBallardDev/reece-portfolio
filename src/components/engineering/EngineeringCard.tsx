"use client";

import { useState } from "react";
import Image from "next/image";

type EngineeringCardProps = {
  title: string;
  type: string;
  previousType?: string;
  coverImage?: string;
  coverBg?: string;
  coverContain?: boolean;
  coverOffsetX?: number;
  summary: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onClick?: () => void;
};

export default function EngineeringCard({
  title,
  type,
  previousType,
  coverImage,
  coverBg,
  coverContain,
  coverOffsetX,
  summary,
  onHoverStart,
  onHoverEnd,
  onClick,
}: EngineeringCardProps) {
  const [isRoleHovered, setIsRoleHovered] = useState(false);
  const hasPromotion = !!previousType;

  return (
    <div
      className="group rounded-xl border border-white/10 bg-white/0 p-5 transition-colors hover:border-white/25 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30 focus-visible:outline-offset-2 cursor-pointer"
      tabIndex={0}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
    >
      {/* Cover image — only rendered when one exists */}
      {coverImage && (
        <div
          className="relative -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-xl bg-white/5 aspect-[16/9]"
          style={coverBg ? { backgroundColor: coverBg } : undefined}
        >
          <Image
            src={coverImage}
            alt={`${title} cover`}
            width={1200}
            height={675}
            quality={100}
            unoptimized
            className={`w-full h-full ${coverContain ? "object-contain p-8" : "object-cover"}`}
            style={coverOffsetX ? { transform: `translateX(${coverOffsetX}px)` } : undefined}
            sizes="100vw"
            priority={false}
          />
        </div>
      )}
      
      {/* Type label with optional promotion arrow */}
      {hasPromotion ? (
        <>
          {/* Desktop: full-width hover row */}
          <div
            className="hidden sm:flex items-center gap-1 text-xs uppercase tracking-wider text-white/50 mb-1 cursor-default"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsRoleHovered(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsRoleHovered(false);
            }}
          >
            <span className="transition-opacity duration-200">
              {isRoleHovered ? previousType : type}
            </span>
            <span
              className={`inline-block transition-all duration-200 ${
                isRoleHovered ? "opacity-0 scale-75" : "opacity-100 scale-100"
              }`}
              style={{ transform: `rotate(45deg) ${isRoleHovered ? "scale(0.75)" : "scale(1)"}` }}
              aria-hidden="true"
            >
              ↑
            </span>
          </div>
          {/* Mobile: always show current type with arrow (no hover) */}
          <p className="sm:hidden flex items-center gap-1 text-xs uppercase tracking-wider text-white/50 mb-1">
            <span>{type}</span>
            <span
              className="inline-block"
              style={{ transform: "rotate(45deg)" }}
              aria-hidden="true"
            >
              ↑
            </span>
          </p>
        </>
      ) : (
        <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
          {type}
        </p>
      )}
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      
      {/* Summary */}
      <p className="text-sm text-white/60 leading-relaxed">
        {summary}
      </p>
    </div>
  );
}
