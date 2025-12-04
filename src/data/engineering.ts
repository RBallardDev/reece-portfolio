// ============================================================================
// Engineering Content Pipeline
// ============================================================================
// Single source of truth for all engineering-related data:
// Skills, Projects, Experiences, and relationship Edges (for future Map)
// ============================================================================

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

export type Skill = {
  id: string;
  label: string;
};

export type Link = {
  label: string;
  href: string;
};

export type Media = {
  kind: "image" | "video";
  src: string;
  alt?: string;
};

export type ProjectCategory = "web" | "mobile" | "ml" | "game" | "tool";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  skillIds: string[];
  highlights: string[];
  links?: Link[];
  media?: Media[];
  relatedProjectIds?: string[];
  relatedExperienceIds?: string[];
};

export type Experience = {
  id: string;
  slug: string;
  title: string;
  org?: string;
  role: string;
  previousRole?: string; // For showing promotion history
  timeframe?: string;
  summary: string;
  skillIds: string[];
  highlights: string[];
  links?: Link[];
  relatedProjectIds?: string[];
};

export type EdgeNode = {
  kind: "experience" | "project";
  id: string;
};

export type Edge = {
  from: EdgeNode;
  to: EdgeNode;
  label?: string;
};

export type EngineeringData = {
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  edges: Edge[];
};

// ----------------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------------

const skills: Skill[] = [
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "sql", label: "SQL" },
  { id: "react", label: "React" },
  { id: "react-native", label: "React Native" },
  { id: "nextjs", label: "Next.js" },
  { id: "tailwindcss", label: "Tailwind CSS" },
  { id: "threejs", label: "Three.js" },
  { id: "nodejs", label: "Node.js" },
  { id: "django", label: "Django" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "mongodb", label: "MongoDB" },
  { id: "rest-apis", label: "REST APIs" },
  { id: "graphql", label: "GraphQL" },
  { id: "aws", label: "AWS" },
  { id: "vercel", label: "Vercel" },
  { id: "docker", label: "Docker" },
  { id: "git", label: "Git" },
  { id: "supabase", label: "Supabase" },
  { id: "auth", label: "Authentication" },
  { id: "realtime", label: "Realtime" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "godot", label: "Godot" },
  { id: "gdscript", label: "GDScript" },
  { id: "ui-ux", label: "UI/UX" },
  { id: "figma", label: "Figma" },
  { id: "game-dev", label: "Game Dev" },
];

const projects: Project[] = [
  {
    id: "wbg-website",
    slug: "wbg-website",
    title: "WBG Website",
    category: "web",
    summary: "Full-stack web platform with modern design and seamless user experience.",
    skillIds: [
      "typescript",
      "react",
      "nextjs",
      "tailwindcss",
      "ui-ux",
      "figma",
      "vercel",
      "git",
      "threejs",
    ],
    highlights: [
      "Built responsive, accessible UI with Next.js App Router",
      "Integrated 3D elements using Three.js",
      "Deployed and managed on Vercel with CI/CD",
    ],
    relatedExperienceIds: ["wbg"],
  },
  {
    id: "wbg-app",
    slug: "wbg-app",
    title: "WBG App",
    category: "mobile",
    summary: "Cross-platform mobile application for iOS and Android users.",
    skillIds: [
      "typescript",
      "react-native",
      "ui-ux",
      "figma",
      "rest-apis",
      "auth",
      "supabase",
      "git",
    ],
    highlights: [
      "Developed cross-platform mobile app with React Native",
      "Implemented secure authentication flows",
      "Integrated with Supabase backend",
    ],
    relatedExperienceIds: ["wbg"],
  },
  {
    id: "soldiermix",
    slug: "soldiermix",
    title: "SoldierMix",
    category: "ml",
    summary: "AI-powered audio mixing platform with intelligent sound processing.",
    skillIds: ["python", "machine-learning", "docker", "git"],
    highlights: [
      "Built ML models for audio stem separation",
      "Containerized application with Docker",
      "Processed thousands of audio files",
    ],
    relatedExperienceIds: ["teragram"],
  },
  {
    id: "open-planner",
    slug: "open-planner",
    title: "Open Planner",
    category: "web",
    summary: "Collaborative planning tool with real-time sync and calendar integration.",
    skillIds: [
      "typescript",
      "react",
      "nextjs",
      "tailwindcss",
      "postgresql",
      "sql",
      "rest-apis",
      "auth",
      "supabase",
      "vercel",
      "git",
    ],
    highlights: [
      "Founded and developed from concept to launch",
      "Built real-time collaboration features",
      "Implemented calendar integrations",
    ],
    relatedExperienceIds: ["open-planner-exp"],
  },
  {
    id: "pickl",
    slug: "pickl",
    title: "Pickl",
    category: "web",
    summary: "Social discovery app connecting people through shared interests.",
    skillIds: [
      "python",
      "django",
      "postgresql",
      "sql",
      "rest-apis",
      "react",
      "docker",
      "git",
    ],
    highlights: [
      "Built Django backend with PostgreSQL",
      "Developed matching algorithm for user connections",
      "Containerized deployment with Docker",
    ],
    relatedExperienceIds: ["enact"],
  },
  {
    id: "rolodex",
    slug: "rolodex",
    title: "Rolodex",
    category: "web",
    summary: "Modern contact management system with relationship tracking.",
    skillIds: [
      "typescript",
      "react",
      "nextjs",
      "supabase",
      "postgresql",
      "auth",
      "rest-apis",
      "vercel",
      "git",
    ],
    highlights: [
      "Built CRM-style contact management",
      "Implemented relationship graph tracking",
      "Deployed on Vercel with Supabase backend",
    ],
    relatedExperienceIds: ["teragram"],
  },
  {
    id: "rollin-web",
    slug: "rollin-web",
    title: "Rollin Web",
    category: "web",
    summary:
      "Sign up for early access to the Rollin app! Please check out the Instagram and join the Discord community!",
    skillIds: [
      "typescript",
      "react",
      "nextjs",
      "tailwindcss",
      "supabase",
      "postgresql",
      "realtime",
      "auth",
      "vercel",
      "git",
    ],
    highlights: [
      "Built landing page with waitlist signup",
      "Integrated Discord and Instagram links",
      "Real-time user count updates",
    ],
    relatedProjectIds: ["rollin-app"],
    relatedExperienceIds: ["teragram"],
  },
  {
    id: "rollin-app",
    slug: "rollin-app",
    title: "Rollin App",
    category: "mobile",
    summary:
      "Social media platform where the cannabis community connects, creates memories, and more!",
    skillIds: [
      "typescript",
      "react-native",
      "supabase",
      "postgresql",
      "realtime",
      "auth",
      "ui-ux",
      "git",
    ],
    highlights: [
      "Developed cross-platform social app",
      "Built real-time messaging and notifications",
      "Designed user experience from scratch",
    ],
    relatedProjectIds: ["rollin-web"],
    relatedExperienceIds: ["teragram"],
  },
  {
    id: "redwood",
    slug: "redwood",
    title: "Redwood",
    category: "game",
    summary: "Indie narrative exploration built in Godot celebrating the Redwood forest canopy.",
    skillIds: ["godot", "gdscript", "game-dev", "git", "ui-ux"],
    highlights: [
      "Built exploration game in Godot 4",
      "Designed narrative and environmental storytelling",
      "Created custom shaders for forest atmosphere",
    ],
  },
];

