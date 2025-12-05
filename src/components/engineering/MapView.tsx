"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { projects, experiences, edges } from "@/data/engineering";
import {
  buildGraph,
  computeLayout,
  getEdgePath,
  getConnectedNodes,
  getConnectedEdgeIndices,
  nodeKey,
  type GraphNode,
  type NodePosition,
  type NodeKind,
  type LayoutConfig,
  type LayoutMode,
} from "./mapLayout";

// Color palette for nodes
const NODE_COLORS = [
  "#163CE0",
  "#FFD20F",
  "#F6082A",
  "#FF8509",
  "#17A745",
  "#502B92",
];

const TOGGLE_COLORS = [
  "#FFD20F",
  "#F6082A",
  "#FF8509",
  "#17A745",
  "#163CE0",
];

const getRandomToggleColor = () =>
  TOGGLE_COLORS[Math.floor(Math.random() * TOGGLE_COLORS.length)];

// Seeded random for consistent colors
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Get color for a node based on its key
function getNodeColor(nodeKey: string, colorSeed: number): string {
  let hash = 0;
  for (let i = 0; i < nodeKey.length; i++) {
    hash = ((hash << 5) - hash) + nodeKey.charCodeAt(i);
    hash = hash & hash;
  }
  const index = Math.floor(seededRandom(Math.abs(hash) + colorSeed) * NODE_COLORS.length);
  return NODE_COLORS[index];
}
import SkillTooltip from "./SkillTooltip";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

type ActiveNode = {
  key: string;
  kind: NodeKind;
  id: string;
} | null;

type SkillTooltipState = {
  skillId: string;
  skillLabel: string;
  x: number;
  y: number;
} | null;

type MapViewProps = {
  onOpenItem: (kind: "experience" | "project", id: string) => void;
};

// Find related nodes for mobile view
function getRelatedNodes(
  kind: NodeKind,
  id: string
): { kind: NodeKind; id: string; title: string; label?: string }[] {
  const related: { kind: NodeKind; id: string; title: string; label?: string }[] = [];

  for (const edge of edges) {
    if (edge.from.kind === kind && edge.from.id === id) {
      const target =
        edge.to.kind === "project"
          ? projects.find((p) => p.id === edge.to.id)
          : experiences.find((e) => e.id === edge.to.id);
      if (target) {
        related.push({
          kind: edge.to.kind as NodeKind,
          id: edge.to.id,
          title: target.title,
          label: edge.label,
        });
      }
    }
    if (edge.to.kind === kind && edge.to.id === id) {
      const source =
        edge.from.kind === "project"
          ? projects.find((p) => p.id === edge.from.id)
          : experiences.find((e) => e.id === edge.from.id);
      if (source) {
        related.push({
          kind: edge.from.kind as NodeKind,
          id: edge.from.id,
          title: source.title,
          label: edge.label,
        });
      }
    }
  }

  return related.slice(0, 3);
}

