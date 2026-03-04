I need you to analyze this codebase and extract information for my portfolio website. Explore the project thoroughly — read the README, package.json (or equivalent), key source files, config files, and any documentation — then output a TypeScript object I can paste directly into my portfolio's data file.

### What I need

1. **summary** — One sentence (max ~15 words). Used on cards. Be specific about what this actually does, not generic.
2. **description** — 2-4 sentences for the detail view. What the project is, what problem it solves, what's notable about the implementation. Write in first person ("I built..."). Don't be generic — mention specific technical decisions.
3. **highlights** — 4-6 bullet points. Focus on concrete technical accomplishments, not vague claims. Each should start with a strong verb (Built, Implemented, Designed, Architected, Optimized, Shipped, etc.). Include metrics or specifics where possible.
4. **technologies** — List EVERY language, framework, library, database, platform, and tool that is actually used in this codebase. Discover them from package.json, imports, config files, CI/CD, infrastructure, etc. For each one, provide:
   - `id`: kebab-case identifier (e.g. "react-native", "tailwindcss", "next-auth")
   - `label`: human-readable name (e.g. "React Native", "Tailwind CSS", "NextAuth.js")
5. **links** — Any live URLs (deployed site, GitHub repo if public, app store links). Use format: `{ label: "GitHub", href: "https://..." }`
6. **category** — One of: `"web"` | `"mobile"` | `"ml"` | `"game"` | `"tool"`

### Output format

Output TWO things:

**1. The project/experience object** (I'll fill in id/slug/relations myself):

```ts
{
  id: "___",
  slug: "___",
  title: "Project Name",
  category: "web",
  summary: "One-liner for cards.",
  description: "2-4 sentences for the detail page. First person. Technically specific.",
  skillIds: ["typescript", "react", "nextjs", "tailwindcss", "supabase", "postgresql"],
  highlights: [
    "Built X using Y, serving Z users",
    "Implemented A with B for C",
    "Designed D from scratch with E",
    "Optimized F, reducing G by H%",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/..." },
    { label: "Live Site", href: "https://..." },
  ],
}
```

**2. The full skills list** — every technology discovered, so I can merge new ones into my portfolio's skills registry:

```ts
// New skills to add (merge into skills array, skip any that already exist)
{ id: "typescript", label: "TypeScript" },
{ id: "react", label: "React" },
{ id: "nextjs", label: "Next.js" },
{ id: "tailwindcss", label: "Tailwind CSS" },
{ id: "supabase", label: "Supabase" },
{ id: "postgresql", label: "PostgreSQL" },
// ... every technology actually used
```

### Rules
- DISCOVER skills from the actual codebase — check package.json, imports, config files, Dockerfiles, CI configs, etc.
- Include languages (TypeScript, Python, SQL...), frameworks (React, Django, Next.js...), libraries (Three.js, Framer Motion...), databases (PostgreSQL, MongoDB...), platforms (Vercel, AWS, Docker...), and tools (Git, Figma...) — anything a recruiter would care about
- Don't pad the highlights — each one should be genuinely interesting to a technical recruiter
- If the project doesn't have public links, omit the links field entirely
- Be honest about what was built vs. what was scaffolded/generated
- Prefer specifics over generics: "Built real-time multiplayer lobby with Supabase Realtime channels" beats "Implemented real-time features"
```

---

## For Experiences (roles, not projects)

If extracting info for a work experience rather than a standalone project, use this variant:

```
I need you to analyze this codebase and extract information about my role/experience here for my portfolio. Explore the project thoroughly — read the README, package.json, key source files, config files, and any documentation — then output a TypeScript object.

### What I need

1. **role** — My job title (e.g. "Full-Stack Engineer")
2. **previousRole** — If I was promoted, my previous title. Otherwise omit.
3. **summary** — One sentence about what I did here.
4. **description** — 2-4 sentences. What the company/org does, what I was responsible for, what I shipped. First person.
5. **highlights** — 4-6 bullet points of concrete accomplishments. Strong verbs, specific tech, metrics when possible.
6. **technologies** — List EVERY language, framework, library, database, platform, and tool actually used. Discover from package.json, imports, config files, etc. For each:
   - `id`: kebab-case identifier
   - `label`: human-readable name
7. **links** — Company website, product links, etc.

### Output format

Output TWO things:

**1. The experience object:**

```ts
{
  id: "___",
  slug: "___",
  title: "Company Name",
  org: "Company Name",
  role: "Full-Stack Engineer",
  previousRole: "Intern",
  timeframe: "2023 – Present",
  summary: "One-liner about what I did.",
  description: "2-4 sentences. First person. Technically specific.",
  skillIds: ["typescript", "react", "nextjs", "supabase", "postgresql"],
  highlights: [
    "Architected X from scratch, serving Y users",
    "Led migration from A to B, improving C by D%",
    "Shipped E feature that enabled F",
    "Mentored G engineers on H",
  ],
  links: [
    { label: "Company", href: "https://..." },
  ],
}
```

**2. The full skills list** — every technology discovered:

```ts
// New skills to add (merge into skills array, skip any that already exist)
{ id: "typescript", label: "TypeScript" },
{ id: "react", label: "React" },
// ... every technology actually used
```

### Rules
- DISCOVER skills from the actual codebase — check package.json, imports, config files, Dockerfiles, CI configs, etc.
- Include languages, frameworks, libraries, databases, platforms, and tools — anything a recruiter would care about
- Focus highlights on MY contributions, not the team's general work
- Be specific: "Reduced API response times from 800ms to 120ms with query optimization" beats "Improved performance"
- If no public links exist, omit the links field

