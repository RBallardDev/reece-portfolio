"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Code, Palette, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

const CONFETTI_COLORS = [
  "#163CE0", "#FFD20F", "#F6082A",
  "#FF8509", "#17A745", "#502B92",
];

function spawnConfetti(x: number, y: number) {
  const count = 25 + Math.floor(Math.random() * 10);
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti-particle";
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size = 4 + Math.random() * 5;
    const angle = Math.random() * Math.PI * 2;
    const velocity = 40 + Math.random() * 70;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 20;
    const rotation = Math.random() * 360;

    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      pointer-events: none;
      z-index: 9999;
      --vx: ${vx}px;
      --vy: ${vy}px;
      --rotation: ${rotation}deg;
    `;

    document.body.appendChild(particle);
    particles.push(particle);
  }

  setTimeout(() => {
    particles.forEach((p) => p.remove());
  }, 1000);
}

function playPopSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // 1. High-pitched "boing" — starts high, swoops down
    const boing = ctx.createOscillator();
    boing.type = "sine";
    boing.frequency.setValueAtTime(1200, now);
    boing.frequency.exponentialRampToValueAtTime(200, now + 0.2);

    const boingGain = ctx.createGain();
    boingGain.gain.setValueAtTime(0.3, now);
    boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    boing.connect(boingGain);
    boingGain.connect(ctx.destination);
    boing.start(now);
    boing.stop(now + 0.25);

    // 2. Quick triangle "pop" hit
    const pop = ctx.createOscillator();
    pop.type = "triangle";
    pop.frequency.setValueAtTime(800, now);
    pop.frequency.exponentialRampToValueAtTime(100, now + 0.08);

    const popGain = ctx.createGain();
    popGain.gain.setValueAtTime(0.35, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    pop.connect(popGain);
    popGain.connect(ctx.destination);
    pop.start(now);
    pop.stop(now + 0.1);

    // 3. Bright noise "pff" for sparkle
    const noiseLength = 0.12;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * noiseLength, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / noiseData.length, 2);
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 3000;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseLength);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);

    // Clean up context after sounds finish
    setTimeout(() => ctx.close(), 400);
  } catch {
    // Audio not supported — silently skip
  }
}

type QuadrantConfig = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Extra classes for the quadrant (borders, position) */
  className: string;
  /** Optional style overrides (e.g. font-family for Japanese) */
  style?: CSSProperties;
};

const quadrants: QuadrantConfig[] = [
  {
    title: "Me",
    description: "Who I am and what drives me.",
    href: "/me",
    icon: User,
    className: "",
  },
  {
    title: "Engineering",
    description: "Software projects and technical work.",
    href: "/engineering",
    icon: Code,
    className: "",
  },
  {
    title: "Creative",
    description: "Design, photography, and visual experiments.",
    href: "/creative",
    icon: Palette,
    className: "",
  },
  {
    title: "日本語",
    description: "My journey learning Japanese.",
    href: "/japanese",
    icon: Languages,
    className: "",
    style: { fontFamily: '"Noto Sans JP", system-ui, sans-serif' },
  },
];

// Lerp between two RGB colors based on t (0–1)
function lerpColor(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, t: number) {
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

const CHARGE_DURATION = 1500; // ms to reach explosion
const COOLDOWN_FADE_SPEED = 0.03; // how fast charge drains when off the center

const SCROLL_THRESHOLD = 150; // px of scroll to reach full dim
const TRANSITION_DURATION = 900; // ms for the expand animation

export default function LandingGrid() {
  const router = useRouter();
  const cursorRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);
  const cursorVisibleRef = useRef(false);

  // Page transition state
  const [transition, setTransition] = useState<{
    index: number;
    href: string;
    rect: { top: number; left: number; width: number; height: number };
  } | null>(null);
  const transitionRef = useRef(false);
  // Charge progress: 0 = white, 1 = red/explode
  const chargeRef = useRef(0);
  const overCenterRef = useRef(false);
  const chargeStartRef = useRef<number | null>(null);

  // Refs for scroll-based fade
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const quadrantRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const connectRef = useRef<HTMLDivElement>(null);

  // Directly set cursor opacity on the DOM — no React re-render
  const showCursor = useCallback(() => {
    cursorVisibleRef.current = true;
    if (cursorRef.current) cursorRef.current.style.opacity = "1";
  }, []);
  const hideCursor = useCallback(() => {
    cursorVisibleRef.current = false;
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  }, []);

  // Handle quadrant click — trigger expand animation, then navigate
  const handleQuadrantClick = useCallback((e: React.MouseEvent, index: number, href: string) => {
    e.preventDefault();
    if (transitionRef.current) return;
    transitionRef.current = true;

    // Get the clicked quadrant's bounding rect
    const el = quadrantRefs.current[index];
    if (!el) {
      router.push(href);
      return;
    }
    const rect = el.getBoundingClientRect();
    setTransition({
      index,
      href,
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
    });

    // Hide cursor during transition
    hideCursor();

    // Navigate after animation completes
    setTimeout(() => {
      router.push(href);
    }, TRANSITION_DURATION);
  }, [router, hideCursor]);

  const triggerExplosion = useCallback((x: number, y: number) => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    chargeRef.current = 0;
    chargeStartRef.current = null;
    overCenterRef.current = false;

    // Hide cursor instantly, spawn confetti, play pop
    hideCursor();
    spawnConfetti(x, y);
    playPopSound();

    // Fade cursor back in after 2 seconds
    setTimeout(() => {
      showCursor();
      cooldownRef.current = false;
    }, 2000);
  }, [hideCursor, showCursor]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const center = centerRef.current;
    if (!cursor || !center) return;

    // Check for touch device — hide cursor follower
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const ease = 0.12; // Lower = more lag, higher = snappier
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!cursorVisibleRef.current && !cooldownRef.current) showCursor();
    };

    const handleMouseLeave = () => {
      if (!cooldownRef.current) hideCursor();
    };
    const handleMouseEnter = () => {
      if (!cooldownRef.current) showCursor();
    };

    const animate = () => {
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      cursor.style.transform = `translate(${current.x}px, ${current.y}px)`;

      // Collision detection with center name element
      if (!cooldownRef.current) {
        const rect = center.getBoundingClientRect();
        const cx = current.x;
        const cy = current.y;
        const isOver =
          cx >= rect.left &&
          cx <= rect.right &&
          cy >= rect.top &&
          cy <= rect.bottom;

        if (isOver) {
          // Start or continue charging
          if (!overCenterRef.current) {
            overCenterRef.current = true;
            chargeStartRef.current = performance.now();
          }

          const elapsed = performance.now() - (chargeStartRef.current ?? performance.now());
          chargeRef.current = Math.min(elapsed / CHARGE_DURATION, 1);

          if (chargeRef.current >= 1) {
            triggerExplosion(cx, cy);
          }
        } else {
          // Cool down — drain charge back to 0
          overCenterRef.current = false;
          chargeStartRef.current = null;
          if (chargeRef.current > 0) {
            chargeRef.current = Math.max(chargeRef.current - COOLDOWN_FADE_SPEED, 0);
          }
        }

        // Update cursor color: white (255,255,255) → red (246,8,42)
        const t = chargeRef.current;
        cursor.style.background = lerpColor(255, 255, 255, 246, 8, 42, t);
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [triggerExplosion, showCursor, hideCursor]);

  // Scroll-based fade: dim content and fade out borders as user scrolls down
  useEffect(() => {
    // Grab the footer element once
    const footer = document.querySelector("[data-landing-footer]") as HTMLElement | null;

    const updateScrollFade = (scrollY: number) => {
      const progress = Math.min(scrollY / SCROLL_THRESHOLD, 1);

      // Borders: fade to 0
      const borderOpacity = 1 - progress;
      if (hLineRef.current) hLineRef.current.style.opacity = String(borderOpacity);
      if (vLineRef.current) vLineRef.current.style.opacity = String(borderOpacity);

      // Quadrant content: dim to 0.3
      const contentOpacity = 1 - progress * 0.7;
      for (const ref of quadrantRefs.current) {
        if (ref) ref.style.opacity = String(contentOpacity);
      }

      // Center info: dim along with quadrants
      if (centerRef.current) centerRef.current.style.opacity = String(contentOpacity);

      // Connect hint: brightens as you scroll down (0.6 → 1)
      if (connectRef.current) connectRef.current.style.opacity = String(0.6 + progress * 0.4);

      // Footer: fades in on a delayed range (starts at 50px, full at 250px)
      const footerStart = 125;
      const footerEnd = 300;
      const footerProgress = Math.min(Math.max((scrollY - footerStart) / (footerEnd - footerStart), 0), 1);
      if (footer) footer.style.opacity = String(footerProgress);
    };

    // Try hooking into Lenis for smooth scroll sync
    const tryLenis = () => {
      const lenis = window.lenis;
      if (lenis) {
        const handler = ({ scroll }: { scroll: number }) => updateScrollFade(scroll);
        lenis.on("scroll", handler);
        // Run once with current position
        updateScrollFade(lenis.scroll ?? 0);
        return () => lenis.off("scroll", handler);
      }
      return undefined;
    };

    // Lenis may not be ready yet — poll briefly
    let cleanup = tryLenis();
    if (!cleanup) {
      const interval = setInterval(() => {
        cleanup = tryLenis();
        if (cleanup) clearInterval(interval);
      }, 100);
      return () => {
        clearInterval(interval);
        cleanup?.();
      };
    }

    return cleanup;
  }, []);

  return (
    <section className="relative h-dvh w-full grid grid-cols-2 grid-rows-2">
      {/* Cursor follower circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none transition-opacity duration-200"
        style={{
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          borderRadius: "50%",
          background: "white",
          opacity: 0,
        }}
      />
      {/* Divider lines — separate elements so we can fade them independently */}
      {/* Horizontal line */}
      <div
        ref={hLineRef}
        className="absolute left-0 right-0 top-1/2 h-px bg-white/10 z-[1] pointer-events-none"
        style={{
          opacity: transition ? 0 : undefined,
          transition: transition ? `opacity ${TRANSITION_DURATION * 0.4}ms ease-out` : undefined,
        }}
      />
      {/* Vertical line */}
      <div
        ref={vLineRef}
        className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10 z-[1] pointer-events-none"
        style={{
          opacity: transition ? 0 : undefined,
          transition: transition ? `opacity ${TRANSITION_DURATION * 0.4}ms ease-out` : undefined,
        }}
      />

      {/* Quadrant cells */}
      {quadrants.map((q, i) => {
        const Icon = q.icon;
        const isTransitioning = transition !== null;
        const isActive = transition?.index === i;
        return (
          <a
            key={q.href}
            ref={(el) => { quadrantRefs.current[i] = el as HTMLAnchorElement; }}
            href={q.href}
            onClick={(e) => handleQuadrantClick(e, i, q.href)}
            className={`group relative flex flex-col items-center justify-center gap-3 hover:bg-white/5 ${q.className}`}
            style={{
              // Transition only background-color for hover; opacity is driven by scroll handler directly
              transition: isTransitioning
                ? `opacity ${TRANSITION_DURATION * 0.6}ms ease-out`
                : "background-color 300ms",
              // When transitioning: fade out non-active quadrants
              opacity: isTransitioning && !isActive ? 0 : undefined,
            }}
          >
            <Icon
              className="w-6 h-6 transition-colors duration-300 group-hover:text-white/60"
              style={{ color: "#9E9E9E" }}
              strokeWidth={1.5}
            />
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-white"
              style={q.style}
            >
              {q.title}
            </h2>
            <p className="text-sm text-white/40 transition-colors duration-300 group-hover:text-white/60 max-w-[200px] text-center leading-relaxed">
              {q.description}
            </p>
          </a>
        );
      })}

      {/* Expanding quadrant overlay — the actual section expands to fill the screen */}
      {transition && (() => {
        const q = quadrants[transition.index];
        const Icon = q.icon;
        return (
          <div
            className="fixed z-[100] pointer-events-none flex flex-col items-center justify-center gap-3 bg-black"
            style={{
              top: transition.rect.top,
              left: transition.rect.left,
              width: transition.rect.width,
              height: transition.rect.height,
              animation: `quadrant-box-expand ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            }}
          >
            <div
              className="flex flex-col items-center justify-center gap-3"
              style={{
                animation: `quadrant-content-fade ${TRANSITION_DURATION}ms ease-out forwards`,
              }}
            >
              <Icon
                className="w-6 h-6"
                style={{ color: "#9E9E9E" }}
                strokeWidth={1.5}
              />
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight"
                style={q.style}
              >
                {q.title}
              </h2>
              <p className="text-sm text-white/40 max-w-[200px] text-center leading-relaxed">
                {q.description}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Center info — positioned at the intersection of all 4 quadrants */}
      <div
        ref={centerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center gap-1"
        style={{
          opacity: transition ? 0 : undefined,
          transition: transition ? `opacity ${TRANSITION_DURATION * 0.5}ms ease-out` : undefined,
        }}
      >
        <p className="text-xs uppercase tracking-widest text-white/50">
          Los Angeles, CA | Remote
        </p>
        <span className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight whitespace-nowrap">
          <span className="text-white">[</span>
          Reece Ballard
          <span className="text-white">]</span>
        </span>
        <p className="text-sm text-white/50">
          Software Engineer
        </p>
      </div>

      {/* Connect hint — centered at the bottom */}
      <div
        ref={connectRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        style={{
          opacity: transition ? 0 : 0.6,
          transition: transition ? `opacity ${TRANSITION_DURATION * 0.5}ms ease-out` : undefined,
        }}
      >
        <p className="text-xs uppercase tracking-widest text-white">
          connect ↓
        </p>
      </div>
    </section>
  );
}
