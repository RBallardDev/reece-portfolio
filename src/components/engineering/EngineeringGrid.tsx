import EngineeringCard from "./EngineeringCard";
import { projects, experiences } from "@/data/engineering";

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
  if (mode === "projects") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {projects.map((project) => (
          <EngineeringCard
            key={project.id}
            title={project.title}
            type={project.category}
            summary={project.summary}
            onHoverStart={() => onCardHoverStart?.(project.skillIds)}
            onHoverEnd={onCardHoverEnd}
            onClick={() => onCardClick?.(project.id, "project")}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {experiences.map((experience) => (
        <EngineeringCard
          key={experience.id}
          title={experience.title}
          type={experience.role}
          previousType={experience.previousRole}
          coverImage={experience.coverImage}
          summary={experience.summary}
          onHoverStart={() => onCardHoverStart?.(experience.skillIds)}
          onHoverEnd={onCardHoverEnd}
          onClick={() => onCardClick?.(experience.id, "experience")}
        />
      ))}
    </div>
  );
}
