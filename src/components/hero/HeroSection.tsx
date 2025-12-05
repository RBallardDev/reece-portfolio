"use client";

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
  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Left: Intro text */}
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-widest text-white/60 mb-4">
          Software Engineer &amp; Creative
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <InteractiveHeadline
            text={
              <>
                Doing what I{" "}
                <span className="loveWord" tabIndex={0} role="text">
                  <span className="loveFill">love</span>
                  <span className="loveStroke" aria-hidden="true">
                    love
                  </span>
                </span>
                .
              </>
            }
          />
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-md">
          Web + mobile apps, UI systems, and the occasional ML or 3D experiment.
          If it&apos;s fun, I&apos;ll probably ship it.
        </p>
      </div>

      {/* Right: 3D preview */}
      <div className="hidden lg:flex items-center justify-center">
        <HeroModelPreview />
      </div>
    </section>
  );
}
