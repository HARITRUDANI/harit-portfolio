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
  siSupabase,
  siGit,
  siGithub,
  siVercel,
  siDocker,
  siPostman,
  siFigma,
  siFramer,
  siVite,
  siClaude,
  siCursor,
  siGithubcopilot,
  siReplit,
  siV0,
  siModelcontextprotocol,
} from "simple-icons";

/**
 * OpenAI brand mark — official logo path (24x24 viewBox).
 * Defined inline because simple-icons removed it in compliance with
 * OpenAI's brand request. Path matches the public OpenAI logo guidelines.
 */
const siOpenai = {
  title: "OpenAI",
  slug: "openai",
  hex: "#412991",
  path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
};
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
      return `${careerYears()}+ years`;
    },
    label: "in production",
  },
  { value: "5 systems", label: "shipped" },
  { value: "5.5M+ redemptions", label: "delivered" },
  { value: "3 countries", label: "Israel · California · India" },
] as const;

export const opening = {
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
    id: "chipper-platform",
    index: "01",
    title: "Consumer Savings Platform",
    category: "Consumer · Web · B2B",
    role: "Technical Lead",
    region: "Israel",
    get duration() {
      return chipperLeadDuration();
    },
    context:
      "Digital coupon platform serving consumers and providers across Israel. Three portals: a consumer app, a provider campaign dashboard, and a new B2B multi-tenant system layering AI on top.",
    constraint:
      "Inherited a system with silent divergence between staging and production — missing tables, schema mismatches, fields that existed in one and not the other. The client needed staging code in production without touching a single live user.",
    decision:
      "Built an intermediate pre-production environment using staging code against the production database. Mapped every schema delta before a single line moved. Deep testing, late-night debugging, every assumption validated against the real DB.",
    tradeoff:
      "An extra environment to maintain and a slower path to deployment. The alternative was risking the entire live user base on an untested migration.",
    result:
      "Zero user impact. Deployment completed at 4:30 AM. Team publicly praised by client leadership. Now leading the B2B expansion with multi-tenant coupon validation and AI integrations across two providers.",
    metric:
      "156,156 consumers · 5,526,279 coupon redemptions delivered.",
    lesson:
      "The most dangerous deployments are the ones where staging and production have quietly diverged. The fix isn't courage — it's a safe intermediate environment.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "AI"],
    architecture: [
      { label: "Portal Split", note: "Consumer, provider, and B2B systems sharing a core but isolated where they should be. No portal can break another." },
      { label: "Migration Strategy", note: "Pre-production environment built from staging code + production DB. Every schema delta mapped and tested before live deploy." },
      { label: "Multi-tenant Validation", note: "Coupon validation rules vary per business. Rule engine evaluates against tenant context, not hardcoded assumptions." },
      { label: "AI Layer", note: "Two AI providers integrated for content and decision support — abstracted behind a single interface so either can be swapped." },
    ],
  },
  {
    id: "ai-proposal",
    index: "02",
    title: "AI Proposal Intelligence",
    category: "B2B SaaS · AI",
    role: "Full Stack Developer",
    region: "California",
    context:
      "Proposal intelligence platform for PEOs and brokers — unifying CRM, underwriting, commissions, and compliance into one AI-powered workflow. Same client expanded scope to a second system in the consumer space.",
    constraint:
      "Proposal generation needed to work from real email inboxes and attached documents — not a form. The system had to understand what it was reading before it could write anything useful.",
    decision:
      "Built an AI pipeline: email parsing → document extraction → structured proposal generation. Each stage independently testable. AI-assisted development used to iterate on prompt and schema design faster than a traditional build cycle would allow.",
    tradeoff:
      "Pipeline complexity grows with each new document format. Scoped to the most common formats first, with clear extension points for the rest.",
    result:
      "Generation working from real inbound documents in production. Client trust grew enough that a second system in the consumer space was added to scope on the strength of delivery.",
    lesson:
      "AI in a workflow changes what 'input' means. The interface is no longer a form — it's whatever the user already has.",
    stack: ["React", "Node.js", "Express", "Supabase", "AI"],
    architecture: [
      { label: "Inbox Parser", note: "Reads emails and attachments. Normalizes formats before anything else sees the data." },
      { label: "Extraction Layer", note: "Structured field extraction from unstructured documents. Confidence scored, not guessed." },
      { label: "Generation Pipeline", note: "AI-driven proposal assembly. Output is rendered, edited, and shipped from one place." },
    ],
  },
  {
    id: "tls-ems",
    index: "03",
    title: "Employee Management System",
    category: "Enterprise · HR",
    role: "Frontend Developer",
    region: "India",
    context:
      "Internal system for coordinating employees and order workflows. Two-month engagement from kickoff to client sign-off.",
    constraint:
      "Backend owned all business logic — which orders surface, in what priority, in what state. The frontend had to reflect this faithfully without hardcoding a single display assumption.",
    decision:
      "Backend-driven dynamic rendering. The UI synced and rendered exactly what the backend dictated. Zero parallel business logic on the frontend — easier to audit, harder to drift.",
    tradeoff:
      "The frontend became thin. Display bugs required backend investigation. Simpler to reason about overall; less convenient to debug in isolation.",
    result:
      "Delivered in two months. Client signed off on first review with zero rework requests.",
    metric:
      "Backend-driven rendering shipped in two months — zero rework after first client review.",
    lesson:
      "A frontend that trusts the backend completely is easier to maintain than one that mirrors business rules on both sides.",
    stack: ["React", "JavaScript"],
    architecture: [
      { label: "State Sync", note: "Backend is source of truth. Frontend renders the latest snapshot, no derived state." },
      { label: "Render Layer", note: "Dynamic component selection based on backend hints. No conditional UI logic on the client." },
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
      "Learning management system for university students. Concurrency was the design constraint from day one — peak load of 3,000 simultaneous users during exam windows.",
    constraint:
      "The exam system needed real-time sync, precise timer logic, and reliable concurrent submission handling. A drifted timer or a missed submission isn't a UX problem here — it's an academic integrity problem.",
    decision:
      "Server-authoritative timers. Real-time state sync between client and server. Submission handling designed for concurrent load — not retrofitted to it.",
    tradeoff:
      "More coordination per tick. Timer authority on the server meant extra round-trips, but it removed an entire class of client-side cheating vectors.",
    result:
      "The platform held under 3,000 concurrent users through peak academic season. No submissions lost. Student-facing performance stayed predictable.",
    metric:
      "3,000 concurrent users sustained · zero lost submissions under peak academic load.",
    lesson:
      "Concurrency reveals architecture. Code that looks fine alone behaves differently at scale. And for exams — failure is not recoverable.",
    stack: ["React"],
    architecture: [
      { label: "Real-time Sync", note: "Client and server state kept in agreement throughout the exam window." },
      { label: "Timer Authority", note: "Server-side. Client displays, never decides." },
      { label: "Submission Handler", note: "Designed for concurrent submissions. Queueing, retries, and confirmation built in from day one." },
    ],
  },
  {
    id: "vk-jewels",
    index: "05",
    title: "Jewelry ERP + Distributor Catalogue",
    category: "Enterprise · ERP",
    role: "Frontend Developer",
    region: "India",
    context:
      "First production project. ERP for a jewelry manufacturing operation paired with a distributor-facing catalogue site for the same client — two systems, one supply chain.",
    constraint:
      "Jewelry design creation required 6 to 9 industry-specific steps. Each step depended on the previous one and carried state forward. A linear form wasn't enough — the workflow had to enforce sequence.",
    decision:
      "Built a multi-step design wizard with step-level state isolation and explicit forward/backward navigation. The catalogue site built separately as a clean product browser tuned for distributor use.",
    tradeoff:
      "Step isolation added care to shared-state fields. Worth it — each step stayed independently testable, and the workflow stayed legible.",
    result:
      "Both systems delivered and live in production. First production role at a professional engineering pace.",
    metric:
      "Two systems delivered — ERP design module and distributor catalogue — as first production role.",
    lesson:
      "A multi-step workflow is a state machine wearing a form. Design the states first, then the UI.",
    stack: ["React", "JavaScript"],
    architecture: [
      { label: "Step State Machine", note: "Each step owns its state. Transitions explicit, history preserved for back navigation." },
      { label: "Catalogue Layer", note: "Distributor-facing product browser. Clean separation from ERP internals." },
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
    core: "I learned this while supporting a university platform serving thousands of concurrent users. The code passed every review. Under real traffic, the bottleneck wasn't the implementation — it was the assumptions behind it.",
  },
  {
    index: "02",
    title: "State should match reality",
    surface: "State complexity should match business complexity — nothing more.",
    depth: "Every atom of state that doesn't map to a business concept is future debt.",
    core: "On an early ERP project, I added state for features I thought we'd need. Two months later, most of it was cleanup — and the parts I'd skipped were exactly what production asked for.",
  },
  {
    index: "03",
    title: "Delete-ability is a virtue",
    surface: "The best component is the one your team can delete safely.",
    depth: "Reusability without clear contracts becomes a graph of fear. Nobody touches it.",
    core: "I once built an abstraction the team came to rely on. When requirements shifted, removing it took longer than building it. Now I design every component to be deleted.",
  },
  {
    index: "04",
    title: "Architecture is communication",
    surface: "Architecture decisions are really communication decisions.",
    depth: "The audience isn't the compiler. It's the engineer reading your code two years from now.",
    core: "After enough late-night deployments and inherited unknowns, I stopped optimizing for clever code and started optimizing for code that explains itself to the engineer reading it at 4 AM.",
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
    { id: "communication", label: "Communication", x: 15, y: 86, note: "With clients across timezones. With future maintainers. With yourself in six months." },
    { id: "longevity", label: "Longevity", x: 85, y: 86, note: "Systems that stay alive past the first release. The hard part is not shipping — it's still shipping two years in." },
  ],
  edges: [
    ["performance", "architecture"],
    ["performance", "state"],
    ["architecture", "state"],
    ["architecture", "communication"],
    ["state", "ux"],
    ["state", "scalability"],
    ["ux", "longevity"],
    ["scalability", "performance"],
    ["communication", "longevity"],
    ["architecture", "scalability"],
  ] as const,
} as const;

export const notesFromProduction: readonly string[] = [
  "When you inherit a system, the first instinct is to rewrite. The second instinct — earned painfully — is to understand.",
  "Shipping features is easy. Keeping systems understandable after two years is the harder part of the work.",
  "Performance optimization taught me restraint more than speed. Most of what I removed mattered more than most of what I added.",
  "Working across three timezones taught me to write code the way I'd write a letter — assuming the reader won't be in the room to ask questions.",
  "The best architecture decisions look obvious in retrospect. The bad ones do too.",
  "Some systems failed quietly before they failed visibly.",
] as const;

export const changedMyMind: readonly { from: string; to: string }[] = [
  {
    from: "I used to build shared utilities the moment I saw a second use case. Clean interface — good abstraction.",
    to: "The abstraction that cost the most wasn't wrong. It was just used by enough engineers that removing it took months. Replaceability matters more than reusability. I design for deletion now.",
  },
  {
    from: "I thought state management was a frontend problem — something you solved by choosing the right store.",
    to: "The worst state bugs I've debugged had nothing to do with the store. They were synchronization gaps between what the server knew and what the client assumed. The state model you pick is a statement about where you trust the server — and most of the time, that conversation hasn't happened yet.",
  },
  {
    from: "I used to measure performance by what I could control: bundle size, render count, query time.",
    to: "The system that held under 3,000 concurrent users held because concurrency shaped the architecture from the start. Performance constraints that arrive late don't just slow you down — they constrain what you're allowed to redesign.",
  },
] as const;

export const currentlyExploring = {
  active: [
    "React Server Components at scale",
    "Multi-tenant systems that stay simple",
    "AI-assisted development workflows",
    "Architectures that survive team turnover",
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
      "Long-running engagements. Consumer scale and university platforms — stewardship across years, not handoffs.",
    systems: [
      { name: "Consumer Coupon Platform", note: "5.5M+ redemptions" },
      { name: "Provider Campaign Portal", note: "CRM · 156k+ consumers" },
      { name: "B2B Multi-tenant System", note: "AI-layered · in production" },
      { name: "University Learning Platform", note: "3,000 concurrent · exam system" },
    ],
  },
  {
    region: "California, USA",
    count: 2,
    description:
      "Full Stack Developer on both. AI features layered on B2B SaaS and regulated e-commerce.",
    systems: [
      { name: "AI Proposal Intelligence", note: "B2B SaaS · PEO services" },
      { name: "Regulated E-commerce", note: "Cannabis delivery · POS + admin" },
    ],
  },
  {
    region: "India",
    count: 3,
    description:
      "First production roles. Enterprise systems serving internal teams across the supply chain.",
    systems: [
      { name: "Enterprise ERP", note: "Jewelry · 600,000+ SKUs" },
      { name: "Distributor Catalogue", note: "Structured product data" },
      { name: "Employee Management", note: "HR + order coordination" },
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
      { name: "Supabase", icon: siSupabase },
    ],
  },
  {
    group: "AI Workflow",
    items: [
      { name: "Claude Code", icon: siClaude },
      { name: "Cursor", icon: siCursor },
      { name: "OpenAI API", icon: siOpenai },
      { name: "GitHub Copilot", icon: siGithubcopilot },
      { name: "Replit AI", icon: siReplit },
      { name: "v0", icon: siV0 },
      { name: "MCP", icon: siModelcontextprotocol },
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
    note: "Leading full-stack engineering across Israel, California, and India. The decisions made here — what gets abstracted, where contracts live, how state flows — are the ones other engineers on the system build on.",
    current: true,
  },
  {
    company: "Tuvoc Technologies",
    role: "Software Engineer",
    period: "Dec 2022 — Oct 2025",
    note: "Designed the pre-production environment that bridged a silent staging/production divergence — zero impact on 156k live consumers and 5.5M+ redemptions. Built and shipped production systems across LMS, ERP, AI SaaS, and consumer platforms. Became the engineer called when a deployment decision affected everyone.",
  },
  {
    company: "Tuvoc Technologies",
    role: "Trainee",
    period: "Sept 2022 — Nov 2022",
    note: "Joined as a trainee. Shipped the first production feature within the first month.",
  },
] as const;

/**
 * "How I work" — editorial reflection on collaboration, not a sales bullet list.
 * Three short paragraphs, each one a thought about how the work happens.
 */
export const howIWork = [
  {
    label: "Async first",
    body: "Good engineering survives sleep. Documentation, commit history, and clear decisions scale better than meetings.",
  },
  {
    label: "Full stack, frontend-first",
    body: "I start at the user boundary and work backward. Frontend decisions become API decisions, API decisions become system decisions.",
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
  exploring: "longevity",
  global: "communication",
  stack: "performance",
  experience: "architecture",
  "what-you-get": "longevity",
} as const;

export type DomainId =
  | "performance"
  | "architecture"
  | "state"
  | "ux"
  | "scalability"
  | "communication"
  | "longevity";
