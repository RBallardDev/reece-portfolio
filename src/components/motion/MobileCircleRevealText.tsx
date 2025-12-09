"use client";

import { useCallback, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type MobileCircleRevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Hook to detect mobile breakpoint
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

export default function MobileCircleRevealText({
  children,
  className = "",
  delay = 0.3,
}: MobileCircleRevealTextProps) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Desktop or reduced motion: render normally
  if (!isMobile || prefersReducedMotion) {
    return <p className={className}>{children}</p>;
  }

  // Mobile: circle mask reveal animation with scale
  return (
    <motion.p
      className={className}
      initial={{
        opacity: 0,
        scale: 0.92,
        // @ts-expect-error - WebKit prefix properties
        WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 65%)",
        WebkitMaskSize: "0% 0%",
        WebkitMaskPosition: "50% 50%",
        WebkitMaskRepeat: "no-repeat",
        maskImage: "radial-gradient(circle, #000 55%, transparent 65%)",
        maskSize: "0% 0%",
        maskPosition: "50% 50%",
        maskRepeat: "no-repeat",
        clipPath: "circle(0% at 50% 50%)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        // @ts-expect-error - WebKit prefix properties
        WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 65%)",
        WebkitMaskSize: "220% 220%",
        WebkitMaskPosition: "50% 50%",
        WebkitMaskRepeat: "no-repeat",
        maskImage: "radial-gradient(circle, #000 55%, transparent 65%)",
        maskSize: "220% 220%",
        maskPosition: "50% 50%",
        maskRepeat: "no-repeat",
        clipPath: "circle(140% at 50% 50%)",
      }}
      transition={{
        duration: 1.0,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  );
}

