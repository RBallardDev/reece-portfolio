"use client";

import { motion } from "motion/react";
import type { CreativeGallery } from "@/data/creativeGalleries";

type MobileGalleryDetailViewProps = {
  gallery: CreativeGallery;
  onBack: () => void;
};

// Scroll-triggered animation variants for photos
const photoVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function MobileGalleryDetailView({
  gallery,
  onBack,
}: MobileGalleryDetailViewProps) {
  // Generate dummy photo cards based on gallery count
  const photoCards = Array.from({ length: gallery.count }, (_, i) => ({
    id: `${gallery.id}-photo-${i}`,
    index: i,
  }));

  return (
    <div>
      {/* Header row: title, count, back button - no gap from page header */}
      <div className="flex items-center justify-between bg-black py-2 -mx-6 px-6 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white leading-none">
            {gallery.title}
          </h2>
          <span className="text-xs text-white/60 leading-none">
            {gallery.count} {gallery.countLabel}
          </span>
        </div>
        <button
          onClick={onBack}
          className="text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          [Back]
        </button>
      </div>

      {/* Vertical stack of photos with scroll-triggered animations */}
      <div className="space-y-4">
        {photoCards.map((photo) => (
          <motion.div
            key={photo.id}
            className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10"
            style={{
              background: gallery.theme.gradient,
            }}
            variants={photoVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Dummy photo placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/30 text-sm font-medium">
                {photo.index + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
