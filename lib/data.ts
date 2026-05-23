/**
 * Single source of truth for portfolio content.
 * Time-based fields are computed in lib/calc.ts so the portfolio ages
 * itself automatically — no need to bump numbers by hand.
 */

import {
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siHtml5,
  siCss,
  siTailwindcss,
  siRedux,
  siNodedotjs,
  siExpress,
  siMongodb,
  siPostgresql,
  siGit,
  siGithub,
  siVercel,
  siDocker,
  siPostman,
  siFigma,
  siFramer,
  siVite,
} from "simple-icons";
import { careerYears, lastUpdatedLabel, chipperLeadDuration } from "@/lib/calc";

export type StackItem = {
  name: string;
  icon: { title: string; slug: string; path: string; hex: string };
};

export type StackGroup = {
  group: string;
  items: readonly StackItem[];
};

export const person = {
  name: "Harit Rudani",
  title: "Senior Software Engineer",
  location: "Ahmedabad, India",
  email: "haritrudani23@gmail.com",
  linkedin: "https://www.linkedin.com/in/harit-rudani",
  linkedinHandle: "in/harit-rudani",
  available: true,
  get lastUpdated() {
    return lastUpdatedLabel();
  },
} as const;

export const stats = [
  {
    get value() {
      return `${careerYears()} years`;
    },
    label: "in production",
  },
  { value: "9 systems", label: "shipped" },
  { value: "600k+ SKUs", label: "in production" },
  { value: "3 countries", label: "Israel · California · India" },
] as const;

