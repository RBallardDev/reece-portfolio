"use client";

import { useCallback, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import GalleryStackCard from "./GalleryStackCard";
import { creativeGalleries } from "@/data/creativeGalleries";
import { revealItem } from "@/components/motion/reveal";

type GalleryGridProps = {
  onGalleryClick?: (galleryId: string) => void;
  activeGalleryId?: string | null;
};

// Hook to detect mobile breakpoint (< md = < 768px)
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

// Variants for grid items when transitioning
const gridItemVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function GalleryGrid({
  onGalleryClick,
  activeGalleryId,
}: GalleryGridProps) {
  const isMobile = useIsMobile();

  // Mobile: Horizontal swipe carousel
  if (isMobile) {
    return (
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pt-4 pb-8"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {creativeGalleries.map((gallery) => (
          <div
            key={gallery.id}
            className="flex-shrink-0 w-[75vw] snap-center p-4"
          >
            <GalleryStackCard
              gallery={gallery}
              onClick={() => onGalleryClick?.(gallery.id)}
            />
          </div>
        ))}
      </div>
    );
  }

  // Desktop: Grid layout
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
      layout
    >
      {creativeGalleries.map((gallery, index) => {
        // When a gallery is active, hide others
        const isActive = activeGalleryId === gallery.id;
        const isHidden = activeGalleryId && !isActive;

        return (
          <motion.div
            key={gallery.id}
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            animate={isHidden ? "hidden" : "visible"}
            custom={index}
            layout
            style={{
              // Hide from layout when another gallery is active
              display: isHidden ? "none" : "block",
            }}
          >
            <motion.div
              variants={gridItemVariants}
              animate={isHidden ? "hidden" : "visible"}
            >
              <GalleryStackCard
                gallery={gallery}
                onClick={() => onGalleryClick?.(gallery.id)}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
