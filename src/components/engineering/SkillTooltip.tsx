"use client";

import { getSkillConnections } from "./mapLayout";

type SkillTooltipProps = {
  skillId: string;
  skillLabel: string;
  x: number;
  y: number;
  onClose: () => void;
};

export default function SkillTooltip({
  skillId,
  skillLabel,
  x,
  y,
  onClose,
}: SkillTooltipProps) {
  const { projects, experiences } = getSkillConnections(skillId);

  return (
    <>
      {/* Backdrop to close tooltip */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      />

      {/* Tooltip */}
      <div
        className="absolute z-50 bg-black border border-white/20 rounded-lg p-4 shadow-xl min-w-[200px] max-w-[280px]"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -100%) translateY(-12px)",
        }}
      >
        {/* Arrow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full"
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid rgba(255,255,255,0.2)",
          }}
        />

        <h3 className="text-base font-semibold text-white mb-3">{skillLabel}</h3>

        {projects.length > 0 && (
          <div className="mb-3">
            <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
              Projects
            </p>
            <ul className="space-y-1">
              {projects.slice(0, 5).map((name) => (
                <li key={name} className="text-sm text-white/70">
                  {name}
                </li>
              ))}
              {projects.length > 5 && (
                <li className="text-xs text-white/40">
                  +{projects.length - 5} more
                </li>
              )}
            </ul>
          </div>
        )}

        {experiences.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
              Experience
            </p>
            <ul className="space-y-1">
              {experiences.slice(0, 5).map((name) => (
                <li key={name} className="text-sm text-white/70">
                  {name}
                </li>
              ))}
              {experiences.length > 5 && (
                <li className="text-xs text-white/40">
                  +{experiences.length - 5} more
                </li>
              )}
            </ul>
          </div>
        )}

        {projects.length === 0 && experiences.length === 0 && (
          <p className="text-sm text-white/50">No connections</p>
        )}
      </div>
    </>
  );
}

