"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SkillPills from "./SkillPills";
import EngineeringGrid from "./EngineeringGrid";
import ProjectDetail from "./ProjectDetail";
import MapView from "./MapView";
import { engineeringData } from "@/data/engineering";

type ToggleMode = "projects" | "experience" | "map";

type SelectedItem = {
  id: string;
  type: "project" | "experience";
} | null;

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

// Helper to resolve open param to selected item
function resolveOpenParam(openSlug: string | null): SelectedItem {
  if (!openSlug) return null;

  // Find project by slug
  const project = engineeringData.projects.find((p) => p.slug === openSlug);
  if (project) {
    return { id: project.id, type: "project" };
  }

  // Fallback: check experience by slug
  const experience = engineeringData.experiences.find((e) => e.slug === openSlug);
  if (experience) {
    return { id: experience.id, type: "experience" };
  }

  return null;
}

export default function EngineeringView() {
  const searchParams = useSearchParams();
  
  // Compute initial selected item from URL param
  const initialSelectedItem = useMemo(() => {
    return resolveOpenParam(searchParams.get("open"));
  }, [searchParams]);

  const initialIsMobile =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false;

  const [mode, setMode] = useState<ToggleMode>("projects");
  const [skillsExpanded, setSkillsExpanded] = useState(
    initialIsMobile && initialSelectedItem ? true : false
  );
  const [activeSkillIds, setActiveSkillIds] = useState<string[] | null>(null);
  const [activeSkillColors, setActiveSkillColors] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(initialSelectedItem);
  const [isMobile, setIsMobile] = useState(false);

  // Track mobile breakpoint so we can auto-open skills on mobile detail view
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

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

  const handleCardClick = useCallback(
    (id: string, type: "project" | "experience") => {
      setSelectedItem({ id, type });
      if (isMobile) {
        setSkillsExpanded(true);
      }
      // Use Lenis scrollTo if available, otherwise fallback to native
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [isMobile]
  );

  const handleBackToGrid = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleMapOpenItem = useCallback(
    (kind: "experience" | "project", id: string) => {
      setSelectedItem({ id, type: kind });
      if (isMobile) {
        setSkillsExpanded(true);
      }
      // Use Lenis scrollTo if available, otherwise fallback to native
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [isMobile]
  );

  const toggleButtons: { key: ToggleMode; label: string }[] = [
    { key: "projects", label: "[Projects]" },
    { key: "experience", label: "[Experience]" },
    { key: "map", label: "[Map]" },
  ];

  // Map view - full width layout
  if (mode === "map") {
    // If an item is selected from the map, show detail view
    if (selectedItem) {
      return (
        <div className="max-w-7xl mx-auto">
          {/* Header row with title and toggles */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Engineering</h1>
            <div className="flex items-center gap-4">
              {toggleButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => {
                    setMode(btn.key);
                    setSelectedItem(null);
                  }}
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

          <ProjectDetail
            id={selectedItem.id}
            type={selectedItem.type}
            onBack={handleBackToGrid}
          />
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto">
        {/* Header row with title and toggles */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold">Engineering</h1>
          <div className="flex items-center gap-4">
            {toggleButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => {
                  setMode(btn.key);
                  setSelectedItem(null);
                }}
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

        {/* Map view */}
        <MapView onOpenItem={handleMapOpenItem} />
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

      {/* Mobile: title + toggle row (like Me page) - hidden when detail view is open */}
      {!selectedItem && (
        <div className="flex items-center justify-between gap-4 mt-6 mb-6 md:hidden">
          <h1 className="text-4xl font-bold">Engineering</h1>
          <div className="flex items-center gap-4">
            {toggleButtons
              .filter((btn) => btn.key !== "map")
              .map((btn) => {
                const isActive = mode === btn.key;
                return (
                  <button
                    key={btn.key}
                    type="button"
                    onClick={() => {
                      setMode(btn.key);
                      setSelectedItem(null);
                    }}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Mobile: grid or detail (normal page scroll) */}
      <div className="md:hidden">
        {selectedItem ? (
          <ProjectDetail
            id={selectedItem.id}
            type={selectedItem.type}
            onBack={handleBackToGrid}
          />
        ) : (
          <EngineeringGrid
            mode={mode}
            onCardHoverStart={handleCardHoverStart}
            onCardHoverEnd={handleCardHoverEnd}
            onCardClick={handleCardClick}
          />
        )}
      </div>

      {/* Desktop: Split layout — both columns fill viewport, scroll independently */}
      <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-8 h-[calc(100vh-7.5rem)]">
        {/* Left column — fixed title + scrollable skills */}
        <div className="flex flex-col min-h-0">
          <h1 className="text-4xl font-bold shrink-0">Engineering</h1>
          <h2 className="text-sm uppercase tracking-wider text-white/50 mt-6 mb-4 shrink-0">
            Skills
          </h2>
          <div
            className="overflow-y-auto min-h-0 flex-1 scrollbar-hide"
            data-lenis-prevent
          >
            <SkillPills
              activeSkillIds={activeSkillIds}
              activeSkillColors={activeSkillColors}
            />
          </div>
        </div>

        {/* Right column — fixed toggle + scrollable grid/detail */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-end gap-4 pt-2.5 pb-6 shrink-0">
            {toggleButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => {
                  setMode(btn.key);
                  setSelectedItem(null);
                }}
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

          <div
            className="overflow-y-auto min-h-0 flex-1 scrollbar-hide"
            data-lenis-prevent
          >
            {selectedItem ? (
              <ProjectDetail
                id={selectedItem.id}
                type={selectedItem.type}
                onBack={handleBackToGrid}
              />
            ) : (
              <EngineeringGrid
                mode={mode}
                onCardHoverStart={handleCardHoverStart}
                onCardHoverEnd={handleCardHoverEnd}
                onCardClick={handleCardClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
