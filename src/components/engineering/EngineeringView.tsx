"use client";

import { useState, useCallback } from "react";
import SkillPills from "./SkillPills";
import EngineeringGrid from "./EngineeringGrid";

type ToggleMode = "projects" | "experience" | "map";

const HIGHLIGHT_PALETTE = [
  "#163CE0",
  "#FFD20F",
  "#F6082A",
  "#FF8509",
  "#17A745",
  "#502B92",
];

function getRandomColor(): string {
  return HIGHLIGHT_PALETTE[Math.floor(Math.random() * HIGHLIGHT_PALETTE.length)];
}

function generateSkillColors(skillIds: string[]): Record<string, string> {
  const colors: Record<string, string> = {};
  for (const id of skillIds) {
    colors[id] = getRandomColor();
  }
  return colors;
}

export default function EngineeringView() {
  const [mode, setMode] = useState<ToggleMode>("projects");
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const [activeSkillIds, setActiveSkillIds] = useState<string[] | null>(null);
  const [activeSkillColors, setActiveSkillColors] = useState<Record<string, string>>({});

  const handleCardHoverStart = useCallback((skillIds: string[]) => {
    if (skillIds.length > 0) {
      setActiveSkillIds(skillIds);
      setActiveSkillColors(generateSkillColors(skillIds));
    }
  }, []);

  const handleCardHoverEnd = useCallback(() => {
    setActiveSkillIds(null);
    setActiveSkillColors({});
  }, []);

  const toggleButtons: { key: ToggleMode; label: string }[] = [
    { key: "projects", label: "[Projects]" },
    { key: "experience", label: "[Experience]" },
    { key: "map", label: "[Map]" },
  ];

  // Map view - full width layout
  if (mode === "map") {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
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
    <div className="max-w-7xl mx-auto">
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
            <SkillPills
              activeSkillIds={activeSkillIds}
              activeSkillColors={activeSkillColors}
            />
          </div>
        )}
      </div>

      {/* Mobile title */}
      <h1 className="text-4xl font-bold md:hidden mt-6 mb-4">Engineering</h1>

      {/* Mobile toggle row */}
      <div className="flex items-center gap-4 md:hidden mb-6">
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

      {/* Mobile: grid (normal page scroll) */}
      <div className="md:hidden">
        <EngineeringGrid
          mode={mode}
          onCardHoverStart={handleCardHoverStart}
          onCardHoverEnd={handleCardHoverEnd}
        />
      </div>

      {/* Desktop: Split layout with sticky left + scrollable right */}
      <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-8">
        {/* Left column - Skills (sticky) */}
        <div className="space-y-6 sticky top-24 self-start">
          <h1 className="text-4xl font-bold">Engineering</h1>
          <div>
            <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
              Skills
            </h2>
            <SkillPills
              activeSkillIds={activeSkillIds}
              activeSkillColors={activeSkillColors}
            />
          </div>
        </div>

        {/* Right column - Toggle + Grid */}
        <div>
          {/* Toggle row - sticky, aligned with left column */}
          <div className="sticky top-24 z-10 -mx-6 px-6 before:absolute before:inset-x-0 before:bottom-full before:h-screen before:bg-black">
            <div className="bg-black pt-2.5 pb-6">
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
          </div>

          {/* Grid - with top margin to account for sticky toggle */}
          <div className="mt-6">
            <EngineeringGrid
              mode={mode}
              onCardHoverStart={handleCardHoverStart}
              onCardHoverEnd={handleCardHoverEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
