"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import TiltCard from "./TiltCard";
import { revealItem } from "@/components/motion/reveal";

const pillars = [
  {
    title: "Engineering",
    description:
      "Engineering is my favorite hobby. It's not just my job, it's what I choose to spend my time on. I build because I genuinely love the process: learn → build → ship → repeat. It's something thing I can do for hours, completely losing track of time.",
  },
  {
    title: "Creative",
    description:
      "I've always been creative, just not in the traditional \"drawing or painting\" way. My brain is naturally logical, and over time I learned how to use that to express ideas: first through edits and video work, and now through software. It's taught me how to switch between structure and experimentation and still ship clean results.",
  },
  {
    title: "Japanese",
    description:
      "Japanese is a long-term investment for me. It opens doors for work and collaboration beyond the U.S., and it matters personally since I have family in Japan I want better connect with. I also love the challenge of learning Japanese. It's the best kind of mental workout.",
  },
];

// Hook to detect mobile breakpoint (md = 768px)
function useIsMobile() {
  const subscribe = useCallback((onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const query = window.matchMedia("(max-width: 767px)");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  }, []);

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Hook to track which card is closest to viewport center (mobile only)
function useCenterFocus(cardCount: number, enabled: boolean) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  useEffect(() => {
    if (!enabled) {
      // Clean up when disabled - return cleanup that resets state
      return () => {
        setFocusedIndex(null);
      };
    }

    let rafId: number | null = null;

    const updateFocus = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex: number | null = null;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        // Only consider cards that are at least partially visible
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setFocusedIndex(closestIndex);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateFocus();
        rafId = null;
      });
    };

    // Initial check after a brief delay to let layout settle
    const initialTimer = setTimeout(updateFocus, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      setFocusedIndex(null);
    };
  }, [enabled]);

  return { focusedIndex, setCardRef };
}

export default function PillarsRow() {
  const isMobile = useIsMobile();
  const { focusedIndex, setCardRef } = useCenterFocus(pillars.length, isMobile);

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {pillars.map((pillar, index) => {
          const isFocused = isMobile && focusedIndex === index;
          
          return (
            <motion.div
              key={pillar.title}
              ref={setCardRef(index)}
              variants={revealItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              animate={
                isMobile
                  ? {
                      scale: isFocused ? 1.07 : 0.97,
                      opacity: isFocused ? 1 : 0.6,
                    }
                  : {}
              }
              transition={{
                scale: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
            >
              <TiltCard
                className={`h-full transition-all duration-300 ${
                  isMobile
                    ? isFocused
                      ? "border-white/20"
                      : "border-white/5"
                    : ""
                }`}
              >
                <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                <p className="mt-2 text-base text-white/55 leading-relaxed">
                  {pillar.description}
                </p>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

