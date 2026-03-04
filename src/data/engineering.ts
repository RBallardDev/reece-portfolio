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
  hidden?: boolean;
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
  categoryLabel?: string;
  summary: string;
  description?: string;
  coverImage?: string;
  coverBg?: string;
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
  // --- Languages ---
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "swift", label: "Swift" },
  { id: "sql", label: "SQL" },
  { id: "gdscript", label: "GDScript" },

  // --- Frontend ---
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "tailwindcss", label: "Tailwind CSS" },
  { id: "threejs", label: "Three.js" },
  { id: "redux-toolkit", label: "Redux Toolkit" },
  { id: "vite", label: "Vite" },

  // --- Mobile ---
  { id: "react-native", label: "React Native" },
  { id: "expo", label: "Expo" },
  { id: "swiftui", label: "SwiftUI" },
  { id: "uikit", label: "UIKit" },
  { id: "avfoundation", label: "AVFoundation" },
  { id: "metal", label: "Metal" },
  { id: "capacitor", label: "Capacitor" },
  { id: "storekit", label: "StoreKit 2" },

  // --- Backend ---
  { id: "nodejs", label: "Node.js" },
  { id: "express", label: "Express.js" },
  { id: "django", label: "Django" },
  { id: "django-rest-framework", label: "Django REST Framework" },
  { id: "fastapi", label: "FastAPI" },
  { id: "deno", label: "Deno" },

  // --- Data & Databases ---
  { id: "postgresql", label: "PostgreSQL" },
  { id: "supabase", label: "Supabase" },
  { id: "mongodb", label: "MongoDB" },
  { id: "sequelize", label: "Sequelize" },

  // --- AI & ML ---
  { id: "openai-api", label: "OpenAI API" },
  { id: "numpy", label: "NumPy" },
  { id: "pandas", label: "Pandas" },
  { id: "scikit-learn", label: "scikit-learn" },
  { id: "machine-learning", label: "Machine Learning" },

  // --- Cloud & Infra ---
  { id: "aws", label: "AWS" },
  { id: "aws-lambda", label: "AWS Lambda" },
  { id: "aws-s3", label: "AWS S3" },
  { id: "aws-cognito", label: "AWS Cognito" },
  { id: "docker", label: "Docker" },
  { id: "vercel", label: "Vercel" },
  { id: "nginx", label: "NGINX" },

  // --- Payments & Services ---
  { id: "stripe", label: "Stripe" },
  { id: "revenuecat", label: "RevenueCat" },
  { id: "socket-io", label: "Socket.IO" },
  { id: "sentry", label: "Sentry" },

  // --- Testing ---
  { id: "jest", label: "Jest" },

  // --- Design & Tools ---
  { id: "ui-ux", label: "UI/UX" },
  { id: "figma", label: "Figma" },
  { id: "godot", label: "Godot" },
  { id: "game-dev", label: "Game Dev" },
  { id: "pwa", label: "PWA" },

  // --- Hidden: accurate for project detail views, too granular for sidebar ---
  { id: "core-image", label: "Core Image", hidden: true },
  { id: "combine", label: "Combine", hidden: true },
  { id: "mapkit", label: "MapKit", hidden: true },
  { id: "core-location", label: "Core Location", hidden: true },
  { id: "os-log", label: "OSLog", hidden: true },
  { id: "phosphor-icons", label: "Phosphor Icons", hidden: true },
  { id: "xcode", label: "Xcode", hidden: true },
  { id: "swift-package-manager", label: "Swift Package Manager", hidden: true },
  { id: "xctest", label: "XCTest", hidden: true },
  { id: "shadcn-ui", label: "shadcn/ui", hidden: true },
  { id: "react-router", label: "React Router", hidden: true },
  { id: "tanstack-react-query", label: "TanStack React Query", hidden: true },
  { id: "recharts", label: "Recharts", hidden: true },
  { id: "react-hook-form", label: "React Hook Form", hidden: true },
  { id: "zod", label: "Zod", hidden: true },
  { id: "radix-ui", label: "Radix UI", hidden: true },
  { id: "date-fns", label: "date-fns", hidden: true },
  { id: "apple-iap", label: "Apple In-App Purchases", hidden: true },
  { id: "expo-router", label: "Expo Router", hidden: true },
  { id: "nativewind", label: "NativeWind", hidden: true },
  { id: "react-navigation", label: "React Navigation", hidden: true },
  { id: "react-native-reanimated", label: "React Native Reanimated", hidden: true },
  { id: "react-native-gesture-handler", label: "React Native Gesture Handler", hidden: true },
  { id: "eas-build", label: "EAS Build", hidden: true },
  { id: "google-places-api", label: "Google Places API", hidden: true },
  { id: "pydantic", label: "Pydantic", hidden: true },
  { id: "essentia-js", label: "Essentia.js", hidden: true },
  { id: "aws-ses", label: "AWS SES", hidden: true },
  { id: "aws-elastic-beanstalk", label: "AWS Elastic Beanstalk", hidden: true },
  { id: "aws-ec2", label: "AWS EC2", hidden: true },
  { id: "swagger", label: "Swagger / OpenAPI", hidden: true },
  { id: "lenis", label: "Lenis", hidden: true },
  { id: "rest-apis", label: "REST APIs", hidden: true },
  { id: "graphql", label: "GraphQL", hidden: true },
  { id: "git", label: "Git", hidden: true },
  { id: "auth", label: "Authentication", hidden: true },
  { id: "realtime", label: "Realtime", hidden: true },
];

