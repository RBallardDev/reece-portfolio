import EngineeringCard from "./EngineeringCard";

type GridItem = {
  title: string;
  type: string;
  summary: string;
};

const projectsData: GridItem[] = [
  {
    title: "WBG Website",
    type: "Web",
    summary: "Full-stack web platform with modern design and seamless user experience.",
  },
  {
    title: "WBG App",
    type: "Mobile",
    summary: "Cross-platform mobile application for iOS and Android users.",
  },
  {
    title: "Open Planner",
    type: "Web",
    summary: "Collaborative planning tool with real-time sync and calendar integration.",
  },
  {
    title: "SoldierMix",
    type: "Web / ML",
    summary: "AI-powered audio mixing platform with intelligent sound processing.",
  },
  {
    title: "Pickl",
    type: "Mobile",
    summary: "Social discovery app connecting people through shared interests.",
  },
  {
    title: "Rolodex",
    type: "Web",
    summary: "Modern contact management system with relationship tracking.",
  },
];

const experienceData: GridItem[] = [
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

type EngineeringGridProps = {
  mode: "projects" | "experience";
};

export default function EngineeringGrid({ mode }: EngineeringGridProps) {
  const data = mode === "projects" ? projectsData : experienceData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <EngineeringCard
          key={item.title}
          title={item.title}
          type={item.type}
          summary={item.summary}
        />
      ))}
    </div>
  );
}

