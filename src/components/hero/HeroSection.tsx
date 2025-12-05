"use client";

import { useEffect, useState } from "react";
import InteractiveHeadline from "./InteractiveHeadline";
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

  useEffect(() => {
    const timer = setTimeout(() => setShowExplore(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Left: Intro text */}
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-widest text-white/60 mb-4">
          Doing what I love.
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <InteractiveHeadline text="Software Engineer & Creative" />
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-md">
          Web + mobile apps, UI systems, and the occasional ML or 3D experiment.
          If it&apos;s fun, I&apos;ll probably ship it.
        </p>
        <p className="mt-8 text-xs uppercase tracking-widest text-white/70 max-w-md overflow-hidden">
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
      </div>

      {/* Right: 3D preview */}
      <div className="hidden lg:flex items-center justify-center">
        <HeroModelPreview />
      </div>
    </section>
  );
}
