"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

type MenuStickmanProps = {
  visible: boolean;
};

export default function MenuStickman({ visible }: MenuStickmanProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isRespawning, setIsRespawning] = useState(false);
  const prevVisibleRef = useRef(visible);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  // Detect respawn (hidden -> visible transition)
  useEffect(() => {
    const wasHidden = !prevVisibleRef.current;
    const nowVisible = visible;
    
    if (wasHidden && nowVisible) {
      // Respawning - trigger fade in animation
      setIsRespawning(true);
      // Clear respawning state after animation completes
      const timer = setTimeout(() => {
        setIsRespawning(false);
      }, 350);
      return () => clearTimeout(timer);
    }
    
    prevVisibleRef.current = visible;
  }, [visible]);

  // Determine visibility class
  let visibilityClass: string;
  if (visible) {
    if (isRespawning && !reducedMotion) {
      visibilityClass = "menu-stickman-fadein";
    } else {
      visibilityClass = "menu-stickman-visible";
    }
  } else {
    visibilityClass = reducedMotion ? "menu-stickman-hidden" : "menu-stickman-fadeout";
  }

  return (
    <div
      className={`menu-stickman-container relative ${visibilityClass}`}
      style={{ 
        width: "14px", 
        height: "28px",
        marginRight: "-2px", // Push flush against hamburger
      }}
    >
      <Image
        src="/icons/stickman-lean.svg"
        alt=""
        width={14}
        height={28}
        className="w-full h-full"
        style={{ objectFit: "contain" }}
        aria-hidden="true"
      />
    </div>
  );
}