export const opening = {
  whyIBuild:
    "I enjoy building systems that stay understandable even as products become more complex.",
  memory:
    "The first time a production deployment broke something I didn't expect, I realized architecture decisions are really communication decisions — between you and the engineer who reads your code two years later.",
} as const;

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  category: string;
  role: string;
  region: string;
  duration?: string;
  context: string;
  constraint: string;
  decision: string;
  tradeoff: string;
  result: string;
  /**
   * One measurable outcome. Drawn from real production data only.
   * Leave as `[HARIT_FILLS — ...]` when no defensible number exists yet —
   * the UI hides placeholder values so missing metrics read as neutral, not invented.
   */
  metric?: string;
  lesson: string;
  stack: readonly string[];
  architecture: readonly {
    label: string;
    note: string;
  }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "consumer-platform",
    index: "01",
    title: "Consumer Savings Platform",
    category: "Consumer · Web",
    role: "Full Stack Lead",
    region: "Israel",
    get duration() {
      return chipperLeadDuration();
    },
    context:
      "Large-scale coupons and deals platform with a complex admin system, deeply nested form workflows, and real-time data requirements.",
    constraint:
      "Admin needed to manage thousands of merchant submissions, deal categories, and user data — without slowing the people who used it eight hours a day.",
    decision:
      "Modular form architecture with shared validation primitives. State boundaries drawn around business workflows, not around UI components.",
    tradeoff:
      "More upfront design work. Slower for the first feature. Considerably faster for everything that came after.",
    result:
      "Admin throughput improved. New form types ship in hours instead of days. Same architecture has held under one year of feature pressure.",
    metric:
      "40+ form types delivered on one shared validation engine — each new type ships in hours, not days.",
    lesson:
      "The hardest forms aren't visual problems. They are state problems wearing UI clothes.",
    stack: ["React", "TypeScript", "Next.js", "Node.js", "REST"],
    architecture: [
      { label: "Route Layer", note: "Code-split per admin module. Average chunk size kept under 80KB." },
      { label: "Form Engine", note: "Shared validation, conditional fields, reusable across 40+ form types." },
      { label: "State Layer", note: "Drawn around business workflows, not UI components. Easier to reason about, easier to test." },
      { label: "API Layer", note: "Typed contracts. Optimistic updates only where the user expects them." },
    ],
  },
  {
    id: "ai-saas",
    index: "02",
    title: "AI Proposal Intelligence",
    category: "B2B SaaS · AI",
    role: "Full Stack Technical Lead",
    region: "California",
    context:
      "B2B SaaS for HR and insurance brokers. AI features layered into proposal management — generation, comparison, and intelligent search across historical proposals.",
    constraint:
      "AI responses are slow. UI cannot feel slow. Streaming was not optional.",
    decision:
      "Streaming-first response handling with stable rendering boundaries. AI output rendered as it arrived; UI shell stayed stable around it.",
    tradeoff:
      "More complex client state. The payoff was perceived performance — users stopped asking if the page was broken.",
    result:
      "Time-to-first-token UX matched what users expected from modern AI tools. Long-form generation felt natural, not anxious.",
    lesson:
      "With AI in the loop, the UI is no longer the slow part. The job is to make slow feel intentional.",
    stack: ["React", "Next.js", "TypeScript", "Streaming", "AI"],
    architecture: [
      { label: "Stream Handler", note: "Token-level rendering, stable scroll position, no layout shifts." },
      { label: "Response Cache", note: "Per-user query cache. Repeated searches feel instant." },
      { label: "Render Boundaries", note: "Suspense-aligned. The slow part is contained. The rest of the app keeps working." },
    ],
  },
  {
    id: "enterprise-erp",
    index: "03",
    title: "Enterprise ERP",
    category: "Enterprise · ERP",
    role: "Frontend Developer",
    region: "India",
    context:
      "ERP for a jewelry manufacturing operation. 600,000+ product SKUs, complex pricing calculations, and an interface that internal teams used every day.",
    constraint:
      "600,000 rows is not a table. It is a rendering problem. Naïve approaches lock the browser.",
    decision:
      "Virtualized rendering everywhere data exceeded what a screen could hold. Memoization at expensive computation boundaries — not everywhere.",
    tradeoff:
      "Virtualization adds complexity. Sorting and filtering required careful design. The alternative was a frozen tab.",
    result:
      "The system handles the full SKU catalog without choking. Internal teams stopped working around the software.",
    metric:
      "600,000+ product SKUs in a virtualized grid — no browser freeze, no pagination workaround.",
    lesson:
      "Profile first. Memoize second. Always. The places I assumed were slow were rarely the actual problem.",
    stack: ["React", "TypeScript", "Redux Toolkit", "REST"],
    architecture: [
      { label: "Virtual Grid", note: "Renders 30–50 rows out of 600,000. Smooth scroll, stable headers." },
      { label: "Calc Engine", note: "Memoized at boundaries. Pricing recalculations isolated from row rendering." },
      { label: "State Layer", note: "Redux Toolkit. Five-developer team. Explicit actions made debugging tractable." },
    ],
  },
  {
    id: "lms",
    index: "04",
    title: "University Learning Platform",
    category: "EdTech · LMS",
    role: "Frontend Developer",
    region: "Israel",
    context:
      "Learning management system for university students. Concurrency was the design constraint from day one — peak load of 3,000 simultaneous users.",
    constraint:
      "A platform that works for 30 users in staging is not the same platform under 3,000 in production. State and render behavior changes shape under load.",
    decision:
      "Route-level code splitting. Lazy-loaded course modules. Render boundaries drawn so a heavy panel could not freeze the rest of the page.",
    tradeoff:
      "More moving parts. Loading states had to be deliberate, not afterthoughts.",
    result:
      "The platform held under peak academic season. Student-facing performance stayed predictable.",
    metric:
      "3,000 concurrent users sustained through peak academic load — no degradation in student-facing response time.",
    lesson:
      "Concurrency reveals architecture. Code that looks fine alone behaves differently at scale.",
    stack: ["React", "TypeScript", "Redux Toolkit", "REST"],
    architecture: [
      { label: "Route Split", note: "Each course module loads independently. Faster initial paint." },
      { label: "Module Boundaries", note: "Heavy panels isolated. One slow widget cannot block the page." },
      { label: "State Reset", note: "Per-route state cleanup. Memory stays predictable across long sessions." },
    ],
  },
] as const;

export type Principle = {
  index: string;
  title: string;
  surface: string;
  depth: string;
  core: string;
};

export const principles: readonly Principle[] = [
  {
    index: "01",
    title: "Performance is a feature",
    surface: "Performance is a feature.",
    depth: "Not a phase after launch. A constraint I design around from the first component.",
    core: "I learned this on a platform that worked perfectly in staging and collapsed under real traffic. The code was fine. The architecture wasn't.",
  },
  {
    index: "02",
    title: "State should match reality",
    surface: "State complexity should match business complexity — nothing more.",
    depth: "Every atom of state that doesn't map to a business concept is future debt.",
    core: "I used to add state proactively, anticipating needs. Most of it became cleanup later.",
  },
  {
    index: "03",
    title: "Delete-ability is a virtue",
    surface: "The best component is the one your team can delete safely.",
    depth: "Reusability without clear contracts becomes a graph of fear. Nobody touches it.",
    core: "I once built an abstraction nine teammates depended on. Removing it took three months. I now design for removal.",
  },
  {
    index: "04",
    title: "Architecture is communication",
    surface: "Architecture decisions are really communication decisions.",
    depth: "The audience isn't the compiler. It's the engineer reading your code two years from now.",
    core: "After enough production incidents, I stopped optimizing for clever and started optimizing for legible.",
  },
] as const;

