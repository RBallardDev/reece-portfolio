"use client";

import { projects, experiences, skills, type Project, type Experience } from "@/data/engineering";

type ProjectDetailProps = {
  id: string;
  type: "project" | "experience";
  onBack: () => void;
};

export default function ProjectDetail({ id, type, onBack }: ProjectDetailProps) {
  // Find the item
  const item: Project | Experience | undefined =
    type === "project"
      ? projects.find((p) => p.id === id)
      : experiences.find((e) => e.id === id);

  if (!item) {
    return (
      <div className="p-8">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white transition-colors mb-6 flex items-center gap-2"
        >
          ← Back
        </button>
        <p className="text-white/60">Item not found</p>
      </div>
    );
  }

  // Get skill labels
  const itemSkills = item.skillIds
    .map((sid) => skills.find((s) => s.id === sid)?.label)
    .filter(Boolean);

  // Type-specific fields
  const isProject = type === "project";
  const projectItem = isProject ? (item as Project) : null;
  const experienceItem = !isProject ? (item as Experience) : null;

  // Display type label
  const typeLabel = isProject
    ? projectItem!.category.charAt(0).toUpperCase() + projectItem!.category.slice(1)
    : experienceItem!.role;

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm"
      >
        ← Back to {isProject ? "Projects" : "Experience"}
      </button>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <p className="text-xs uppercase tracking-wider text-white/50">
            {typeLabel}
          </p>
          {experienceItem?.timeframe && (
            <span className="text-xs text-white/40">
              {experienceItem.timeframe}
            </span>
          )}
        </div>
        <h2 className="text-3xl font-bold text-white">{item.title}</h2>
        {experienceItem?.org && experienceItem.org !== experienceItem.title && (
          <p className="text-white/60">{experienceItem.org}</p>
        )}
      </div>

      {/* Image placeholder - larger */}
      <div className="aspect-video w-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-sm">
        {isProject ? "Project showcase" : "Experience showcase"} image placeholder
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">About</h3>
        <p className="text-white/70 leading-relaxed">{item.summary}</p>
      </div>

      {/* Highlights */}
      {item.highlights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Highlights</h3>
          <ul className="space-y-2">
            {item.highlights.map((highlight, i) => (
              <li key={i} className="text-white/60 leading-relaxed flex items-start gap-2">
                <span className="text-white/40 mt-1">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills/Technologies */}
      {itemSkills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {itemSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full border border-white/20 text-white/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {item.links && item.links.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Links</h3>
          <div className="flex flex-wrap gap-4">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white text-sm border border-white/20 hover:border-white/40 rounded-lg px-4 py-2 transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Links</h3>
          <div className="flex gap-4">
            <span className="text-white/40 text-sm border border-white/10 rounded-lg px-4 py-2">
              GitHub (coming soon)
            </span>
            <span className="text-white/40 text-sm border border-white/10 rounded-lg px-4 py-2">
              Live Demo (coming soon)
            </span>
          </div>
        </div>
      )}

      {/* Gallery placeholder */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Gallery</h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-video rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-xs"
            >
              Image {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
