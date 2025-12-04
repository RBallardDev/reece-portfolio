"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type SpotlightOverlayProps = {
  active: boolean;
  targetRef: RefObject<HTMLElement | null>;
  mousePosition?: { x: number; y: number } | null;
  radius?: number;
};

export default function SpotlightOverlay({
  active,
  targetRef,
  mousePosition,
  radius = 220,
}: SpotlightOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update spotlight position based on mouse or target center
  useEffect(() => {
    const updatePosition = () => {
      // If we have mouse position, use it
      if (mousePosition) {
        setPosition({ x: mousePosition.x, y: mousePosition.y });
        return;
      }

      // Otherwise fall back to target center (for keyboard focus)
      const target = targetRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setPosition({ x: centerX, y: centerY });
    };

    if (active) {
      updatePosition();
      setVisible(true);

      // Update on resize/scroll for keyboard focus fallback
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
      };
    } else {
      setVisible(false);
    }
  }, [active, targetRef, mousePosition]);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={overlayRef}
      className="spotlight-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: prefersReducedMotion ? "none" : "opacity 0.3s ease-out",
        background: "rgba(0, 0, 0, 0.8)",
        maskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, transparent 0%, transparent 50%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, transparent 0%, transparent 50%, black 100%)`,
      }}
      aria-hidden="true"
    />
  );
}