export const thoughtMap = {
  description:
    "The connections between the things I think about. Not a hierarchy. A map of how one decision pulls on another.",
  nodes: [
    { id: "performance", label: "Performance", x: 50, y: 20, note: "Treated as a design constraint, not a phase. Profiled, not assumed." },
    { id: "architecture", label: "Architecture", x: 20, y: 45, note: "Decisions that age well. Documented for the engineer two years from now." },
    { id: "state", label: "State", x: 80, y: 45, note: "Maps to business concepts. Nothing more, nothing speculative." },
    { id: "ux", label: "UX", x: 35, y: 75, note: "Felt through what doesn't happen — no flicker, no lag, no surprise." },
    { id: "scalability", label: "Scalability", x: 65, y: 75, note: "How the system behaves at 10x. Often a re-render problem in disguise." },
    { id: "communication", label: "Communication", x: 15, y: 92, note: "With clients across timezones. With future maintainers. With yourself in six months." },
    { id: "interaction", label: "Interaction", x: 85, y: 92, note: "What the user is actually doing — usually different from what the ticket assumes." },
  ],
  edges: [
    ["performance", "architecture"],
    ["performance", "state"],
    ["architecture", "state"],
    ["architecture", "communication"],
    ["state", "ux"],
    ["state", "scalability"],
    ["ux", "interaction"],
    ["scalability", "performance"],
    ["communication", "interaction"],
    ["architecture", "scalability"],
  ] as const,
} as const;

export const notesFromProduction: readonly string[] = [
  "The hardest frontend problems were rarely UI problems. They were state and communication problems wearing UI clothes.",
  "Shipping features is easy. Keeping systems understandable after two years is the harder part of the work.",
  "Performance optimization taught me restraint more than speed. Most of what I removed mattered more than most of what I added.",
  "Code that works in staging and code that works at scale are not the same code. The difference shows up at the worst time.",
  "The best architecture decisions look obvious in retrospect. The bad ones do too.",
  "Some systems failed quietly before they failed visibly.",
] as const;

export const changedMyMind: readonly { from: string; to: string }[] = [
  {
    from: "I used to build abstractions for flexibility I was certain would come.",
    to: "Maintaining them for eighteen months taught me that speculative generality is just technical debt with better intentions.",
  },
  {
    from: "I once thought managing every possible state meant having control over the system.",
    to: "What it actually produced was dozens of edge cases nobody remembered designing for.",
  },
  {
    from: "I used to treat performance as cleanup work after features shipped.",
    to: "The systems that held under real load were the ones where performance shaped the design from the start — not a phase applied at the end.",
  },
] as const;

export const currentlyExploring = {
  active: [
    "React Server Components at scale",
    "Frontend system design for growing teams",
    "AI-assisted development workflows",
    "Edge-first Next.js architectures",
  ],
  unfinished: [
    "Where product thinking should influence architecture decisions — and where it shouldn't.",
    "How frontend systems stay maintainable as teams and business complexity grow in opposite directions.",
  ],
} as const;

/**
 * Geographic record. Each region carries the count, a one-line description,
 * and an archival list of the systems shipped there — absorbed from the
 * former Systems Built section. Reads as a manifest, not a feature list.
 */
export const globalExperience = [
  {
    region: "Israel",
    count: 4,
    description:
      "Consumer platforms and university-grade systems. Long-running engagements, complex admin.",
    systems: [
      { name: "Consumer Platform", note: "Coupons & deals · complex admin" },
      { name: "Learning Management", note: "Universities · 3,000 concurrent" },
      { name: "R&D Engineering", note: "Technical product work" },
      { name: "Employee Management", note: "HR tooling" },
    ],
  },
  {
    region: "California, USA",
    count: 3,
    description:
      "Full Stack Lead on all three. AI SaaS, HR risk, regulated e-commerce.",
    systems: [
      { name: "AI Proposal Intelligence", note: "B2B SaaS · streaming AI" },
      { name: "HR Risk Platform", note: "PEO services" },
      { name: "Regulated E-commerce", note: "Cannabis delivery" },
    ],
  },
  {
    region: "India",
    count: 2,
    description:
      "Enterprise scale. 600,000+ SKUs. Internal teams that depend on it daily.",
    systems: [
      { name: "Enterprise ERP", note: "Jewelry · 600,000+ SKUs" },
      { name: "Product Catalogue", note: "Structured data operations" },
    ],
  },
] as const;

