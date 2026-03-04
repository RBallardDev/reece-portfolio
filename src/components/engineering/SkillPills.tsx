"use client";

import { useMemo } from "react";
import { motion, LayoutGroup } from "motion/react";
import { skills } from "@/data/engineering";

type SkillPillsProps = {
  activeSkillIds?: string[] | null;
  activeSkillColors?: Record<string, string>;
};

export default function SkillPills({
  activeSkillIds,
  activeSkillColors,
}: SkillPillsProps) {
  const visibleSkills = useMemo(() => skills.filter((s) => !s.hidden), []);

  const sorted = useMemo(() => {
    if (!activeSkillIds || activeSkillIds.length === 0) return visibleSkills;

    const activeSet = new Set(activeSkillIds);
    const active = visibleSkills.filter((s) => activeSet.has(s.id));
    const inactive = visibleSkills.filter((s) => !activeSet.has(s.id));
    return [...active, ...inactive];
  }, [visibleSkills, activeSkillIds]);

  return (
    <LayoutGroup>
      <div className="flex flex-wrap gap-2 p-1">
        {sorted.map((skill) => {
          const isActive = activeSkillIds?.includes(skill.id);
          const color = isActive ? activeSkillColors?.[skill.id] : undefined;
          const hasActive = activeSkillIds && activeSkillIds.length > 0;

          return (
            <motion.span
              key={skill.id}
              layout
              layoutId={skill.id}
              transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
              className="px-3 py-1 text-sm rounded-full border"
              style={{
                borderColor: isActive && color ? color : hasActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                color: isActive && color ? color : hasActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)",
                boxShadow: isActive && color ? `0 0 0 1px ${color}, 0 0 18px -8px ${color}` : "none",
                transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
              }}
            >
              {skill.label}
            </motion.span>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
