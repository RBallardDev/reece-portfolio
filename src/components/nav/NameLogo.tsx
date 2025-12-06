"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NameLogo.module.css";

export default function NameLogo() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isHovered, setIsHovered] = useState(false);
  
  // Toggle animations globally (set to true to re-enable collapse/expand)
  const animationsEnabled = false;

  // Skip animation on initial mount
  const [hasMounted, setHasMounted] = useState(false);

  // Collapsed when not on home AND not hovered
  const isCollapsed = animationsEnabled ? (!isHome && !isHovered) : false;

  // Refs for measuring
  const fullMeasureRef = useRef<HTMLSpanElement>(null);
  const compactMeasureRef = useRef<HTMLSpanElement>(null);
  const eeceMeasureRef = useRef<HTMLSpanElement>(null);

  // Measured widths
  const [fullWidth, setFullWidth] = useState<number>(0);
  const [compactWidth, setCompactWidth] = useState<number>(0);
  const [eeceWidth, setEeceWidth] = useState<number>(0);
  const [hasMeasured, setHasMeasured] = useState(false);

  // Measure widths
  const measureWidths = () => {
    if (fullMeasureRef.current && compactMeasureRef.current && eeceMeasureRef.current) {
      const fw = fullMeasureRef.current.getBoundingClientRect().width;
      const cw = compactMeasureRef.current.getBoundingClientRect().width;
      const ew = eeceMeasureRef.current.getBoundingClientRect().width;
      if (fw > 0 && cw > 0) {
        setFullWidth(fw);
        setCompactWidth(cw);
        setEeceWidth(ew);
        setHasMeasured(true);
      }
    }
  };

  // Measure on mount
  useLayoutEffect(() => {
    measureWidths();
  }, []);

  // Enable animations after initial mount
  useEffect(() => {
    // Small delay to ensure initial state is rendered without animation
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Re-measure on resize and font load
  useEffect(() => {
    const handleResize = () => measureWidths();
    window.addEventListener("resize", handleResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measureWidths();
      });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine current width (add buffer to collapsed width to prevent clipping)
  const currentWidth = hasMeasured
    ? isCollapsed
      ? compactWidth + 4
      : fullWidth
    : undefined;

  // B slide distance (width of "eece " to slide left)
  const bSlideDistance = eeceWidth;

  return (
    <Link
      href="/"
      className={styles.logo}
      aria-label="Reece Ballard - Go to home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Hidden measurement spans */}
      <span className={styles.measure} aria-hidden="true">
        <span ref={fullMeasureRef}>Reece Ballard</span>
        <span ref={compactMeasureRef} style={{ letterSpacing: "-0.05em" }}>RB</span>
        <span ref={eeceMeasureRef}>eece </span>
      </span>

      <span className={styles.bracket}>[</span>
      <span
        className={styles.inner}
        data-collapsed={isCollapsed ? "true" : "false"}
        data-anim={animationsEnabled ? "on" : "off"}
        data-mounted={hasMounted ? "true" : "false"}
        style={currentWidth !== undefined ? { width: `${currentWidth}px` } : undefined}
      >
        {/* R - stays in place, flips after delay */}
        <span className={styles.letterR}>R</span>

        {/* eece - dissolves */}
        {"eece".split("").map((char, i) => (
          <span
            key={`eece-${i}`}
            className={styles.dissolve}
            style={{ "--i": i } as React.CSSProperties}
          >
            {char}
          </span>
        ))}

        {/* space - dissolves */}
        <span className={styles.dissolve} style={{ "--i": 4 } as React.CSSProperties}>
          {"\u00A0"}
        </span>

        {/* B - slides left to meet R */}
        <span
          className={styles.letterB}
          style={
            isCollapsed && hasMeasured
              ? { transform: `translateX(-${bSlideDistance}px)` }
              : undefined
          }
        >
          B
        </span>

        {/* allard - dissolves and slides with B */}
        {"allard".split("").map((char, i) => (
          <span
            key={`allard-${i}`}
            className={styles.allardLetter}
            style={
              {
                "--i": i + 5,
                transform: isCollapsed && hasMeasured ? `translateX(-${bSlideDistance}px)` : undefined,
              } as React.CSSProperties
            }
          >
            {char}
          </span>
        ))}
      </span>
      <span className={styles.bracket}>]</span>
      <span className={styles.srOnly}>Reece Ballard</span>
    </Link>
  );
}
