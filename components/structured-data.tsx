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
      "Senior frontend and full-stack engineering for production systems. Available for global remote opportunities.",
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: ["Worldwide"],
    serviceType: [
      "Frontend Engineering",
      "Full Stack Development",
      "Frontend Architecture",
      "Technical Leadership",
    ],
    url: SITE_URL,
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
    </>
  );
}
