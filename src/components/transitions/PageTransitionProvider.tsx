"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

const FADE_DURATION = 500; // ms for the fade-to-black

type PageTransitionContextType = {
  /** Call this instead of router.push("/") to get a fade-to-black transition */
  navigateHome: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateHome: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export default function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [fading, setFading] = useState(false);
  const fadingRef = useRef(false);

  const navigateHome = useCallback(() => {
    if (fadingRef.current) return;
    fadingRef.current = true;
    setFading(true);

    // Wait for the overlay to reach full opacity, then navigate
    setTimeout(() => {
      router.push("/");
      // Keep the overlay visible briefly so the home page loads underneath
      // The overlay will be cleared when the home page mounts
      setTimeout(() => {
        setFading(false);
        fadingRef.current = false;
      }, 100);
    }, FADE_DURATION);
  }, [router]);

  return (
    <PageTransitionContext.Provider value={{ navigateHome }}>
      {children}

      {/* Full-screen fade-to-black overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "black",
          opacity: fading ? 1 : 0,
          pointerEvents: fading ? "all" : "none",
          transition: `opacity ${FADE_DURATION}ms ease-in-out`,
        }}
      />
    </PageTransitionContext.Provider>
  );
}
