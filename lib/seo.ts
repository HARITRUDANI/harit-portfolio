/**
 * Single source of truth for SEO + brand strings.
 * Edit here once — used by metadata, OG images, JSON-LD, sitemap, robots.
 *
 * Positioning is intentional: systems / product engineer, not "frontend dev".
 * Frontend is the stack — systems thinking is the value.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.haritrudani.com";

export const SITE_NAME = "Harit Rudani";

export const SITE_TITLE =
  "Harit Rudani — Senior Software Engineer · Systems that scale";

export const SITE_TITLE_TEMPLATE = "%s — Harit Rudani";

export const SITE_DESCRIPTION =
  "Senior Software Engineer building scalable frontend systems and production architecture. React, Next.js, TypeScript. Israel · California · Ahmedabad.";

export const SITE_DESCRIPTION_SHORT =
  "Senior Software Engineer building scalable systems and production-grade products across international teams.";

// Natural keywords — systems/product positioning, not frontend-only.
// No stuffing. Each keyword reflects something the work actually demonstrates.
export const SITE_KEYWORDS = [
  // Identity
  "Harit Rudani",
  "Senior Software Engineer",
  "Senior Frontend Engineer",
  "Senior Frontend Developer",
  "Senior React Developer",
  "Senior JavaScript Engineer",
  "Full Stack Engineer",
  "Full Stack Developer",
  "Frontend Systems Engineer",
  "Frontend Architect",
  "Product Engineer",
  "Frontend Performance Engineer",
  "React.js Specialist",
  "Full Stack JavaScript Engineer",
  "Production Frontend Engineer",
  "Distributed Team Engineer",
  "Technical Lead Frontend",
  "Frontend Technical Lead",
  "Lead Frontend Engineer",
  // Stack — primary
  "React Engineer",
  "React Developer",
  "React.js Developer",
  "Next.js Engineer",
  "Next.js Developer",
  "TypeScript Engineer",
  "TypeScript Developer",
  "JavaScript Engineer",
  "JavaScript Developer",
  "Node.js Engineer",
  "Node.js Developer",
  // Stack — secondary
  "Redux Developer",
  "Tailwind CSS Developer",
  "PostgreSQL Developer",
  "MongoDB Developer",
  "Supabase Developer",
  "Express.js Developer",
  "REST API Developer",
  "GraphQL Developer",
  // Capabilities
  "Scalable Frontend Systems",
  "Scalable Web Applications",
  "Frontend System Design",
  "Frontend Architecture",
  "System Design Frontend",
  "React Architecture",
  "Frontend Performance Optimization",
  "React Performance Optimization",
  "Core Web Vitals Optimization",
  "Web Performance Optimization",
  "Lighthouse Performance",
  "Maintainable Frontend Systems",
  "Production-grade Frontend Engineering",
  "Large Scale Frontend Systems",
  "Enterprise Frontend Systems",
  "Production UI Systems",
  "Complex State Management",
  "Frontend Infrastructure",
  "Design Systems Engineering",
  "Component Library Development",
  "Server-Side Rendering",
  "Static Site Generation",
  "Progressive Web App",
  "Micro-frontend Architecture",
  "Accessibility Engineering",
  "WCAG Compliance",
  // Industry verticals (matches actual projects)
  "EdTech Frontend Engineer",
  "FinTech Frontend Engineer",
  "SaaS Frontend Engineer",
  "B2B SaaS Engineer",
  "Enterprise ERP Frontend",
  "Consumer Platform Engineering",
  "E-commerce Frontend Engineer",
  // AI & modern engineering
  "AI Engineering",
  "AI-Assisted Development",
  "AI-Assisted Development Workflows",
  "AI Product Development",
  "Generative AI",
  "LLM Applications",
  "Agentic Workflows",
  "Model Context Protocol",
  "MCP",
  "RAG",
  "Retrieval-Augmented Generation",
  "Vector Databases",
  "Prompt Engineering",
  "Anthropic Claude",
  "OpenAI API",
  "Vibe Coding",
  // Hiring intent
  "Hire Senior React Developer",
  "Hire Frontend Engineer India",
  "Hire React Developer India",
  "Hire Full Stack Developer India",
  "Available for Remote Work",
  "Remote Software Engineer India",
  "Freelance React Developer",
  "Contract Frontend Engineer",
  // Reach — location
  "Remote React Developer",
  "Frontend Engineer India",
  "Software Engineer India",
  "React Developer Ahmedabad",
  "Frontend Developer India",
  "Frontend Engineer Ahmedabad",
  "Software Engineer Ahmedabad",
  "Frontend Engineer Gujarat",
  "Software Engineer Gujarat",
  "International Frontend Engineer",
  "Remote React Engineer",
  "Frontend Engineer Israel",
  "Frontend Engineer California",
];

export const PERSON = {
  name: "Harit Rudani",
  givenName: "Harit",
  familyName: "Rudani",
  jobTitle: "Senior Software Engineer",
  email: "haritrudani23@gmail.com",
  telephone: "+91-7874278366",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  worksFor: {
    name: "Tuvoc Technologies",
    url: "https://tuvoc.com",
  },
  alumniOf: "Madhyanchal Professional University",
  address: {
    locality: "Ahmedabad",
    region: "Gujarat",
    country: "IN",
  },
  // What the person actually knows — used in Person schema knowsAbout.
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Redux",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Express",
    "Supabase",
    "Claude Code",
    "Cursor",
    "GitHub Copilot",
    "OpenAI API",
    "Anthropic Claude",
    "Model Context Protocol",
    "AI Engineering",
    "Generative AI",
    "LLM Applications",
    "Agentic Workflows",
    "Prompt Engineering",
    "RAG",
    "Vector Databases",
    "Frontend Architecture",
    "Frontend System Design",
    "React Architecture",
    "Frontend Performance Optimization",
    "Scalable Frontend Systems",
    "Large Scale Frontend Systems",
    "Enterprise Frontend Systems",
    "State Management",
    "Complex State Management",
    "Maintainable Frontend Systems",
    "Production-grade Frontend Engineering",
    "Product Engineering",
    "Full Stack Development",
    "AI-Assisted Development",
    "Cross-timezone Engineering",
    "Distributed Systems Engineering",
    "Engineering Systems Thinking",
  ],
  occupation: {
    name: "Senior Software Engineer",
    description:
      "Architecting and shipping scalable frontend systems and full-stack applications for international engineering teams",
    skills:
      "React, Next.js, TypeScript, Node.js, Redux, PostgreSQL, Frontend Architecture, System Design, Full Stack Development",
  },
  sameAs: ["https://www.linkedin.com/in/haritrudani"],
} as const;

export const OG_IMAGE = {
  url: "/opengraph-image",
  alt: `${PERSON.name} — ${PERSON.jobTitle}`,
  width: 1200,
  height: 630,
} as const;

/**
 * OG / social preview text — short, memorable, used in default OG description.
 */
export const SOCIAL_TAGLINE = "Software changes fast. Clear systems last.";
