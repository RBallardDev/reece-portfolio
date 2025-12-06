"use client";

import { useState } from "react";

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

export default function ToolkitDrawer() {
  const [active, setActive] = useState(0);

  return (
    <section className="space-y-4 pb-10">
      <div className="text-3xl font-semibold text-white">[Under the Hood]</div>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          {sections.map((section, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={section.title}
                type="button"
                onClick={() => setActive(idx)}
                className={`text-base transition-colors ${
                  isActive ? "font-semibold text-white" : "font-medium text-white/60 hover:text-white"
                }`}
                aria-pressed={isActive}
              >
                [{section.title}]
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          {sections[active].items.map((item) => (
            <span
              key={item}
              className="text-sm text-white/80 border border-white/15 rounded-full px-4 py-2"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

