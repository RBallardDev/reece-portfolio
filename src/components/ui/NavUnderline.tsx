"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type UnderlinePosition = {
  x: number;
  width: number;
  visible: boolean;
};

export default function NavUnderline({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const pathname = usePathname();
  const [position, setPosition] = useState<UnderlinePosition>({
    x: 0,
    width: 0,
    visible: false,
  });
  const [bounceKey, setBounceKey] = useState(0);
  const rafRef = useRef<number | null>(null);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const updatePosition = () => {
      const container = containerRef.current;
      if (!container) return;

      // Find the active tab
      const activeTab = container.querySelector(
        `[data-nav-item][href="${pathname}"]`
      ) as HTMLElement | null;

      if (!activeTab || pathname === "/") {
        setPosition((prev) => ({ ...prev, visible: false }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      const x = tabRect.left - containerRect.left;
      const width = tabRect.width;

      setPosition({ x, width, visible: true });

      // Trigger bounce on pathname change (not on initial mount or going to home)
      if (prevPathnameRef.current !== pathname && pathname !== "/") {
        setBounceKey((k) => k + 1);
      }
      prevPathnameRef.current = pathname;
    };

    // Debounced update using RAF
    const scheduleUpdate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    // Initial update
    scheduleUpdate();

    // Update on resize
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize as backup
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname, containerRef]);

  return (
    <div
      key={bounceKey}
      className={`nav-underline absolute bottom-0 h-[2px] rounded-full bg-white/90 pointer-events-none ${
        position.visible ? "nav-underline-bounce" : ""
      }`}
      style={
        {
          "--underline-x": `${position.x}px`,
          "--underline-width": `${position.width}px`,
          width: `${position.width}px`,
          opacity: position.visible ? 1 : 0,
          transform: `translateX(${position.x}px)`,
          transition: position.visible
            ? "transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1), width 300ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 150ms ease-out"
            : "opacity 150ms ease-out",
        } as React.CSSProperties
      }
    />
  );
}
