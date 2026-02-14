"use client";

import { motion } from "motion/react";
import MeHero from "@/components/me/MeHero";
import PillarsRow from "@/components/me/PillarsRow";
import ToolkitDrawer from "@/components/me/ToolkitDrawer";

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

export default function MePage() {
  return (
    <main className="min-h-screen pt-24 px-6 pb-12">
      <motion.div
        className="max-w-7xl mx-auto space-y-16"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <MeHero />
        <PillarsRow />
        <ToolkitDrawer />
      </motion.div>
    </main>
  );
}

