import { PERSON, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Server-rendered JSON-LD for rich Google results.
 *
 * - Person schema → personal knowledge panel eligibility
 * - WebSite schema → site name in search results
 * - ProfessionalService schema → "available for work" intent
 *
 * All three render as separate <script> tags. Spec-compliant.
 */
export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    jobTitle: PERSON.jobTitle,
    email: `mailto:${PERSON.email}`,
    url: PERSON.url,
    image: PERSON.image,
    description: SITE_DESCRIPTION,
    worksFor: {
      "@type": "Organization",
      name: PERSON.worksFor.name,
      url: PERSON.worksFor.url,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: PERSON.alumniOf,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.address.locality,
      addressRegion: PERSON.address.region,
      addressCountry: PERSON.address.country,
    },
    knowsAbout: PERSON.knowsAbout,
    knowsLanguage: { "@type": "Language", "name": "English" },
    hasOccupation: {
      "@type": "Occupation",
      name: PERSON.occupation.name,
      description: PERSON.occupation.description,
      skills: PERSON.occupation.skills,
    },
    sameAs: PERSON.sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: `${PERSON.name} — Senior Software Engineering`,
    description:
      "Senior frontend and full-stack engineering for international production systems. Scalable frontend architecture, React systems, and distributed team delivery. Available for global remote opportunities.",
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Israel" },
      { "@type": "Country", name: "United States" },
      { "@type": "GeoShape", description: "Worldwide remote" },
    ],
    serviceType: [
      "Frontend Engineering",
      "Full Stack Development",
      "Frontend Architecture",
      "React Development",
      "Next.js Development",
      "TypeScript Engineering",
      "Frontend System Design",
      "Performance Optimization",
      "Technical Leadership",
    ],
    availableLanguage: { "@type": "Language", name: "English" },
    url: SITE_URL,
  };

  const portfolio = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/#portfolio`,
    name: "Harit Rudani — Engineering Portfolio",
    description:
      "Portfolio of senior frontend and full-stack engineering work across consumer platforms, AI SaaS, enterprise ERP, and educational technology — shipped for teams in Israel, California, and India.",
    url: SITE_URL,
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
    keywords:
      "Senior Software Engineer, React, Next.js, TypeScript, Frontend Architecture, Scalable Systems, Full Stack Development, Frontend System Design",
    about: [
      { "@type": "Thing", name: "Frontend Architecture" },
      { "@type": "Thing", name: "Scalable Web Applications" },
      { "@type": "Thing", name: "React Engineering" },
      { "@type": "Thing", name: "Production Systems" },
      { "@type": "Thing", name: "Full Stack Development" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolio) }}
      />
    </>
  );
}