const projects: Project[] = [
  {
    id: "wbg-website",
    slug: "wbg-website",
    title: "WeBeGiggin' Website",
    category: "web",
    summary: "Community-driven marketing site with events, blog CMS, and interactive cork-board wall.",
    description:
      "Built the marketing site for WeBeGiggin', a community-first gig platform, using Next.js 15 App Router with server-first rendering and Supabase as the full backend (auth, Postgres, storage). The site features a community cork-board wall where users post sticky notes with seeded-random layouts, a date-fns-powered event calendar with auth-gated event creation, and a blog CMS with slug-based routing and server-action mutations. All reads use RLS-safe Supabase queries from server components, keeping the client bundle lean.",
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
    links: [
      { label: "Live Site", href: "https://www.webegiggin.com/" },
    ],
    relatedExperienceIds: ["wbg"],
  },
  {
    id: "wbg-app",
    slug: "wbg-app",
    title: "WeBeGiggin'",
    category: "mobile",
    coverImage: "/images/projects/wbg-app/cover.png",
    summary: "A React Native gig economy platform with real-time messaging, AI career coaching, and a social feed.",
    description:
      "Built a mobile-first gig economy community app connecting freelancers with opportunities. The app features a social feed with pagination and optimistic likes, a real-time messaging system powered by Supabase Realtime with unread tracking, an AI career assistant backed by a Python FastAPI server using GPT-4o with function calling to update user profiles conversationally, and a full job/event discovery system. The 26-table PostgreSQL schema includes RLS policies, full-text search vectors, and a normalized conversation model I designed from scratch.",
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
      "Built a full-stack PWA for generating and editing rap lyrics using OpenAI, with a custom contentEditable editor that features a Matrix-style binary reveal animation and section-aware tag parsing. The app includes artist style profiling (paste reference lyrics → AI generates a structured style card for prompt injection), a beat library with client-side BPM/key detection via Essentia.js WASM, and a lock/directive system that lets users constrain AI regeneration around preserved bars. Backed by Supabase for auth and per-user data with row-level security.",
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
    categoryLabel: "Mobile + Web",
    coverImage: "/images/projects/open-planner/cover.png",
    coverBg: "#0f1c2e",
    summary: "AI-powered student planner — React web app, SwiftUI iOS client, and Node.js backend across three codebases.",
    description:
      "Built Open Planner end-to-end: a React web app, a native SwiftUI iOS client, and a Node.js/Express backend. Students upload course syllabi and an AI pipeline (AWS Lambda + LibreOffice) extracts assignments, exams, and deadlines into a unified calendar. The platform features real-time group and direct messaging over Socket.IO, a multi-tier subscription system spanning Stripe, Apple IAP via StoreKit 2, and parent/family plans with seat-based claim codes, and a custom drag-and-drop calendar with Google/Outlook/Apple export. The backend runs on AWS Elastic Beanstalk with PostgreSQL, Cognito auth, S3 file storage, and SES transactional email.",
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
    coverImage: "/images/projects/pickl/cover.png",
    summary: "Full-stack movie/TV recommendation platform with group-based collaborative filtering.",
    description:
      "Built Pickl, a personalized movie and TV show recommendation engine that scores titles using Euclidean distance between user demographic vectors and title interest-composition matrices. Users complete an onboarding questionnaire that maps to binary feature vectors across 18 demographic/preference segments, then receive ranked recommendations filtered by their watchlist and viewing history. I also designed a group recommendation system where members' individual scores are aggregated via RobustScaler normalization, letting friend groups find shows everyone will enjoy.",
    media: [
      { kind: "image", src: "/images/projects/pickl/cover.png", alt: "Pickl landing page" },
      { kind: "image", src: "/images/projects/pickl/01.png", alt: "Pickl recommendations dashboard" },
      { kind: "image", src: "/images/projects/pickl/02.png", alt: "Pickl watchlist interface" },
      { kind: "image", src: "/images/projects/pickl/03.png", alt: "Pickl already watched list" },
    ],
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
    title: "ARMED",
    category: "mobile",
    coverImage: "/images/projects/armed/cover.png",
    summary: "Shipped a vibe-coded youth baseball web app to the iOS App Store with IAP, payments, and team subscriptions.",
    description:
      "I was contracted to take a client's Lovable-generated (vibe-coded) React web app — a youth baseball arm health tracker — and ship it as a real iOS product. I wrapped the SPA with Capacitor, fixed critical auth and onboarding bugs, integrated RevenueCat for Apple IAP subscriptions, built a multi-source entitlement system, wrote Deno edge functions for account deletion and team plan activation via Stripe webhooks, and handled the full App Store submission process including Apple compliance for payments and privacy.",
    media: [
      { kind: "image", src: "/images/projects/armed/01.png", alt: "ARMED hero" },
      { kind: "image", src: "/images/projects/armed/02.png", alt: "ARMED readiness dashboard" },
      { kind: "image", src: "/images/projects/armed/03.png", alt: "ARMED trends and workload" },
      { kind: "image", src: "/images/projects/armed/04.png", alt: "ARMED learn section" },
      { kind: "image", src: "/images/projects/armed/05.png", alt: "ARMED tournament guidance" },
      { kind: "image", src: "/images/projects/armed/06.png", alt: "ARMED activity logging" },
      { kind: "image", src: "/images/projects/armed/07.png", alt: "ARMED coach dashboard" },
      { kind: "image", src: "/images/projects/armed/08.png", alt: "ARMED subscription" },
    ],
    skillIds: [
      "typescript",
      "react",
      "capacitor",
      "supabase",
      "postgresql",
      "revenuecat",
      "apple-iap",
      "stripe",
      "deno",
      "tailwindcss",
      "vite",
      "xcode",
      "react-router",
      "tanstack-react-query",
      "zod",
      "react-hook-form",
      "recharts",
      "radix-ui",
      "shadcn-ui",
      "date-fns",
    ],
    highlights: [
      "Shipped a vibe-coded Lovable web app to the iOS App Store by wrapping it with Capacitor, fixing auth persistence, safe-area handling, and native keyboard behavior",
      "Integrated RevenueCat for Apple IAP subscriptions (monthly + yearly with 7-day trial) with a platform-aware payment provider abstraction that falls back to Stripe on web",
      "Built a multi-source entitlement system merging individual Apple IAP, team-based premium via unlock codes, and admin overrides into a single hasPremiumAccess hook",
      "Designed and implemented the full team plan purchase pipeline — Stripe webhooks, 3 Deno edge functions, 4 PostgreSQL RPCs, roster management with a 15-slot cap enforced at the DB level",
      "Created Apple-compliant server-side account deletion with role-aware behavior (player data purge vs. coach profile anonymization preserving team integrity)",
      "Replaced dead-weight onboarding steps, added free/premium gating UX, and built an in-app guided tutorial system with role-specific step sequences",
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
      "Built Rollin' as a ground-up SwiftUI rewrite of a cannabis lifestyle social platform targeting iOS 17+. The centerpiece is a custom dual-camera picture-in-picture capture system using AVCaptureMultiCamSession with real-time Metal-backed CIImage compositing via AVAssetWriter — modeled after Apple's AVMultiCamPiP reference architecture. The app features MVVM with protocol-oriented dependency injection, a comprehensive design system, and a clean Supabase abstraction boundary that isolates all SDK types behind a single protocol.",
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
    links: [
      { label: "Live Site", href: "https://rollin-app.com" },
    ],
    relatedExperienceIds: ["teragram"],
  },
  {
    id: "redwood",
    slug: "redwood",
    title: "Redwood",
    category: "game",
    coverImage: "/images/projects/redwood/01.jpg",
    summary: "Indie narrative exploration built in Godot celebrating the Redwood forest canopy.",
    media: [
      { kind: "image", src: "/images/projects/redwood/01.jpg", alt: "Redwood forest scene with gravestone" },
      { kind: "image", src: "/images/projects/redwood/02.jpg", alt: "Redwood campsite scene" },
      { kind: "image", src: "/images/projects/redwood/03.jpg", alt: "Redwood road and vehicle scene" },
    ],
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
  
  // Teragram Development experience → GhostWriter, Rollin, and ARMED projects
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

