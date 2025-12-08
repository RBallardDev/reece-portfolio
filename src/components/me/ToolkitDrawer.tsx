"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const sections = [
  {
    title: "Integrations",
    items: [
      "Stripe (Checkout + Billing)",
      "Webhooks",
      "OAuth 2.0 / OIDC",
      "Google APIs (Places/Maps)",
      "Payments + Subscriptions",
      "Third-party APIs (rate limits, retries)",
      "OpenAPI / Swagger",
      "File Uploads (signed URLs)",
      "Realtime integrations",
      "Analytics Events (tracking)",
    ],
  },
  {
    title: "Back-End Systems",
    items: [
      "Django",
      "Node.js",
      "REST APIs",
      "Authentication + Authorization",
      "WebSockets / Realtime",
      "Background Jobs / Workers",
      "API Design (pagination/versioning)",
      "Caching (Redis)",
      "Security basics (tokens, signatures)",
      "Testing (API / integration)",
    ],
  },
  {
    title: "Data & Databases",
    items: [
      "PostgreSQL",
      "Supabase (Postgres + Auth)",
      "Schema Design",
      "Migrations",
      "Indexing (basics)",
      "SQL (joins, aggregates)",
      "Data Modeling",
      "Storage Buckets",
      "Realtime Database (pub/sub)",
      "MongoDB",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (S3 / IAM basics)",
      "Docker",
      "CI/CD (GitHub Actions)",
      "Vercel Deployments",
      "Nginx / Reverse Proxy",
      "Environment Management",
      "Monitoring / Logging (basics)",
      "CORS / Networking basics",
      "CDN concepts",
      "Secrets Management",
    ],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "Embeddings",
      "Vector Search",
      "RAG",
      "Prompt Engineering",
      "Agents / Tool Use",
      "Model Evaluation (basic)",
      "LLM APIs (OpenAI / etc.)",
      "Retrieval Pipelines",
      "Chunking + Reranking (basic)",
      "Python ML tooling",
    ],
  },
  {
    title: "UI Engineering",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Design Systems",
      "Component Architecture",
      "Tailwind CSS",
      "Motion (Framer Motion / GSAP)",
      "Accessibility (a11y)",
      "Responsive Layouts",
      "Performance (basic)",
      "Figma Handoff",
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
        [Under the Hood]
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