const experiences: Experience[] = [
  {
    id: "wbg",
    slug: "wbg",
    title: "WeBeGiggin'",
    org: "WeBeGiggin'",
    role: "Full-Stack Engineer",
    previousRole: "Full-Stack & Project Management Intern",
    timeframe: "2023 – Present",
    summary: "Led development of web and mobile platforms serving thousands of users.",
    skillIds: [
      "typescript",
      "react",
      "react-native",
      "nextjs",
      "tailwindcss",
      "supabase",
      "postgresql",
      "auth",
      "vercel",
      "git",
      "ui-ux",
      "figma",
      "threejs",
    ],
    highlights: [
      "Architected and built company website from scratch",
      "Developed cross-platform mobile application",
      "Managed deployment pipelines and infrastructure",
    ],
    relatedProjectIds: ["wbg-website", "wbg-app"],
  },
  {
    id: "enact",
    slug: "enact",
    title: "Enact Insight",
    org: "Enact Insight",
    role: "Software Engineering Intern",
    timeframe: "2022 – 2023",
    summary: "Built scalable backend systems and contributed to core product features.",
    skillIds: ["python", "django", "postgresql", "sql", "rest-apis", "docker", "git"],
    highlights: [
      "Built backend services with Django and PostgreSQL",
      "Implemented API integrations for third-party services",
      "Improved system performance and reliability",
    ],
    relatedProjectIds: ["pickl"],
  },
  {
    id: "open-planner-exp",
    slug: "open-planner",
    title: "Open Planner",
    org: "Open Planner",
    role: "Lead Software Engineer",
    previousRole: "Software Engineer",
    timeframe: "2022 – Present",
    summary: "Created and launched a productivity tool from concept to market.",
    skillIds: [
      "typescript",
      "react",
      "nextjs",
      "tailwindcss",
      "postgresql",
      "supabase",
      "auth",
      "vercel",
      "git",
    ],
    highlights: [
      "Founded company and defined product vision",
      "Built full-stack application solo",
      "Acquired early users and iterated on feedback",
    ],
    relatedProjectIds: ["open-planner"],
  },
  {
    id: "teragram",
    slug: "teragram",
    title: "Teragram Development",
    org: "Teragram Development",
    role: "Full-Stack / ML Engineer",
    timeframe: "2021 – Present",
    summary: "Building web, mobile, and ML applications across multiple domains.",
    skillIds: [
      "typescript",
      "react",
      "react-native",
      "nextjs",
      "tailwindcss",
      "supabase",
      "postgresql",
      "realtime",
      "auth",
      "python",
      "machine-learning",
      "docker",
      "vercel",
      "git",
      "ui-ux",
    ],
    highlights: [
      "Built NLP models for audio processing",
      "Developed social platform for cannabis community",
      "Created modern contact management system",
    ],
    relatedProjectIds: ["soldiermix", "rollin-web", "rollin-app", "rolodex"],
  },
];

