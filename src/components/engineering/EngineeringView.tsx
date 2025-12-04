"use client";

import { useState } from "react";
import SkillPills from "./SkillPills";
import EngineeringGrid from "./EngineeringGrid";

type ToggleMode = "projects" | "experience" | "map";

export default function EngineeringView() {
  const [mode, setMode] = useState<ToggleMode>("projects");
  const [skillsExpanded, setSkillsExpanded] = useState(false);

  const toggleButtons: { key: ToggleMode; label: string }[] = [
    { key: "projects", label: "[Projects]" },
    { key: "experience", label: "[Experience]" },
    { key: "map", label: "[Map]" },
  ];

  // Map view - full width layout
  if (mode === "map") {
    return (
      <div className="space-y-8">
        {/* Header row with title and toggles */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-bold">Engineering</h1>
          <div className="flex items-center gap-4">
            {toggleButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setMode(btn.key)}
                className={`text-sm font-medium transition-colors ${
                  mode === btn.key
                    ? "text-white"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map placeholder - full width */}
        <div className="w-full aspect-[16/9] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/40 text-lg mb-2">Relationship Map</p>
            <p className="text-white/30 text-sm">Coming soon — interactive visualization of project connections</p>
          </div>
        </div>
      </div>
    );
  }

  // Projects/Experience view - split layout
  return (
    <div className="space-y-8">
      {/* Mobile: Skills dropdown */}
      <div className="md:hidden">
        <button
          onClick={() => setSkillsExpanded(!skillsExpanded)}
          className="flex items-center justify-between w-full py-3 border-b border-white/10"
        >
          <span className="text-sm font-medium text-white/80">Skills</span>
          <span className="text-white/60 text-sm">
            {skillsExpanded ? "−" : "+"}
          </span>
        </button>
        {skillsExpanded && (
          <div className="py-4">
            <SkillPills />
          </div>
        )}
      </div>

      {/* Desktop: Split layout */}
      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        {/* Left column - Skills (hidden on mobile) */}
        <div className="hidden md:block space-y-6">
          <h1 className="text-4xl font-bold">Engineering</h1>
          <div>
            <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
              Skills
            </h2>
            <SkillPills />
          </div>
        </div>

        {/* Right column - Toggle + Grid */}
        <div className="space-y-6">
          {/* Mobile title */}
          <h1 className="text-4xl font-bold md:hidden">Engineering</h1>

          {/* Toggle row */}
          <div className="flex items-center gap-4 md:pt-2">
            {toggleButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setMode(btn.key)}
                className={`text-sm font-medium transition-colors ${
                  mode === btn.key
                    ? "text-white"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Card grid */}
          <EngineeringGrid mode={mode} />
        </div>
      </div>
    </div>
  );
}

