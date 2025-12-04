const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Swift",
  "Kotlin",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "REST APIs",
  "AWS",
  "Docker",
  "Git",
  "Figma",
  "Three.js",
  "TailwindCSS",
  "Machine Learning",
];

export default function SkillPills() {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 text-sm rounded-full border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

