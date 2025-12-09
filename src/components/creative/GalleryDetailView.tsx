"use client";

import { motion } from "motion/react";
import type { CreativeGallery } from "@/data/creativeGalleries";

type GalleryDetailViewProps = {
  gallery: CreativeGallery;
  onBack: () => void;
};

// Stagger animation variants (like Under the Hood)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function GalleryDetailView({
  gallery,
  onBack,
}: GalleryDetailViewProps) {
  // Generate dummy photo cards based on gallery count
  const photoCards = Array.from({ length: gallery.count }, (_, i) => ({
    id: `${gallery.id}-photo-${i}`,
    index: i,
  }));

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header row: back button, title, count */}
      <motion.div
        className="flex items-center justify-between"
        variants={headerVariants}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white leading-none">
            {gallery.title}
          </h2>
          <span className="text-sm text-white/60 leading-none">
            {gallery.count} {gallery.countLabel}
          </span>
        </div>
        <button
          onClick={onBack}
          className="text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          [Back]
        </button>
      </motion.div>

      {/* Photo grid with staggered trickle animation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photoCards.map((photo) => (
          <motion.div
            key={photo.id}
            className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10"
            style={{
              background: gallery.theme.gradient,
            }}
            variants={photoVariants}
          >
            {/* Dummy photo placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/30 text-xs font-medium">
                {photo.index + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

