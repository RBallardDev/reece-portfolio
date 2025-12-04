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
    value: "/resume.pdf",
  },
];

// Mobile layout items - email split into 2 lines
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
function MobileEmailBlock({
  onCopy,
  copiedId,
}: {
  onCopy: (value: string, id: string) => void;
  copiedId: string | null;
}) {
  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    spawnSparkles(e.clientX, e.clientY);
  }, []);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      onCopy("rballard.r2@gmail.com", "email");
    },
    [onCopy]
  );

  const isCopied = copiedId === "email";

  return (
    <button
      type="button"
      aria-label="Copy email to clipboard"
      className="cursor-pointer block hover:opacity-80 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {isCopied ? (
        <FullWidthText label="COPIED!" color="#FFD20F" />
      ) : (
        <>
          <FullWidthText label="RBALLARD.R2" color="#FFD20F" />
          <FullWidthText label="@GMAIL.COM" color="#FFD20F" />
        </>
      )}
    </button>
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

// Desktop single-line component
function DesktopContactRow({
  copiedId,
  onCopy,
}: {
  copiedId: string | null;
  onCopy: (value: string, id: string) => void;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(16);
  const [scaleX, setScaleX] = useState(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const calculateSize = () => {
      const viewportWidth = window.innerWidth;
      const safeWidth = viewportWidth - 4;

      let low = 16;
      let high = 500;
      let bestFit = 16;

      text.style.visibility = "hidden";
      text.style.position = "absolute";
      text.style.whiteSpace = "nowrap";
      text.style.transform = "none";

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        if (text.offsetWidth <= safeWidth) {
          bestFit = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      text.style.fontSize = `${bestFit}px`;
      const textWidth = text.offsetWidth;
      const scale = textWidth > 0 ? safeWidth / textWidth : 1;

      text.style.visibility = "";
      text.style.position = "";
      text.style.whiteSpace = "";

      setFontSize(bestFit);
      setScaleX(scale);
    };

    calculateSize();

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

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      spawnSparkles(e.clientX, e.clientY);
    },
    []
  );

  const handleClick = useCallback(
    async (item: ContactItem, e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (item.action === "copy") {
        e.preventDefault();
        onCopy(item.value, item.id);
      }
    },
    [onCopy]
  );

  const baselineOffset = fontSize * 0.12;

  return (
    <div
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
          transform: `translateX(2px) scaleX(${scaleX}) translateY(-${baselineOffset}px)`,
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

export default function ContactDock() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleCopy = useCallback(async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      alert(`Copy this email: ${value}`);
    }
  }, []);

  // Mobile layout - email block + 3 link lines
  if (isMobile) {
    const linkItems = mobileItems.filter(
      (item) => item.action === "link"
    );

    return (
      <div className="flex flex-col">
        <MobileEmailBlock onCopy={handleCopy} copiedId={copiedId} />
        {linkItems.map((item) => (
          <MobileLinkLine key={item.id} item={item} />
        ))}
      </div>
    );
  }

  // Desktop layout - single line
  return <DesktopContactRow copiedId={copiedId} onCopy={handleCopy} />;
}
