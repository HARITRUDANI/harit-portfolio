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
