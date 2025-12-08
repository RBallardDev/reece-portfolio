"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import MobileContactLinks from "@/components/shared/MobileContactLinks";

type Tab = {
  label: string;
  href: string;
  style?: React.CSSProperties;
};

const tabs: Tab[] = [
  { label: "Me", href: "/me" },
  { label: "Engineering", href: "/engineering" },
  { label: "Creative", href: "/creative" },
  {
    label: "日本語",
    href: "/japanese",
    style: { fontFamily: '"Noto Sans JP", system-ui, sans-serif' },
  },
];

// Header height constant (matches header py-4 = 16px * 2 + content ~57px)
const HEADER_HEIGHT = 57;

// Confetti colors
const CONFETTI_COLORS = [
  "#163CE0", // blue
  "#FFD20F", // yellow
  "#F6082A", // pink/red
  "#FF8509", // orange
  "#502B92", // purple
  "#17A745", // green
  "#FFFFFF", // white
];

// Spawn confetti from a point
function spawnConfetti(x: number, y: number, count: number = 8) {
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size = 5 + Math.random() * 5;
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
    const velocity = 50 + Math.random() * 60;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: menu-confetti 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      --confetti-vx: ${vx}px;
      --confetti-vy: ${vy}px;
    `;

    document.body.appendChild(particle);
    particles.push(particle);
  }

  // Clean up particles after animation
  setTimeout(() => {
    particles.forEach((p) => p.remove());
  }, 1300);
}

// Clip-path values - circle originates from menu button area (top-right)
const CLIP_CLOSED = `circle(0px at calc(100% - 48px) 0px)`;
const CLIP_OPEN = `circle(150vmax at calc(100% - 48px) 0px)`;

type MobileMenuPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenuPopover({ isOpen, onClose }: MobileMenuPopoverProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Check for reduced motion preference
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus first link when menu opens
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      // Delay to allow animation to start
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Spawn confetti when menu opens
  useEffect(() => {
    if (isOpen && !reducedMotion) {
      // Spawn from near the menu button (top-right area)
      const x = window.innerWidth - 48;
      const y = HEADER_HEIGHT / 2;
      
      // Small delay to sync with animation start
      const timer = setTimeout(() => {
        spawnConfetti(x, y, 10);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, reducedMotion]);

  // Close when navigating
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Animation variants for the overlay
  const overlayVariants: Variants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.3 },
        },
        exit: { 
          opacity: 0,
          transition: { duration: 0.2 },
        },
      }
    : {
        hidden: { clipPath: CLIP_CLOSED },
        visible: { 
          clipPath: CLIP_OPEN,
          transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
        exit: { 
          clipPath: CLIP_CLOSED,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      };

  // Animation variants for staggered content
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: reducedMotion ? 0.1 : 0.35,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: { 
      opacity: 0, 
      y: -8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="menu"
          className="fixed inset-0 z-[60] bg-black flex flex-col overflow-y-auto"
          style={{ top: HEADER_HEIGHT }}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Navigation tabs */}
          <motion.nav 
            className="flex-shrink-0 pt-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul>
              {tabs.map((tab, index) => {
                const isActive = pathname === tab.href;
                return (
                  <motion.li key={tab.href} variants={itemVariants}>
                    {index > 0 && (
                      <div className="w-screen h-px bg-white/10" />
                    )}
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={tab.href}
                      role="menuitem"
                      className={`block text-2xl font-bold transition-colors px-6 py-2 ${
                        isActive
                          ? "text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                      style={tab.style}
                      onClick={onClose}
                    >
                      {tab.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>

          {/* Spacer to push footer to bottom */}
          <div className="flex-1" />

          {/* Footer - CTA + big bold contact links */}
          <motion.footer 
            className="flex-shrink-0"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ delay: reducedMotion ? 0.2 : 0.5 }}
          >
            <MobileContactLinks showCTA />
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
