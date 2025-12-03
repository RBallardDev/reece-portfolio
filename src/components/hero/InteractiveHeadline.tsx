"use client";

import { useRef, useEffect, useCallback } from "react";

type InteractiveHeadlineProps = {
  text: string;
  className?: string;
};

export default function InteractiveHeadline({
  text,
  className = "",
}: InteractiveHeadlineProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const accentCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const isHovering = useRef(false);
  const rafId = useRef<number | null>(null);

  const revealRadius = 70; // px radius of effect
  const liftAmount = 20; // px to lift characters

  const updateCharacters = useCallback(() => {
    const container = containerRef.current;
    if (!container || !mousePos.current) return;

    const containerRect = container.getBoundingClientRect();

    charsRef.current.forEach((charEl, i) => {
      if (!charEl) return;
      const accentEl = accentCharsRef.current[i];
      
      const charRect = charEl.getBoundingClientRect();
      const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
      const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

      const dx = mousePos.current!.x - charCenterX;
      const dy = mousePos.current!.y - charCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < revealRadius) {
        // Calculate lift based on distance (closer = more lift)
        const intensity = 1 - (distance / revealRadius);
        const lift = intensity * liftAmount;
        const fadeStrength = Math.pow(intensity, 0.55); // widen fade so edges drop opacity
        const accentStrength = Math.pow(intensity, 0.8);
        
        charEl.style.transform = `translateY(-${lift}px)`;
        charEl.style.opacity = `${Math.max(0, 1 - fadeStrength * 1.05)}`;
        
        if (accentEl) {
          accentEl.style.opacity = `${accentStrength}`;
          accentEl.style.transform = `translateY(-${lift}px)`; // Move with the character
        }
      } else {
        charEl.style.transform = "translateY(0)";
        charEl.style.opacity = "1";
        
        if (accentEl) {
          accentEl.style.opacity = "0";
          accentEl.style.transform = "translateY(0)";
        }
      }
    });

    // Update cursor position
    if (cursorRef.current && isHovering.current) {
      cursorRef.current.style.left = `${mousePos.current.x - revealRadius}px`;
      cursorRef.current.style.top = `${mousePos.current.y - revealRadius}px`;
      cursorRef.current.style.opacity = "1";
    }
  }, []);

  const startAnimation = useCallback(() => {
    const loop = () => {
      updateCharacters();
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
  }, [updateCharacters]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
      startAnimation();
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      mousePos.current = null;
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      // Reset all characters
      charsRef.current.forEach((charEl, i) => {
        if (charEl) {
          charEl.style.transform = "translateY(0)";
          charEl.style.opacity = "1";
        }
        const accentEl = accentCharsRef.current[i];
        if (accentEl) {
          accentEl.style.opacity = "0";
          accentEl.style.transform = "translateY(0)";
        }
      });

      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [startAnimation]);

  // Split text into words
  const words = text.split(" ");
  let globalCharIndex = 0;

  // Build word structures with character indices
  const wordStructures = words.map((word) => {
    const chars = word.split("").map((char) => {
      const index = globalCharIndex;
      globalCharIndex++;
      return { char, index };
    });
    return { word, chars };
  });

  return (
    <span
      ref={containerRef}
      className={`interactive-headline group relative inline cursor-none ${className}`}
      tabIndex={0}
    >
      {/* Text layer - grouped by words, each char has accent underneath */}
      <span className="relative">
        {wordStructures.map((wordData, wordIndex) => (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {wordData.chars.map(({ char, index }) => (
              <span
                key={`char-wrapper-${index}`}
                className="relative inline-block"
              >
                {/* Accent character - positioned behind */}
                <span
                  ref={(el) => { accentCharsRef.current[index] = el; }}
                  className="interactive-headline-char-accent absolute inset-0 pointer-events-none select-none"
                  style={{ opacity: 0 }}
                  aria-hidden="true"
                >
                  {char}
                </span>
                {/* White character - on top, lifts up */}
                <span
                  ref={(el) => { charsRef.current[index] = el; }}
                  className="interactive-headline-char relative inline-block text-white"
                >
                  {char}
                </span>
              </span>
            ))}
            {/* Add space between words */}
            {wordIndex < wordStructures.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </span>

      {/* Custom circular cursor */}
      <span
        ref={cursorRef}
        className="pointer-events-none absolute rounded-full border-2 border-white/30"
        style={{
          width: revealRadius * 2,
          height: revealRadius * 2,
          opacity: 0,
          transition: "opacity 0.2s ease-out",
        }}
        aria-hidden="true"
      />
    </span>
  );
}
