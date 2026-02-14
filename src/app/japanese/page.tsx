"use client";

import { motion } from "motion/react";

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
};

export default function JapanesePage() {
  return (
    <main className="min-h-screen pt-24 px-6">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-4xl font-bold tracking-tight">日本語</h1>
        <p className="mt-4 text-white/60">Coming soon.</p>
      </motion.div>
    </main>
  );
}

