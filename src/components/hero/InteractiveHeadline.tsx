"use client";

import { useRef, useState, useCallback } from "react";
import SpotlightOverlay from "@/components/ui/SpotlightOverlay";

type InteractiveHeadlineProps = {
  text: string;
  className?: string;
};

export default function InteractiveHeadline({
  text,
  className = "",
}: InteractiveHeadlineProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  // Handle hover
  const handleMouseEnter = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setMousePosition(null);
  }, []);

  // Track mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Handle keyboard focus
  const handleFocus = useCallback(() => {
    setIsActive(true);
    setMousePosition(null); // Use center fallback for keyboard
  }, []);

  const handleBlur = useCallback(() => {
    setIsActive(false);
    setMousePosition(null);
  }, []);

  return (
    <>
      <span
        ref={containerRef}
        className={`interactive-headline relative inline cursor-default ${className}`}
        tabIndex={0}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          // Ensure tight bounding box around text
          lineHeight: 1,
          padding: 0,
          margin: 0,
        }}
      >
        {text}
      </span>
      <SpotlightOverlay
        active={isActive}
        targetRef={containerRef}
        mousePosition={mousePosition}
        radius={280}
      />
    </>
  );
}
