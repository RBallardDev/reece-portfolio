"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const sections = [
  {
    title: "Mobile",
    items: [
      "React Native",
      "Expo",
      "Swift / SwiftUI",
      "UIKit",
      "AVFoundation / Camera & Media",
      "Metal / Core Image (GPU)",
      "Core Location / MapKit",
      "Push Notifications & Deep Linking",
      "MVVM / Clean Architecture",
      "App Store Deployment",
    ],
  },
  {
    title: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Three.js / WebGL",
      "Framer Motion / GSAP",
      "Design Systems",
      "Accessibility (a11y)",
      "Performance Optimization",
      "Figma → Code",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Django",
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "API Design (REST / GraphQL)",
      "Authentication (OAuth / JWT)",
      "WebSockets / Realtime",
      "Redis / Caching",
      "Testing (API / Integration)",
    ],
  },
  {
    title: "Integrations",
    items: [
      "Stripe (Checkout + Billing)",
      "Webhooks",
      "OAuth 2.0 / OIDC",
      "Google APIs (Places / Maps)",
      "Payments & Subscriptions",
      "Third-party APIs",
      "OpenAPI / Swagger",
      "File Uploads (Signed URLs)",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "Docker",
      "AWS (S3, IAM)",
      "CI/CD (GitHub Actions)",
      "Vercel",
      "Nginx / Reverse Proxy",
      "Linux / Shell",
      "Monitoring & Observability",
      "Environment & Secrets Management",
    ],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "RAG",
      "LLM APIs (OpenAI, Claude)",
      "Agents & Tool Use",
      "Prompt Engineering",
      "Embeddings & Vector Search",
      "Python ML Tooling",
      "Retrieval Pipelines",
      "Evaluation & Testing",
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const pillContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 6 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -4,
    transition: {
      duration: 0.15,
    },
  },
};

export default function ToolkitDrawer() {
  const [active, setActive] = useState(0);

  return (
    <motion.section
      className="space-y-4 pb-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Label */}
      <motion.div
        className="text-3xl font-semibold text-white"
        variants={itemVariants}
      >
        [Tech Stack]
      </motion.div>

      <div className="space-y-6">
        {/* Section buttons */}
        <div className="flex flex-wrap gap-4">
          {sections.map((section, idx) => {
            const isActive = idx === active;
            return (
              <motion.button
                key={section.title}
                type="button"
                onClick={() => setActive(idx)}
                className={`text-base transition-colors ${
                  isActive ? "font-semibold text-white" : "font-medium text-white/60 hover:text-white"
                }`}
                aria-pressed={isActive}
                variants={itemVariants}
              >
                [{section.title}]
              </motion.button>
            );
          })}
        </div>

        {/* Pills with AnimatePresence for section changes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="flex flex-wrap gap-3"
            variants={pillContainerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {sections[active].items.map((item) => (
              <motion.span
                key={item}
                className="text-sm text-white/80 border border-white/15 rounded-full px-4 py-2"
                variants={pillVariants}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

