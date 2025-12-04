"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type ContactItem = {
  id: string;
  label: string;
  color: string;
  action: "copy" | "link";
  value: string;
};

const SPARKLE_COLORS = [
  "#163CE0",
  "#FFD20F",
  "#F6082A",
  "#FF8509",
  "#17A745",
  "#502B92",
];

const contactItems: ContactItem[] = [
  {
    id: "email",
    label: "RBALLARD.R2@GMAIL.COM",
    color: "#FFD20F", // yellow
    action: "copy",
    value: "rballard.r2@gmail.com",
  },
  {
    id: "github",
    label: "GitHub",
    color: "#F6082A", // red
    action: "link",
    value: "https://github.com/RBallardDev",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    color: "#163CE0", // blue
    action: "link",
    value: "https://www.linkedin.com/in/reece-ballard-376979255",
  },
  {
    id: "resume",
    label: "Resume",
    color: "#17A745", // green
    action: "link",
    value: "/resume.pdf", // TODO: Add actual resume PDF to /public/resume.pdf
  },
];

// Spawn sparkles on document.body so they're not clipped
function spawnSparkles(x: number, y: number) {
  const particleCount = 12 + Math.floor(Math.random() * 5);
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "contact-sparkle";
    const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
    const size = 4 + Math.random() * 4;
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
    const velocity = 30 + Math.random() * 40;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      --sparkle-vx: ${vx}px;
      --sparkle-vy: ${vy}px;
    `;

    document.body.appendChild(particle);
    particles.push(particle);
  }

  setTimeout(() => {
    particles.forEach((p) => p.remove());
  }, 800);
}

export default function ContactDock() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(16);
  const [scaleX, setScaleX] = useState(1);
  const rafRef = useRef<number | null>(null);

  // Calculate font size and scale to stretch flush with viewport
  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const calculateSize = () => {
      const viewportWidth = window.innerWidth;

      // Find a good base font size using binary search
      let low = 16;
      let high = 500;
      let bestFit = 16;

      // Temporarily make text visible for measurement
      text.style.visibility = "hidden";
      text.style.position = "absolute";
      text.style.whiteSpace = "nowrap";
      text.style.transform = "none"; // Reset transform for accurate measurement

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        if (text.offsetWidth <= viewportWidth) {
          bestFit = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      // Set to best fit and measure actual width
      text.style.fontSize = `${bestFit}px`;
      const textWidth = text.offsetWidth;

      // Calculate scale to stretch text to exactly fill viewport
      const scale = textWidth > 0 ? viewportWidth / textWidth : 1;

      // Reset styles
      text.style.visibility = "";
      text.style.position = "";
      text.style.whiteSpace = "";

      setFontSize(bestFit);
      setScaleX(scale);
    };

    // Initial calculation
    calculateSize();

    // Debounced resize handler using RAF
    const handleResize = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(calculateSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Spawn sparkles on hover at cursor position
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      // Use cursor position (clientX/clientY are viewport coordinates)
      spawnSparkles(e.clientX, e.clientY);
    },
    []
  );

  // Handle click for copy functionality
  const handleClick = useCallback(
    async (item: ContactItem, e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (item.action === "copy") {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(item.value);
          setCopiedId(item.id);
          setTimeout(() => setCopiedId(null), 1200);
        } catch {
          // Fallback: show alert if clipboard fails
          alert(`Copy this email: ${item.value}`);
        }
      }
    },
    []
  );

  const baselineOffset = fontSize * 0.12;

  return (
    <div
      ref={containerRef}
      className="relative w-screen overflow-hidden"
      style={{
        lineHeight: 0,
        margin: 0,
        padding: 0,
        height: `${fontSize * 0.75}px`,
      }}
    >
      <span
        ref={textRef}
        className="font-bold tracking-tight uppercase whitespace-nowrap"
        style={{
          fontSize: `${fontSize}px`,
          display: "block",
          lineHeight: 1,
          padding: 0,
          margin: 0,
          transform: `scaleX(${scaleX}) translateY(-${baselineOffset}px)`,
          transformOrigin: "left top",
        }}
      >
        {contactItems.map((item) => {
          const isCopied = copiedId === item.id;
          const isLink = item.action === "link";
          const textContent = isCopied ? "Copied!" : item.label;

          const linkStyle = {
            color: item.color,
            textDecoration: "none",
          } as React.CSSProperties;

          if (isLink) {
            return (
              <a
                key={item.id}
                href={item.value}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${item.label}${item.id === "resume" ? " (PDF)" : " (opens in new tab)"}`}
                className="hover:opacity-80 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onClick={(e) => handleClick(item, e)}
              >
                {textContent}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Copy ${item.label} to clipboard`}
              className="hover:opacity-80 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onClick={(e) => handleClick(item, e)}
            >
              {textContent}
            </button>
          );
        })}
      </span>
    </div>
  );
}