// Toggle button component (declared outside render)
function ToggleButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
        active
          ? "border-white/40 bg-white/10 text-white"
          : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/70"
      }`}
    >
      {label}
    </button>
  );
}

// Pill sizes for each node type
const PILL_SIZES = {
  experience: { px: "px-5", py: "py-2.5", text: "text-sm", maxW: "max-w-[180px]" },
  project: { px: "px-4", py: "py-2", text: "text-xs", maxW: "max-w-[150px]" },
  skill: { px: "px-2.5", py: "py-1", text: "text-[10px]", maxW: "max-w-[100px]" },
};

// Graph Node component - all pills
function GraphNodeComponent({
  node,
  position,
  isActive,
  isConnected,
  isDimmed,
  onHover,
  onClick,
  color,
}: {
  node: GraphNode;
  position: NodePosition;
  isActive: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  onHover: (active: boolean) => void;
  onClick: () => void;
  color?: string;
}) {
  const size = PILL_SIZES[node.kind];
  const hasColor = !!color;

  return (
    <div
      className={`
        absolute z-10 cursor-pointer transition-all duration-200 select-none rounded-full
        ${size.px} ${size.py} ${size.text}
        ${isActive ? "scale-110" : ""}
        ${isDimmed ? "opacity-30" : ""}
        ${!hasColor && isActive ? "border-white/60 bg-white/15" : ""}
        ${!hasColor && isConnected && !isActive ? "border-white/40 bg-white/10" : ""}
        ${!hasColor && isDimmed ? "border-white/5" : ""}
        ${!hasColor && !isActive && !isConnected && !isDimmed ? "border-white/15 hover:border-white/40 hover:bg-white/10" : ""}
        border
      `}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        ...(hasColor && {
          borderColor: isActive ? color : `${color}80`,
          backgroundColor: `${color}20`,
        }),
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <span
        className={`whitespace-nowrap font-medium ${size.maxW} truncate block`}
        style={{ color: hasColor ? color : "rgba(255,255,255,0.9)" }}
      >
        {node.label}
      </span>
    </div>
  );
}

// Mobile Node component
function MobileNode({
  title,
  subtitle,
  onClick,
  relatedNodes,
  onOpenItem,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
  relatedNodes: { kind: NodeKind; id: string; title: string; label?: string }[];
  onOpenItem: (kind: "experience" | "project", id: string) => void;
}) {
  return (
    <div
      className="relative z-10 p-4 rounded-xl border border-white/10 cursor-pointer transition-all duration-200 hover:border-white/30 hover:bg-white/5"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
        {subtitle}
      </p>
      <h3 className="text-base font-semibold text-white">{title}</h3>

      {relatedNodes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-white/40 mb-2">Related:</p>
          <div className="flex flex-wrap gap-2">
            {relatedNodes.map((rel) => (
              <button
                key={nodeKey(rel.kind, rel.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (rel.kind !== "skill") {
                    onOpenItem(rel.kind, rel.id);
                  }
                }}
                className="text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors"
              >
                {rel.title}
                {rel.label && (
                  <span className="text-white/30 ml-1">({rel.label})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Zoom slider component
function ZoomSlider({
  value,
  onChange,
  onReset,
}: {
  value: number;
  onChange: (value: number) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-white/40">Zoom:</span>
      <button
        onClick={() => onChange(Math.max(0.5, value - 0.1))}
        className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
      >
        −
      </button>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:hover:scale-125
          [&::-moz-range-thumb]:w-3
          [&::-moz-range-thumb]:h-3
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:cursor-pointer"
      />
      <button
        onClick={() => onChange(Math.min(2, value + 0.1))}
        className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
      >
        +
      </button>
      <span className="text-xs text-white/40 w-10">{Math.round(value * 100)}%</span>
      <button
        onClick={onReset}
        className="text-xs text-white/40 hover:text-white px-2 py-1 hover:bg-white/10 rounded transition-colors"
      >
        Reset
      </button>
    </div>
  );
}

export default function MapView({ onOpenItem }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Toggle state
  const [showProjects, setShowProjects] = useState(true);
  const [showExperiences, setShowExperiences] = useState(true);
  const [showSkills, setShowSkills] = useState(true);

  // Pan and zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Color mode state
  const [colorMode, setColorMode] = useState(false);
  const [colorSeed, setColorSeed] = useState(0);

  // Layout state
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("random");
  const [layoutSeed, setLayoutSeed] = useState(0);
  const [colorSwitchColor, setColorSwitchColor] = useState(getRandomToggleColor);
  const [layoutSwitchColor, setLayoutSwitchColor] = useState(getRandomToggleColor);

  // Hover state
  const [activeNode, setActiveNode] = useState<ActiveNode>(null);

  // Skill tooltip state
  const [skillTooltip, setSkillTooltip] = useState<SkillTooltipState>(null);

  // Build graph based on toggles
  const config: LayoutConfig = useMemo(
    () => ({
      showProjects,
      showExperiences,
      showSkills,
    }),
    [showProjects, showExperiences, showSkills]
  );

  const { nodes, edges: graphEdges } = useMemo(() => buildGraph(config), [config]);

  // Compute layout positions
  const positions = useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) {
      return new Map<string, NodePosition>();
    }
    return computeLayout(nodes, graphEdges, containerSize.width, containerSize.height, layoutMode, layoutSeed);
  }, [nodes, graphEdges, containerSize, layoutMode, layoutSeed]);

  // Compute node colors
  const nodeColors = useMemo(() => {
    const colors = new Map<string, string>();
    if (colorMode) {
      for (const node of nodes) {
        colors.set(node.key, getNodeColor(node.key, colorSeed));
      }
    }
    return colors;
  }, [nodes, colorMode, colorSeed]);

  // Calculate active connections
  const { activeNodeKeys, activeEdgeIndices } = useMemo(() => {
    if (!activeNode) {
      return { activeNodeKeys: new Set<string>(), activeEdgeIndices: new Set<number>() };
    }

    return {
      activeNodeKeys: getConnectedNodes(activeNode.key, graphEdges),
      activeEdgeIndices: getConnectedEdgeIndices(activeNode.key, graphEdges),
    };
  }, [activeNode, graphEdges]);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Measure container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    // Initial measurement
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    window.addEventListener("resize", updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [isMobile]);

  // Calculate pan limits based on container size and zoom
  const getPanLimits = useCallback(() => {
    // Allow panning up to 50% of container size in each direction
    const maxPanX = containerSize.width * 0.5 * zoom;
    const maxPanY = containerSize.height * 0.5 * zoom;
    return { maxPanX, maxPanY };
  }, [containerSize, zoom]);

  // Clamp pan within limits
  const clampPan = useCallback((newPan: { x: number; y: number }) => {
    const { maxPanX, maxPanY } = getPanLimits();
    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, newPan.x)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newPan.y)),
    };
  }, [getPanLimits]);

  // Handle wheel for panning (scroll to pan, prevent page scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent the page from scrolling and stop event from bubbling to Lenis
      e.preventDefault();
      e.stopPropagation();
      
      // Use scroll delta for panning, clamped to limits
      setPan((prev) => clampPan({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    };

    // Use capture phase to intercept before Lenis, and passive: false to allow preventDefault
    container.addEventListener("wheel", handleWheel, { passive: false, capture: true });

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [isMobile, clampPan]);

  const handleNodeHover = useCallback(
    (node: GraphNode) => (active: boolean) => {
      setActiveNode(
        active ? { key: node.key, kind: node.kind, id: node.id } : null
      );
    },
    []
  );

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (node.kind === "skill") {
        // Show skill tooltip - position needs to account for zoom and pan
        const pos = positions.get(node.key);
        if (pos) {
          const centerX = containerSize.width / 2;
          const centerY = containerSize.height / 2;
          const transformedX = centerX + (pos.x - centerX) * zoom + pan.x;
          const transformedY = centerY + (pos.y - centerY) * zoom + pan.y;
          setSkillTooltip({
            skillId: node.id,
            skillLabel: node.label,
            x: transformedX,
            y: transformedY,
          });
        }
      } else {
        // Open drawer
        onOpenItem(node.kind, node.id);
      }
    },
    [onOpenItem, positions, zoom, pan, containerSize]
  );

  const closeSkillTooltip = useCallback(() => {
    setSkillTooltip(null);
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Toggle color mode
  const handleToggleColor = useCallback((checked: boolean) => {
    setColorSwitchColor(getRandomToggleColor());
    if (checked) {
      // When turning on, randomize colors
      setColorSeed(Date.now());
    }
    setColorMode(checked);
  }, []);

  // Toggle between organized and random layout
  const handleToggleOrganized = useCallback((checked: boolean) => {
    setLayoutSwitchColor(getRandomToggleColor());
    if (checked) {
      // Organized mode
      setLayoutMode("organized");
    } else {
      // Random mode with new seed
      setLayoutMode("random");
      setLayoutSeed(Date.now());
    }
  }, []);

  // Check if currently organized
  const isOrganized = layoutMode === "organized";

  // Mobile: stacked layout
  if (isMobile) {
    return (
      <div className="space-y-8">
        {/* Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          <ToggleButton
            active={showExperiences}
            onClick={() => setShowExperiences(!showExperiences)}
            label="Experience"
          />
          <ToggleButton
            active={showProjects}
            onClick={() => setShowProjects(!showProjects)}
            label="Projects"
          />
          <ToggleButton
            active={showSkills}
            onClick={() => setShowSkills(!showSkills)}
            label="Skills"
          />
        </div>

        {/* Experiences section */}
        {showExperiences && (
          <div>
            <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
              Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <MobileNode
                  key={exp.id}
                  title={exp.title}
                  subtitle={exp.role}
                  onClick={() => onOpenItem("experience", exp.id)}
                  relatedNodes={getRelatedNodes("experience", exp.id)}
                  onOpenItem={onOpenItem}
                />
              ))}
            </div>
          </div>
        )}

        {/* Projects section */}
        {showProjects && (
          <div>
            <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <MobileNode
                  key={proj.id}
                  title={proj.title}
                  subtitle={proj.category.charAt(0).toUpperCase() + proj.category.slice(1)}
                  onClick={() => onOpenItem("project", proj.id)}
                  relatedNodes={getRelatedNodes("project", proj.id)}
                  onOpenItem={onOpenItem}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Calculate the transform for zoom (from center) and pan
  const centerX = containerSize.width / 2;
  const centerY = containerSize.height / 2;

  // Desktop: graph layout
  return (
    <div className="space-y-4">
      {/* Controls row: Toggles on left, Zoom on right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40">Show:</span>
          <ToggleButton
            active={showExperiences}
            onClick={() => setShowExperiences(!showExperiences)}
            label="Experience"
          />
          <ToggleButton
            active={showProjects}
            onClick={() => setShowProjects(!showProjects)}
            label="Projects"
          />
          <ToggleButton
            active={showSkills}
            onClick={() => setShowSkills(!showSkills)}
            label="Skills"
          />
          <span className="text-white/10 mx-1">|</span>
          <ToggleSwitch
            checked={colorMode}
            onChange={handleToggleColor}
            srLabel="Toggle color mode"
            color={colorSwitchColor}
            className="ml-2"
          />
          <ToggleSwitch
            checked={isOrganized}
            onChange={handleToggleOrganized}
            srLabel="Toggle organized layout"
            color={layoutSwitchColor}
            className="ml-2"
          />
        </div>
        <ZoomSlider value={zoom} onChange={setZoom} onReset={handleReset} />
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden cursor-move"
        style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}
      >
        {/* Transform container for zoom and pan */}
        <div
          ref={contentRef}
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: `${centerX}px ${centerY}px`,
            willChange: "transform",
          }}
        >
          {/* SVG edges */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {graphEdges.map((edge, index) => {
              const fromPos = positions.get(edge.fromKey);
              const toPos = positions.get(edge.toKey);
              if (!fromPos || !toPos) return null;

              const isSkillEdge =
                edge.fromKey.startsWith("skill:") || edge.toKey.startsWith("skill:");
              const isActiveEdge = activeEdgeIndices.has(index);
              const isDimmedEdge = activeNode !== null && !isActiveEdge;

              const path = getEdgePath(fromPos, toPos, isSkillEdge);

              return (
                <path
                  key={index}
                  d={path}
                  fill="none"
                  strokeWidth={(isActiveEdge ? 2 : 1) / zoom}
                  className={`transition-all duration-200 ${
                    isActiveEdge
                      ? "stroke-white/60"
                      : isDimmedEdge
                        ? "stroke-white/[0.03]"
                        : isSkillEdge
                          ? "stroke-white/10"
                          : "stroke-white/15"
                  }`}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = positions.get(node.key);
            if (!pos) return null;

            const isActive = activeNode?.key === node.key;
            const isConnected = !isActive && activeNodeKeys.has(node.key);
            const isDimmed = activeNode !== null && !isActive && !isConnected;

            return (
              <GraphNodeComponent
                key={node.key}
                node={node}
                position={pos}
                isActive={isActive}
                isConnected={isConnected}
                isDimmed={isDimmed}
                onHover={handleNodeHover(node)}
                onClick={() => handleNodeClick(node)}
                color={nodeColors.get(node.key)}
              />
            );
          })}
        </div>

        {/* Skill tooltip - positioned outside the transform container */}
        {skillTooltip && (
          <SkillTooltip
            skillId={skillTooltip.skillId}
            skillLabel={skillTooltip.skillLabel}
            x={skillTooltip.x}
            y={skillTooltip.y}
            onClose={closeSkillTooltip}
          />
        )}

        {/* Empty state */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/30">Enable at least one category to see the map</p>
          </div>
        )}

        {/* Pan hint */}
        <div className="absolute bottom-3 left-3 text-xs text-white/30 pointer-events-none">
          Scroll to pan
        </div>
      </div>
    </div>
  );
}
