"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

const DEFAULT_PALETTE = [
  "#163CE0",
  "#FFD20F",
  "#F6082A",
  "#FF8509",
  "#17A745",
  "#502B92",
];

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<CSSProperties>({});
  const [sheenStyle, setSheenStyle] = useState<CSSProperties>({});
  const [borderColor, setBorderColor] = useState<string | undefined>(undefined);
  const prefersReducedMotion = usePrefersReducedMotion();

  const maxTilt = 6;
  const maxLift = 3;

  const pickColor = () =>
    DEFAULT_PALETTE[Math.floor(Math.random() * DEFAULT_PALETTE.length)];

  const reset = () => {
    setTransformStyle({});
    setSheenStyle({});
    setBorderColor(undefined);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - y) * maxTilt;
    const rotY = (x - 0.5) * maxTilt;
    setTransformStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-${maxLift}px)`,
      boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
      borderColor: borderColor ?? "rgba(255,255,255,0.18)",
    });
    setSheenStyle({
      opacity: 1,
      background: `radial-gradient(180px at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.14), rgba(255,255,255,0))`,
    });
  };

  const handleLeave = () => reset();

  const handleFocus = () => {
    if (!prefersReducedMotion) setBorderColor(pickColor());
    setTransformStyle({
      transform: prefersReducedMotion
        ? "translateY(-2px)"
        : `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(-${maxLift}px)`,
      boxShadow: "0 14px 32px rgba(0,0,0,0.2)",
      borderColor: prefersReducedMotion
        ? "rgba(255,255,255,0.2)"
        : borderColor ?? "rgba(255,255,255,0.2)",
    });
    setSheenStyle({
      opacity: prefersReducedMotion ? 0.25 : 0.6,
      background: "radial-gradient(200px at 50% 40%, rgba(255,255,255,0.16), rgba(255,255,255,0))",
    });
  };

  const handleBlur = () => reset();

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl border border-white/10 bg-white/5 p-5 transition-[transform,border-color,box-shadow] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40 select-none ${className}`}
      style={{ ...transformStyle, borderColor: borderColor ?? transformStyle.borderColor }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => {
        if (prefersReducedMotion) return;
        setBorderColor(pickColor());
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 rounded-2xl"
        style={sheenStyle}
      />
      {children}
    </div>
  );
}

