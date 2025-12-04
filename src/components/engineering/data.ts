export type Skill = {
  id: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  type: string;
  summary: string;
  skillIds: string[];
};

export type ExperienceEntry = {
  title: string;
  type: string;
  summary: string;
};

export const skills: Skill[] = [
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

export const projects: Project[] = [
  {
    id: "wbg-website",
    title: "WBG Website",
    type: "Web",
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
  },
  {
    id: "wbg-app",
    title: "WBG App",
    type: "Mobile",
    summary: "Cross-platform mobile application for iOS and Android users.",
    skillIds: ["typescript", "react-native", "ui-ux", "figma", "rest-apis", "auth", "supabase", "git"],
  },
  {
    id: "soldiermix",
    title: "SoldierMix",
    type: "Web / ML",
    summary: "AI-powered audio mixing platform with intelligent sound processing.",
    skillIds: ["python", "machine-learning", "docker", "git"],
  },
  {
    id: "open-planner",
    title: "Open Planner",
    type: "Web",
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
  },
  {
    id: "pickl",
    title: "Pickl",
    type: "Web",
    summary: "Social discovery app connecting people through shared interests.",
    skillIds: ["python", "django", "postgresql", "sql", "rest-apis", "react", "docker", "git"],
  },
  {
    id: "rolodex",
    title: "Rolodex",
    type: "Web",
    summary: "Modern contact management system with relationship tracking.",
    skillIds: ["typescript", "react", "nextjs", "supabase", "postgresql", "auth", "rest-apis", "vercel", "git"],
  },
  {
    id: "rollin-web",
    title: "Rollin Web",
    type: "Web",
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
  },
  {
    id: "rollin-app",
    title: "Rollin App",
    type: "Mobile",
    summary:
      "Social media platform where the cannabis community connects, creates memories, and more!",
    skillIds: ["typescript", "react-native", "supabase", "postgresql", "realtime", "auth", "ui-ux", "git"],
  },
  {
    id: "redwood",
    title: "Redwood",
    type: "Game",
    summary: "Indie narrative exploration built in Godot celebrating the Redwood forest canopy.",
    skillIds: ["godot", "gdscript", "game-dev", "git", "ui-ux"],
  },
];

export const experienceEntries: ExperienceEntry[] = [
  {
    title: "WBG",
    type: "Full-Stack Engineer",
    summary: "Led development of web and mobile platforms serving thousands of users.",
  },
  {
    title: "Enact",
    type: "Software Engineer",
    summary: "Built scalable backend systems and contributed to core product features.",
  },
  {
    title: "Open Planner",
    type: "Founder / Developer",
    summary: "Created and launched a productivity tool from concept to market.",
  },
  {
    title: "Teragram",
    type: "ML Engineer",
    summary: "Developed machine learning models for natural language processing tasks.",
  },
];

