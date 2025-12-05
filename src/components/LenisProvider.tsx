"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85, // slightly snappier feel
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    // Expose lenis globally for scrollTo calls
    window.lenis = lenis;

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return null;
}
