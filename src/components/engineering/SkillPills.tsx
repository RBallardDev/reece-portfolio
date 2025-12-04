import { skills } from "@/data/engineering";

type SkillPillsProps = {
  activeSkillIds?: string[] | null;
  activeSkillColors?: Record<string, string>;
};

export default function SkillPills({
  activeSkillIds,
  activeSkillColors,
}: SkillPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const isActive = activeSkillIds?.includes(skill.id);
        const color = isActive ? activeSkillColors?.[skill.id] : undefined;

        return (
          <span
            key={skill.id}
            className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
              isActive
                ? ""
                : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"
            }`}
            style={
              isActive && color
                ? {
                    borderColor: color,
                    color: color,
                    boxShadow: `0 0 0 1px ${color}, 0 0 18px -8px ${color}`,
                  }
                : undefined
            }
          >
            {skill.label}
          </span>
        );
      })}
    </div>
  );
}
