"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const SPARKLE_COLORS = [
  "#163CE0",
  "#FFD20F",
  "#F6082A",
  "#FF8509",
  "#17A745",
  "#502B92",
];

type MobileItem = {
  id: string;
  label: string;
  color: string;
  action: "copy" | "link";
  value: string;
};

const mobileItems: MobileItem[] = [
  {
    id: "email-1",
    label: "RBALLARD.R2",
    color: "#FFD20F",
    action: "copy",
    value: "rballard.r2@gmail.com",
  },
  {
    id: "email-2",
    label: "@GMAIL.COM",
    color: "#FFD20F",
    action: "copy",
    value: "rballard.r2@gmail.com",
  },
  {
    id: "github",
    label: "GITHUB",
    color: "#F6082A",
    action: "link",
    value: "https://github.com/RBallardDev",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    color: "#163CE0",
    action: "link",
    value: "https://www.linkedin.com/in/reece-ballard-376979255",
  },
  {
    id: "resume",
    label: "RESUME",
    color: "#17A745",
    action: "link",
    value: "/resume.pdf",
  },
  {
    id: "rballarddev",
    label: "RBALLARDDEV",
    color: "#FFFFFF",
    action: "link",
    value: "https://github.com/RBallardDev",
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

// Full-width text line (just renders the text, no interactivity)
function FullWidthText({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const calculateFontSize = () => {
      const containerWidth = window.innerWidth;

      let low = 16;
      let high = 500;
      let bestFit = 16;

      text.style.visibility = "hidden";
      text.style.position = "absolute";
      text.style.whiteSpace = "nowrap";

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        if (text.offsetWidth <= containerWidth) {
          bestFit = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      text.style.visibility = "";
      text.style.position = "";
      text.style.whiteSpace = "";

      setFontSize(bestFit);
    };

    calculateFontSize();
    window.addEventListener("resize", calculateFontSize);

    return () => {
      window.removeEventListener("resize", calculateFontSize);
    };
  }, [label]);

  const baselineOffset = fontSize * 0.12;

  return (
    <div
      className="w-screen overflow-hidden"
      style={{
        lineHeight: 0,
        margin: 0,
        padding: 0,
        height: `${fontSize * 0.75}px`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <span
        ref={textRef}
        className="font-bold tracking-tight uppercase whitespace-nowrap block transition-opacity duration-200"
        style={{
          fontSize: `${fontSize}px`,
          color: color,
          lineHeight: 1,
          padding: 0,
          margin: 0,
          transform: `translateX(-${fontSize * 0.02}px) translateY(-${baselineOffset}px)`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Mobile email block - both lines as one clickable unit
function MobileEmailBlock() {
  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    spawnSparkles(e.clientX, e.clientY);
  }, []);

  return (
    <a
      href="mailto:rballard.r2@gmail.com?subject=Let's%20Connect!"
      aria-label="Send email to Reece Ballard"
      className="cursor-pointer block hover:opacity-80 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      onMouseEnter={handleMouseEnter}
    >
      <FullWidthText label="RBALLARD.R2" color="#FFD20F" />
      <FullWidthText label="@GMAIL.COM" color="#FFD20F" />
    </a>
  );
}

// Mobile link line component
function MobileLinkLine({
  item,
}: {
  item: MobileItem;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const calculateFontSize = () => {
      const containerWidth = window.innerWidth;

      let low = 16;
      let high = 500;
      let bestFit = 16;

      text.style.visibility = "hidden";
      text.style.position = "absolute";
      text.style.whiteSpace = "nowrap";

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        if (text.offsetWidth <= containerWidth) {
          bestFit = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      text.style.visibility = "";
      text.style.position = "";
      text.style.whiteSpace = "";

      setFontSize(bestFit);
    };

    calculateFontSize();
    window.addEventListener("resize", calculateFontSize);

    return () => {
      window.removeEventListener("resize", calculateFontSize);
    };
  }, [item.label]);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    spawnSparkles(e.clientX, e.clientY);
  }, []);

  const baselineOffset = fontSize * 0.12;

  return (
    <a
      href={item.value}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${item.label}${item.id === "resume" ? " (PDF)" : " (opens in new tab)"}`}
      className="w-screen overflow-hidden hover:opacity-80 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 block"
      style={{
        lineHeight: 0,
        margin: 0,
        padding: 0,
        height: `${fontSize * 0.75}px`,
        display: "flex",
        justifyContent: "center",
      }}
      onMouseEnter={handleMouseEnter}
    >
      <span
        ref={textRef}
        className="font-bold tracking-tight uppercase whitespace-nowrap block"
        style={{
          fontSize: `${fontSize}px`,
          color: item.color,
          lineHeight: 1,
          padding: 0,
          margin: 0,
          transform: `translateX(-${fontSize * 0.02}px) translateY(-${baselineOffset}px)`,
        }}
      >
        {item.label}
      </span>
    </a>
  );
}

type MobileContactLinksProps = {
  showCTA?: boolean;
};

export default function MobileContactLinks({ showCTA = false }: MobileContactLinksProps) {
  const linkItems = mobileItems.filter(
    (item) => item.action === "link"
  );

  return (
    <div className="flex flex-col">
      {showCTA && (
        <>
          <FullWidthText label="WANT TO WORK" color="rgba(255,255,255,0.5)" />
          <FullWidthText label="TOGETHER?" color="rgba(255,255,255,0.5)" />
          <FullWidthText label="CONTACT ME!" color="#FFFFFF" />
        </>
      )}
      <MobileEmailBlock />
      {linkItems.map((item) => (
        <MobileLinkLine key={item.id} item={item} />
      ))}
    </div>
  );
}

