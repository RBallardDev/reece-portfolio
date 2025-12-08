import type { Variants } from "motion/react";

export const revealItem: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 10,
  },
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

