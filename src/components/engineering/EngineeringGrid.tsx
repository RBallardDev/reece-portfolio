"use client";

import { motion } from "motion/react";
import EngineeringCard from "./EngineeringCard";
import { projects, experiences } from "@/data/engineering";
import { revealItem } from "@/components/motion/reveal";

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
          <motion.div
            key={project.id}
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <EngineeringCard
              title={project.title}
              type={project.category}
              coverImage={
                project.media?.find((m) => m.kind === "image")?.src
              }
              summary={project.summary}
              onHoverStart={() => onCardHoverStart?.(project.skillIds)}
              onHoverEnd={onCardHoverEnd}
              onClick={() => onCardClick?.(project.id, "project")}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {experiences.map((experience) => (
        <motion.div
          key={experience.id}
          variants={revealItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <EngineeringCard
            title={experience.title}
            type={experience.role}
            previousType={experience.previousRole}
            coverImage={experience.coverImage}
            summary={experience.summary}
            onHoverStart={() => onCardHoverStart?.(experience.skillIds)}
            onHoverEnd={onCardHoverEnd}
            onClick={() => onCardClick?.(experience.id, "experience")}
          />
        </motion.div>
      ))}
    </div>
  );
}
