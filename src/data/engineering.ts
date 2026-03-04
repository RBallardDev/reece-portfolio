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
  description?: string;
  coverImage?: string;
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
  previousRole?: string;
  coverImage?: string;
  timeframe?: string;
  summary: string;
  description?: string;
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
  { id: "swift", label: "Swift" },
  { id: "swiftui", label: "SwiftUI" },
  { id: "avfoundation", label: "AVFoundation" },
  { id: "metal", label: "Metal" },
  { id: "core-image", label: "Core Image" },
  { id: "combine", label: "Combine" },
  { id: "mapkit", label: "MapKit" },
  { id: "core-location", label: "Core Location" },
  { id: "uikit", label: "UIKit" },
  { id: "os-log", label: "OSLog" },
  { id: "phosphor-icons", label: "Phosphor Icons" },
  { id: "xcode", label: "Xcode" },
  { id: "swift-package-manager", label: "Swift Package Manager" },
  { id: "xctest", label: "XCTest" },
  { id: "vite", label: "Vite" },
  { id: "shadcn-ui", label: "shadcn/ui" },
  { id: "capacitor", label: "Capacitor" },
  { id: "revenuecat", label: "RevenueCat" },
  { id: "deno", label: "Deno" },
  { id: "react-router", label: "React Router" },
  { id: "tanstack-react-query", label: "TanStack React Query" },
  { id: "recharts", label: "Recharts" },
  { id: "react-hook-form", label: "React Hook Form" },
  { id: "zod", label: "Zod" },
  { id: "radix-ui", label: "Radix UI" },
  { id: "date-fns", label: "date-fns" },
  { id: "apple-iap", label: "Apple In-App Purchases" },
  { id: "expo", label: "Expo" },
  { id: "expo-router", label: "Expo Router" },
  { id: "fastapi", label: "FastAPI" },
  { id: "openai-api", label: "OpenAI API" },
  { id: "nativewind", label: "NativeWind" },
  { id: "react-navigation", label: "React Navigation" },
  { id: "react-native-reanimated", label: "React Native Reanimated" },
  { id: "react-native-gesture-handler", label: "React Native Gesture Handler" },
  { id: "eas-build", label: "EAS Build" },
  { id: "google-places-api", label: "Google Places API" },
  { id: "pydantic", label: "Pydantic" },
  { id: "essentia-js", label: "Essentia.js" },
  { id: "pwa", label: "PWA" },
  { id: "storekit", label: "StoreKit 2" },
  { id: "aws-s3", label: "AWS S3" },
  { id: "aws-cognito", label: "AWS Cognito" },
  { id: "aws-lambda", label: "AWS Lambda" },
  { id: "aws-ses", label: "AWS SES" },
  { id: "aws-elastic-beanstalk", label: "AWS Elastic Beanstalk" },
  { id: "express", label: "Express.js" },
  { id: "sequelize", label: "Sequelize" },
  { id: "socket-io", label: "Socket.IO" },
  { id: "stripe", label: "Stripe" },
  { id: "redux-toolkit", label: "Redux Toolkit" },
  { id: "jest", label: "Jest" },
  { id: "swagger", label: "Swagger / OpenAPI" },
  { id: "nginx", label: "NGINX" },
  { id: "lenis", label: "Lenis" },
  { id: "django-rest-framework", label: "Django REST Framework" },
  { id: "numpy", label: "NumPy" },
  { id: "pandas", label: "Pandas" },
  { id: "scikit-learn", label: "scikit-learn" },
  { id: "sentry", label: "Sentry" },
  { id: "aws-ec2", label: "AWS EC2" },
];