/**
 * Curated production stack — only technologies actually used across the
 * portfolio's case studies and shipped systems. Each item carries a
 * simple-icons brand mark, rendered monochrome to inherit the section's
 * editorial palette. No icon soup; the icons sit beside the labels as
 * embedded signal, not decoration.
 */
export const stack: readonly StackGroup[] = [
  {
    group: "Core Frontend",
    items: [
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
      { name: "TypeScript", icon: siTypescript },
      { name: "JavaScript", icon: siJavascript },
      { name: "HTML", icon: siHtml5 },
      { name: "CSS", icon: siCss },
      { name: "Tailwind", icon: siTailwindcss },
      { name: "Redux", icon: siRedux },
    ],
  },
  {
    group: "Backend & Systems",
    items: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express", icon: siExpress },
      { name: "MongoDB", icon: siMongodb },
      { name: "PostgreSQL", icon: siPostgresql },
    ],
  },
  {
    group: "Engineering & Delivery",
    items: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
      { name: "Vercel", icon: siVercel },
      { name: "Docker", icon: siDocker },
      { name: "Postman", icon: siPostman },
    ],
  },
  {
    group: "UI & Interaction",
    items: [
      { name: "Figma", icon: siFigma },
      { name: "Framer Motion", icon: siFramer },
    ],
  },
  {
    group: "Build Tooling",
    items: [{ name: "Vite", icon: siVite }],
  },
] as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  note: string;
  current?: boolean;
};

export const experience: readonly ExperienceEntry[] = [
  {
    company: "Tuvoc Technologies",
    role: "Senior Software Engineer",
    period: "Nov 2025 — Present",
    note: "Leading full-stack engineering on international products. Israel, California, India.",
    current: true,
  },
  {
    company: "Tuvoc Technologies",
    role: "Software Engineer",
    period: "Dec 2022 — Oct 2025",
    note: "Built and shipped production systems across LMS, ERP, AI SaaS, and consumer platforms — each one living under real usage over years.",
  },
  {
    company: "Tuvoc Technologies",
    role: "Trainee",
    period: "Sept 2022 — Nov 2022",
    note: "Joined as a trainee. Shipped the first production feature within the first month.",
  },
  {
    company: "Zeronsec",
    role: "Frontend Developer",
    period: "Jan 2022 — Mar 2022",
    note: "Early production exposure. Built UI components for live systems.",
  },
] as const;

/**
 * "How I work" — editorial reflection on collaboration, not a sales bullet list.
 * Three short paragraphs, each one a thought about how the work happens.
 */
export const howIWork = [
  {
    label: "Across timezones",
    body: "Three and a half years of working with teams in Israel, California, and India taught me that engineering is async first. The clearest commit message often matters more than the cleanest code.",
  },
  {
    label: "Full stack, frontend-first",
    body: "Most of my work lives in the browser, but architecture decisions never stop at the API boundary. The contracts I draw at that boundary shape what the next engineer can confidently change — not just what the current feature needs.",
  },
  {
    label: "Product before pattern",
    body: "I reach for an abstraction the third time, not the first. Premature systems are how production becomes painful in eighteen months — for everyone who has to maintain them.",
  },
] as const;

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Principles", href: "#principles" },
  { label: "Notes", href: "#notes" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Maps each section id to the thought-map domain it most belongs to.
 * Consumed by the DomainTracker → ThoughtMap scroll-aware emphasis.
 * Keep ids in sync with `Section id="..."` and thoughtMap node ids.
 */
export const sectionDomainMap = {
  work: "architecture",
  notes: "communication",
  blueprint: "state",
  "changed-mind": "architecture",
  exploring: "interaction",
  global: "communication",
  stack: "performance",
  experience: "architecture",
  "what-you-get": "interaction",
} as const;

export type DomainId =
  | "performance"
  | "architecture"
  | "state"
  | "ux"
  | "scalability"
  | "communication"
  | "interaction";
