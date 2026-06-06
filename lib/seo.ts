/**
 * Single source of truth for SEO + brand strings.
 * Edit here once — used by metadata, OG images, JSON-LD, sitemap, robots.
 *
 * Positioning is intentional: systems / product engineer, not "frontend dev".
 * Frontend is the stack — systems thinking is the value.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://haritrudani.vercel.app";

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
  "Full Stack Engineer",
  "Frontend Systems Engineer",
  "Frontend Architect",
  "Product Engineer",
  "Frontend Performance Engineer",
  "React.js Specialist",
  "Full Stack JavaScript Engineer",
  "Production Frontend Engineer",
  "Distributed Team Engineer",
  // Stack
  "React Engineer",
  "Next.js Engineer",
  "TypeScript Engineer",
  "Node.js Engineer",
  // Capabilities
  "Scalable Frontend Systems",
  "Scalable Web Applications",
  "Frontend System Design",
  "Frontend Architecture",
  "System Design Frontend",
  "React Architecture",
  "Frontend Performance Optimization",
  "React Performance Optimization",
  "Maintainable Frontend Systems",
  "Production-grade Frontend Engineering",
  "Large Scale Frontend Systems",
  "Enterprise Frontend Systems",
  "Production UI Systems",
  "Complex State Management",
  "Frontend Infrastructure",
  "Design Systems Engineering",
  "AI-Assisted Development Workflows",
  // Reach
  "Remote React Developer",
  "Frontend Engineer India",
  "Software Engineer India",
  "React Developer Ahmedabad",
  "Frontend Developer India",
  "International Frontend Engineer",
  "Remote React Engineer",
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
  sameAs: ["https://www.linkedin.com/in/harit-rudani"],
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
