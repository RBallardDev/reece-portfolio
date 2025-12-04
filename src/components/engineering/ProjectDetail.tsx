"use client";

import { projects, experienceEntries, skills } from "./data";

type ProjectDetailProps = {
  id: string;
  type: "project" | "experience";
  onBack: () => void;
};

export default function ProjectDetail({ id, type, onBack }: ProjectDetailProps) {
  // Find the item
  const item = type === "project" 
    ? projects.find((p) => p.id === id)
    : experienceEntries.find((e) => e.title.toLowerCase().replace(/\s+/g, "-") === id);

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

  // Get skill labels for projects
  const itemSkills = type === "project" && "skillIds" in item
    ? item.skillIds.map((sid) => skills.find((s) => s.id === sid)?.label).filter(Boolean)
    : [];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm"
      >
        ← Back to {type === "project" ? "Projects" : "Experience"}
      </button>

      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-white/50">
          {item.type}
        </p>
        <h2 className="text-3xl font-bold text-white">
          {item.title}
        </h2>
      </div>

      {/* Image placeholder - larger */}
      <div className="aspect-video w-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-sm">
        Project showcase image placeholder
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">About</h3>
        <p className="text-white/70 leading-relaxed">
          {item.summary}
        </p>
        {/* Extended placeholder description */}
        <p className="text-white/60 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      {/* Skills used (for projects) */}
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

      {/* Links placeholder */}
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