const projects: Project[] = [
  {
    id: "wbg-website",
    slug: "wbg-website",
    title: "WeBeGiggin' Website",
    category: "web",
    summary: "Community-driven marketing site with events, blog CMS, and interactive cork-board wall.",
    description:
      "I built the marketing site for WeBeGiggin', a community-first gig platform, using Next.js 15 App Router with server-first rendering and Supabase as the full backend (auth, Postgres, storage). The site features a community cork-board wall where users post sticky notes with seeded-random layouts, a date-fns-powered event calendar with auth-gated event creation, and a blog CMS with slug-based routing and server-action mutations. All reads use RLS-safe Supabase queries from server components, keeping the client bundle lean.",
    coverImage: "/images/projects/wbg-web/cover1.png",
    skillIds: [
      "typescript",
      "react",
      "nextjs",
      "tailwindcss",
      "supabase",
      "postgresql",
      "zod",
      "date-fns",
      "lenis",
    ],
    highlights: [
      "Built an interactive community cork-board wall with Supabase CRUD, admin pinning/deletion, seeded-random note layouts, and React portal modals",
      "Architected server-first data fetching across 8+ routes using Next.js App Router server components with RLS-safe Supabase queries",
      "Implemented full auth flow — sign-up, sign-in, profile CRUD with avatar upload — using Supabase Auth and Storage buckets",
      "Designed a custom event calendar with date-fns, featuring prev/next navigation, event dot markers, and auth-gated event creation via server actions",
      "Shipped a blog CMS with slug-based dynamic routing, server-action-powered post creation/editing, and cover image uploads to Supabase Storage",
      "Engineered smooth-scroll UX with Lenis, intersection-observer animations, CSS marquee effects, and a scroll-aware header with dynamic contrast",
    ],
    relatedExperienceIds: ["wbg"],
  },
  {
    id: "wbg-app",
    slug: "wbg-app",
    title: "WeBeGiggin'",
    category: "mobile",
    summary: "A React Native gig economy platform with real-time messaging, AI career coaching, and a social feed.",
    description:
      "I built a mobile-first gig economy community app connecting freelancers with opportunities. The app features a social feed with pagination and optimistic likes, a real-time messaging system powered by Supabase Realtime with unread tracking, an AI career assistant backed by a Python FastAPI server using GPT-4o with function calling to update user profiles conversationally, and a full job/event discovery system. The 26-table PostgreSQL schema includes RLS policies, full-text search vectors, and a normalized conversation model I designed from scratch.",
    skillIds: [
      "javascript",
      "react-native",
      "expo",
      "expo-router",
      "supabase",
      "postgresql",
      "python",
      "fastapi",
      "openai-api",
      "nativewind",
      "tailwindcss",
      "react-navigation",
      "react-native-reanimated",
      "react-native-gesture-handler",
      "eas-build",
      "google-places-api",
      "pydantic",
    ],
    highlights: [
      "Architected a 26-table PostgreSQL schema with Row Level Security, custom enums, full-text search vectors, and composite foreign keys across jobs, applications, and engagement tracking",
      "Built a real-time messaging system from scratch — conversations, participants, and messages tables with Supabase Realtime subscriptions, optimistic sends, unread tracking via last_read_at, and date separators",
      "Implemented an AI career coach (\"Aqua\") using a Python FastAPI backend with OpenAI GPT-4o function calling that conversationally updates user profiles, skills, and work history against Supabase",
      "Designed a service layer (posts, events, jobs, users, messages) decoupling all screens from direct Supabase queries, with paginated feeds, pull-to-refresh, skeleton loading, and optimistic UI updates",
      "Shipped a social feed, event RSVP system, gig search with category filters, and full profile builder (skills with drag-to-reorder, work experience, education, AI-generated bios) across iOS and Android",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/kathyscodes/WeBeGigginApp" },
    ],
    relatedExperienceIds: ["wbg"],
  },
  {
    id: "ghostwriter",
    slug: "ghostwriter",
    title: "GhostWriter",
    category: "web",
    summary: "AI-powered rap lyric generator with a section-aware editor and beat library.",
    description:
      "I built a full-stack PWA for generating and editing rap lyrics using OpenAI, with a custom contentEditable editor that features a Matrix-style binary reveal animation and section-aware tag parsing. The app includes artist style profiling (paste reference lyrics → AI generates a structured style card for prompt injection), a beat library with client-side BPM/key detection via Essentia.js WASM, and a lock/directive system that lets users constrain AI regeneration around preserved bars. Backed by Supabase for auth and per-user data with row-level security.",
    skillIds: [
      "typescript",
      "react",
      "nextjs",
      "tailwindcss",
      "supabase",
      "postgresql",
      "openai-api",
      "essentia-js",
      "pwa",
      "nodejs",
      "sql",
    ],
    highlights: [
      "Built a custom contentEditable lyric editor with a binary Matrix-style character reveal animation and **[Tag]** section parsing across ~7,500 lines of TypeScript",
      "Designed a section sync architecture where repeated song structures (hooks, verses) mirror their canonical instance in real time, with a detach syntax for independent editing",
      "Implemented AI-generated artist style cards — pasting reference lyrics produces structured profiles (cadence, rhyme density, tone, adlibs) injected into OpenAI prompts",
      "Architected client-side BPM and musical key detection using Essentia.js WASM for the beat library's drag-and-drop upload and YouTube/SoundCloud/Spotify URL import flow",
      "Built a lock + inline directive system (⌘L to lock bars, // comments as AI instructions) letting users constrain regeneration around preserved content",
      "Shipped as an installable PWA with Supabase auth, per-user row-level security across 5 Postgres tables, and streamed OpenAI responses",
    ],
    relatedExperienceIds: ["teragram"],
  },
  {
    id: "open-planner",
    slug: "open-planner",
    title: "Open Planner",
    category: "web",
    summary: "AI-powered student planner — React web app, SwiftUI iOS client, and Node.js backend across three codebases.",
    description:
      "I built Open Planner end-to-end: a React web app, a native SwiftUI iOS client, and a Node.js/Express backend. Students upload course syllabi and an AI pipeline (AWS Lambda + LibreOffice) extracts assignments, exams, and deadlines into a unified calendar. The platform features real-time group and direct messaging over Socket.IO, a multi-tier subscription system spanning Stripe, Apple IAP via StoreKit 2, and parent/family plans with seat-based claim codes, and a custom drag-and-drop calendar with Google/Outlook/Apple export. The backend runs on AWS Elastic Beanstalk with PostgreSQL, Cognito auth, S3 file storage, and SES transactional email.",
    skillIds: [
      "typescript",
      "react",
      "redux-toolkit",
      "swift",
      "swiftui",
      "nodejs",
      "express",
      "postgresql",
      "sequelize",
      "socket-io",
      "stripe",
      "storekit",
      "aws-s3",
      "aws-cognito",
      "aws-lambda",
      "aws-ses",
      "aws-elastic-beanstalk",
      "xcode",
      "jest",
      "swagger",
      "nginx",
      "docker",
    ],
    highlights: [
      "Built an automated syllabus parsing pipeline — PDF/DOC upload to S3, LibreOffice conversion via AWS Lambda, SHA-256 dedup cache, and extraction of assignments, exams, and deadlines into calendar events",
      "Implemented real-time group chat and 1:1 DM with Socket.IO — typing indicators, presence tracking, presigned S3 attachments, sliding-window rate limiting, and cursor-based message pagination",
      "Architected a multi-tier subscription system supporting Stripe recurring billing, Apple IAP via StoreKit 2 with server-side receipt validation, and parent/family plans with seat-based claim code redemption",
      "Designed a custom calendar with month/week/day views, native HTML5 drag-and-drop rescheduling, and Google/Outlook/Apple calendar export",
      "Built the native SwiftUI iOS client with Keychain-stored JWT auth, transparent 401 token refresh, an offline-first data layer with background sync, and push notifications via APNs",
      "Deployed on AWS Elastic Beanstalk with custom platform hooks, NGINX proxy tuning, a separate notification worker process, and PostgreSQL with Sequelize ORM",
    ],
    links: [
      { label: "Live Site", href: "https://open-planner.com" },
    ],
    relatedExperienceIds: ["open-planner-exp"],
  },
  {
    id: "pickl",
    slug: "pickl",
    title: "Pickl",
    category: "web",
    summary: "Full-stack movie/TV recommendation platform with group-based collaborative filtering.",
    description:
      "I built Pickl, a personalized movie and TV show recommendation engine that scores titles using Euclidean distance between user demographic vectors and title interest-composition matrices. Users complete an onboarding questionnaire that maps to binary feature vectors across 18 demographic/preference segments, then receive ranked recommendations filtered by their watchlist and viewing history. I also designed a group recommendation system where members' individual scores are aggregated via RobustScaler normalization, letting friend groups find shows everyone will enjoy.",
    skillIds: [
      "python",
      "django",
      "django-rest-framework",
      "react",
      "react-router",
      "numpy",
      "pandas",
      "scikit-learn",
      "postgresql",
      "sql",
      "docker",
      "nginx",
      "aws-elastic-beanstalk",
      "aws-ses",
      "aws-ec2",
      "sentry",
    ],
    highlights: [
      "Built a content-based recommendation engine using NumPy and Pandas that computes Euclidean distance scores across 18 demographic segments to rank thousands of titles per user",
      "Designed a group recommendation system that aggregates member scores with scikit-learn's RobustScaler normalization, enabling shared watchlists with upvote/downvote consensus",
      "Architected a Django REST API with 12+ endpoints serving a React SPA, using raw SQL CTEs with multi-join preference filtering for recommendations, watchlists, and watch history",
      "Implemented full auth flow with django-allauth (email + Facebook OAuth), custom user model, group invitation system with email notifications via AWS SES, and Google reCAPTCHA",
      "Containerized the full stack (Django + React + Nginx + Gunicorn) in a single Docker image and deployed to AWS Elastic Beanstalk with health-check monitoring and Sentry error tracking",
    ],
    links: [
      { label: "Live Site", href: "https://pickl.tv" },
    ],
    relatedExperienceIds: ["enact"],
  },
  {
    id: "armed",
    slug: "armed",
    title: "ARMed",
    category: "mobile",
    summary: "Youth baseball arm health tracker with sports-science workload modeling, shipped to the iOS App Store.",
    description:
      "I built ARMed, an iOS app that helps youth baseball players (ages 8–14), coaches, and parents track throwing workload and arm health. The core engine uses EWMA-based acute:chronic workload ratios from sports science research to generate daily readiness scores and Pitch Smart–compliant rest recommendations. I designed a multi-role system (player/coach/parent) backed by Supabase with RLS policies and Deno edge functions, and integrated RevenueCat for Apple IAP subscriptions alongside a team-based unlock code model for $750/year team plans.",
    skillIds: [
      "typescript",
      "react",
      "vite",
      "tailwindcss",
      "shadcn-ui",
      "supabase",
      "postgresql",
      "capacitor",
      "revenuecat",
      "deno",
      "react-router",
      "tanstack-react-query",
      "recharts",
      "react-hook-form",
      "zod",
      "radix-ui",
      "date-fns",
      "xcode",
      "apple-iap",
    ],
    highlights: [
      "Built a custom workload engine using EWMA-based acute:chronic ratios across 4 age bands, converting game pitches, defense, catching, bullpen, and practice into Throwing Load Units (TLUs) for daily readiness scoring",
      "Implemented Pitch Smart compliance logic with official rest-day thresholds, recovery window calculations, and multi-day graduated score penalties tied to pitch counts",
      "Designed a three-ring WHOOP-inspired dashboard displaying readiness, sleep support, and load ratio with animated SVG rings and score breakdowns",
      "Architected a role-based data model (player/coach/parent) with Supabase Row-Level Security, 9 Deno edge functions, and team management via 6-character join codes",
      "Integrated RevenueCat for Apple IAP subscriptions (monthly/yearly + 7-day trial) alongside off-app team unlock codes, with a unified entitlement hook merging three premium sources",
      "Shipped to the iOS App Store via Capacitor with native keyboard handling, safe-area insets, splash screen, and Apple-compliant account deletion",
    ],
    relatedExperienceIds: ["teragram"],
  },
  {
    id: "rollin-app",
    slug: "rollin-app",
    title: "Rollin'",
    category: "mobile",
    summary: "Camera-first cannabis social app with dual-camera PIP capture and Metal compositing.",
    description:
      "I built Rollin' as a ground-up SwiftUI rewrite of a cannabis lifestyle social platform targeting iOS 17+. The centerpiece is a custom dual-camera picture-in-picture capture system using AVCaptureMultiCamSession with real-time Metal-backed CIImage compositing via AVAssetWriter — modeled after Apple's AVMultiCamPiP reference architecture. The app features MVVM with protocol-oriented dependency injection, a comprehensive design system, and a clean Supabase abstraction boundary that isolates all SDK types behind a single protocol.",
    skillIds: [
      "swift",
      "swiftui",
      "avfoundation",
      "metal",
      "core-image",
      "combine",
      "mapkit",
      "core-location",
      "uikit",
      "os-log",
      "phosphor-icons",
      "supabase",
      "xcode",
      "swift-package-manager",
      "xctest",
    ],
    highlights: [
      "Built a 10-phase dual-camera PIP capture system using AVCaptureMultiCamSession with real-time Metal-backed CIImage compositing, frame-grab photo capture, and H.264 AVAssetWriter recording at 6Mbps",
      "Implemented a portrait-first video compositing pipeline (PiPVideoMixer) that orients both camera feeds, applies aspect-fill cropping, and bakes the draggable PIP overlay into the final .mov file",
      "Designed a boomerang capture mode that deep-copies pixel buffers during a 1.5s window and stitches forward+reverse frames into a seamless looping video",
      "Architected thermal management with KVO-based system pressure monitoring, automatic front camera resolution/framerate reduction, and graceful dual-mode degradation on constrained devices",
      "Built a protocol-oriented DI container (AppContainer) with a clean Supabase abstraction boundary — only one file in the entire codebase touches the SDK, enabling full testability with fakes",
      "Shipped ~80 Swift files across a layered MVVM architecture with a custom design system (typography, spacing, color tokens, animation curves) and per-environment xcconfig build configurations",
    ],
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
    coverImage: "/images/experiences/wbg/cover.png",
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
    coverImage: "/images/experiences/enact/cover2.png",
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
    coverImage: "/images/experiences/op/cover.png",
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
    relatedProjectIds: ["ghostwriter", "rollin-app", "armed"],
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
  
  // Teragram Development experience → SoldierMix, Rollin, and ARMed projects
  { from: { kind: "experience", id: "teragram" }, to: { kind: "project", id: "ghostwriter" }, label: "built" },
  { from: { kind: "experience", id: "teragram" }, to: { kind: "project", id: "rollin-app" }, label: "shipped" },
  { from: { kind: "experience", id: "teragram" }, to: { kind: "project", id: "armed" }, label: "shipped" },
  
  // Related projects
  
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

