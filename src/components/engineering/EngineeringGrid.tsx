import EngineeringCard from "./EngineeringCard";
import { projects, experienceEntries } from "./data";

type EngineeringGridProps = {
  mode: "projects" | "experience";
  onCardHoverStart?: (skillIds: string[]) => void;
  onCardHoverEnd?: () => void;
};

export default function EngineeringGrid({
  mode,
  onCardHoverStart,
  onCardHoverEnd,
}: EngineeringGridProps) {
  const data = mode === "projects" ? projects : experienceEntries;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => {
        // Projects have skillIds, experience entries don't
        const skillIds = "skillIds" in item ? item.skillIds : [];

        return (
          <EngineeringCard
            key={item.title}
            title={item.title}
            type={item.type}
            summary={item.summary}
            onHoverStart={() => onCardHoverStart?.(skillIds)}
            onHoverEnd={onCardHoverEnd}
          />
        );
      })}
    </div>
  );
}
