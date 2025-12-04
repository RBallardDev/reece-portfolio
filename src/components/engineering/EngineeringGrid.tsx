import EngineeringCard from "./EngineeringCard";
import { projects, experienceEntries } from "./data";

type EngineeringGridProps = {
  mode: "projects" | "experience";
  onCardHoverStart?: (skillIds: string[]) => void;
  onCardHoverEnd?: () => void;
  onCardClick?: (id: string, type: "project" | "experience") => void;
};

export default function EngineeringGrid({
  mode,
  onCardHoverStart,
  onCardHoverEnd,
  onCardClick,
}: EngineeringGridProps) {
  const data = mode === "projects" ? projects : experienceEntries;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => {
        // Projects have skillIds and id, experience entries don't
        const skillIds = "skillIds" in item ? item.skillIds : [];
        const itemId = "id" in item ? item.id : item.title.toLowerCase().replace(/\s+/g, "-");

        return (
          <EngineeringCard
            key={item.title}
            title={item.title}
            type={item.type}
            summary={item.summary}
            onHoverStart={() => onCardHoverStart?.(skillIds)}
            onHoverEnd={onCardHoverEnd}
            onClick={() => onCardClick?.(itemId, mode === "projects" ? "project" : "experience")}
          />
        );
      })}
    </div>
  );
}