const edges: Edge[] = [
  // WeBeGiggin' experience → WBG projects
  { from: { kind: "experience", id: "wbg" }, to: { kind: "project", id: "wbg-website" }, label: "built" },
  { from: { kind: "experience", id: "wbg" }, to: { kind: "project", id: "wbg-app" }, label: "shipped" },
  
  // Enact Insight experience → Pickl project
  { from: { kind: "experience", id: "enact" }, to: { kind: "project", id: "pickl" }, label: "built" },
  
  // Open Planner experience → Open Planner project
  { from: { kind: "experience", id: "open-planner-exp" }, to: { kind: "project", id: "open-planner" }, label: "founded" },
  
  // Teragram Development experience → SoldierMix, Rollin, and Rolodex projects
  { from: { kind: "experience", id: "teragram" }, to: { kind: "project", id: "soldiermix" }, label: "built" },
  { from: { kind: "experience", id: "teragram" }, to: { kind: "project", id: "rollin-web" }, label: "built" },
  { from: { kind: "experience", id: "teragram" }, to: { kind: "project", id: "rollin-app" }, label: "shipped" },
  { from: { kind: "experience", id: "teragram" }, to: { kind: "project", id: "rolodex" }, label: "designed" },
  
  // Related projects
  { from: { kind: "project", id: "rollin-web" }, to: { kind: "project", id: "rollin-app" }, label: "companion" },
  { from: { kind: "project", id: "wbg-website" }, to: { kind: "project", id: "wbg-app" }, label: "companion" },
];

// ----------------------------------------------------------------------------
// Validation (development only)
// ----------------------------------------------------------------------------

function validateEngineeringData(data: EngineeringData): void {
  if (process.env.NODE_ENV === "production") return;

  const skillIds = new Set(data.skills.map((s) => s.id));
  const projectIds = new Set(data.projects.map((p) => p.id));
  const experienceIds = new Set(data.experiences.map((e) => e.id));

  // Check for duplicate IDs
  const checkDuplicates = (items: { id: string }[], type: string) => {
    const seen = new Set<string>();
    for (const item of items) {
      if (seen.has(item.id)) {
        console.warn(`[Engineering Data] Duplicate ${type} id: "${item.id}"`);
      }
      seen.add(item.id);
    }
  };

  checkDuplicates(data.skills, "skill");
  checkDuplicates(data.projects, "project");
  checkDuplicates(data.experiences, "experience");

  // Validate project references
  for (const project of data.projects) {
    // Check skillIds
    for (const skillId of project.skillIds) {
      if (!skillIds.has(skillId)) {
        console.warn(
          `[Engineering Data] Project "${project.id}" references unknown skill: "${skillId}"`
        );
      }
    }

    // Check relatedProjectIds
    if (project.relatedProjectIds) {
      for (const relatedId of project.relatedProjectIds) {
        if (!projectIds.has(relatedId)) {
          console.warn(
            `[Engineering Data] Project "${project.id}" references unknown relatedProject: "${relatedId}"`
          );
        }
      }
    }

    // Check relatedExperienceIds
    if (project.relatedExperienceIds) {
      for (const relatedId of project.relatedExperienceIds) {
        if (!experienceIds.has(relatedId)) {
          console.warn(
            `[Engineering Data] Project "${project.id}" references unknown relatedExperience: "${relatedId}"`
          );
        }
      }
    }
  }

  // Validate experience references
  for (const experience of data.experiences) {
    // Check skillIds
    for (const skillId of experience.skillIds) {
      if (!skillIds.has(skillId)) {
        console.warn(
          `[Engineering Data] Experience "${experience.id}" references unknown skill: "${skillId}"`
        );
      }
    }

    // Check relatedProjectIds
    if (experience.relatedProjectIds) {
      for (const relatedId of experience.relatedProjectIds) {
        if (!projectIds.has(relatedId)) {
          console.warn(
            `[Engineering Data] Experience "${experience.id}" references unknown relatedProject: "${relatedId}"`
          );
        }
      }
    }
  }

  // Validate edges
  for (const edge of data.edges) {
    const fromSet = edge.from.kind === "project" ? projectIds : experienceIds;
    const toSet = edge.to.kind === "project" ? projectIds : experienceIds;

    if (!fromSet.has(edge.from.id)) {
      console.warn(
        `[Engineering Data] Edge references unknown ${edge.from.kind}: "${edge.from.id}"`
      );
    }

    if (!toSet.has(edge.to.id)) {
      console.warn(
        `[Engineering Data] Edge references unknown ${edge.to.kind}: "${edge.to.id}"`
      );
    }
  }
}

// ----------------------------------------------------------------------------
// Export
// ----------------------------------------------------------------------------

export const engineeringData = {
  skills,
  projects,
  experiences,
  edges,
} satisfies EngineeringData;

// Run validation in development
validateEngineeringData(engineeringData);

// Convenience re-exports for simpler imports
export { skills, projects, experiences, edges };

