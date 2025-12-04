"use client";

import Link from "next/link";
import { engineeringData } from "@/data/engineering";

const FEATURED_SLUGS = ["wbg-website", "open-planner", "pickl"];

export default function FeaturedWorkRow() {
  const featuredProjects = FEATURED_SLUGS.map((slug) =>
    engineeringData.projects.find((p) => p.slug === slug)
  ).filter(Boolean);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Featured Work</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {featuredProjects.map((project) => {
          if (!project) return null;
          
          return (
            <Link
              key={project.id}
              href={`/engineering?open=${project.slug}`}
              className="group block rounded-xl border border-white/10 bg-white/0 p-5 transition-colors hover:border-white/25 hover:bg-white/5"
            >
              {/* Image placeholder */}
              <div className="aspect-video w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-xs mb-4 group-hover:border-white/20 transition-colors">
                Image
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                {project.title}
              </h3>
              
              {/* Summary - single line with ellipsis */}
              <p className="text-sm text-white/60 leading-relaxed line-clamp-1">
                {project.summary}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

