"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import HeroFace from "./HeroFace";
import MobileCircleRevealText from "@/components/motion/MobileCircleRevealText";
import dynamic from "next/dynamic";

const HeroModelPreview = dynamic(() => import("./HeroModelPreview"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-md rounded-2xl border border-white/10 flex items-center justify-center text-white/40 text-sm">
      Loading…
    </div>
  ),
});

export default function HeroSection() {
  const [showExplore, setShowExplore] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setShowExplore(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Left: Intro text */}
      <motion.div
        className="flex flex-col justify-center items-center text-center sm:items-start sm:text-left"
        {...(!prefersReducedMotion
          ? {
              initial: { opacity: 0, scale: 0.96, y: 8 },
              animate: { opacity: 1, scale: 1, y: 0 },
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
            }
          : {})}
      >
        <p className="text-xs uppercase tracking-widest text-white/60 mb-4">
          Los Angeles, CA | Remote
        </p>
        {/* Animated face (mobile) / Static headline (desktop) */}
        <HeroFace />
        <MobileCircleRevealText
          className="mt-6 text-lg leading-relaxed text-white/70 max-w-md mx-auto sm:mx-0 text-center sm:text-left"
          delay={0.5}
        >
          I design and build web + mobile apps end-to-end — UI/UX, front-end,
          back-end, integrations (auth, payments, APIs), and deployment.
        </MobileCircleRevealText>
        <p className="mt-8 text-xs uppercase tracking-widest text-white/70 max-w-md overflow-hidden text-center sm:text-left">
          <span
            className={`inline-block transition-all duration-700 ease-out will-change-transform ${
              showExplore
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-2 blur-sm"
            }`}
          >
            explore ↓
          </span>
        </p>
      </motion.div>

      {/* Right: 3D preview */}
      <div className="hidden lg:flex items-center justify-center">
        <HeroModelPreview />
      </div>
    </section>
  );
}
