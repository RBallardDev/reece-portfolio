"use client";

import { useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import GalleryGrid from "@/components/creative/GalleryGrid";
import GalleryDetailView from "@/components/creative/GalleryDetailView";
import MobileGalleryDetailView from "@/components/creative/MobileGalleryDetailView";
import { creativeGalleries } from "@/data/creativeGalleries";

// Hook to detect desktop breakpoint (md = 768px and up)
function useIsDesktop() {
  const subscribe = useCallback((onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const query = window.matchMedia("(min-width: 768px)");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 768px)").matches;
  }, []);

  const getServerSnapshot = () => true;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function CreativePage() {
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  // Lock body scroll on mobile carousel view (no gallery selected)
  useEffect(() => {
    if (!isDesktop && !activeGalleryId) {
      // Lock vertical scroll on mobile carousel
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isDesktop, activeGalleryId]);

  const handleGalleryClick = useCallback((galleryId: string) => {
    // Now works on both mobile and desktop
    setActiveGalleryId(galleryId);
  }, []);

  const handleBack = useCallback(() => {
    setActiveGalleryId(null);
  }, []);

  // Find the active gallery
  const activeGallery = activeGalleryId
    ? creativeGalleries.find((g) => g.id === activeGalleryId)
    : null;

  return (
    <main className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeGallery ? (
            // Detail view for selected gallery
            <motion.div
              key={`detail-${activeGalleryId}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {isDesktop ? (
                <GalleryDetailView gallery={activeGallery} onBack={handleBack} />
              ) : (
                <MobileGalleryDetailView
                  gallery={activeGallery}
                  onBack={handleBack}
                />
              )}
            </motion.div>
          ) : (
            // Grid/Carousel view
            <motion.div
              key="grid"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Header row */}
              <div className="flex items-center justify-between gap-4 mb-12">
                <h1 className="text-4xl font-bold">Creative</h1>
                <span className="text-sm font-medium text-white/60">
                  [Coming soon]
                </span>
              </div>

              {/* Gallery grid (desktop) or carousel (mobile) */}
              <GalleryGrid
                onGalleryClick={handleGalleryClick}
                activeGalleryId={activeGalleryId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
