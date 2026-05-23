"use client";

import { person } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { FadeIn } from "@/components/motion/fade-in";

export function Contact() {
  return (
    <Section id="contact" index="11" label="contact">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-7">
          <FadeIn>
            <h2 className="max-w-2xl font-display text-[36px] font-light leading-[1.15] tracking-[-0.02em] text-[#f0ece4] text-balance sm:text-[48px] md:text-[60px]">
              Let&rsquo;s build something
              <br />
              <span className="text-[#c8a96e]">that lasts.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-10 max-w-[410px] text-[15px] leading-[1.75] text-[#a3a098] text-pretty">
              I&rsquo;m open to senior frontend and full-stack roles, particularly
              with teams shipping product across timezones. The kinds of
              systems that need to keep working two years from now.
            </p>
          </FadeIn>
        </div>

        <address className="space-y-10 not-italic lg:col-span-5">
          <FadeIn delay={0.2}>
            <ContactLink
              label="Email"
              href={`mailto:${person.email}`}
              text={person.email}
              rel="me"
            />
          </FadeIn>
          <FadeIn delay={0.3}>
            <ContactLink
              label="LinkedIn"
              href={person.linkedin}
              text={person.linkedinHandle}
              external
              rel="me noreferrer noopener"
            />
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="border-l border-white/[0.08] pl-5">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
                Based in
              </div>
              <p className="text-[15px] text-[#bab7b0]">{person.location}</p>
            </div>
          </FadeIn>
        </address>
      </div>
    </Section>
  );
}

function ContactLink({
  label,
  href,
  text,
  external = false,
  rel,
}: {
  label: string;
  href: string;
  text: string;
  external?: boolean;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={rel ?? (external ? "noreferrer noopener" : undefined)}
      className="group block border-l border-[#c8a96e]/40 pl-5 transition-[border-color,padding] duration-500 hover:border-[#c8a96e] hover:pl-6"
    >
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/70">
        {label}
      </div>
      <p className="flex items-baseline gap-3 text-[17px] text-[#f0ece4]">
        <span>{text}</span>
        <span className="inline-block text-[#c8a96e] transition-transform duration-500 group-hover:translate-x-1">
          →
        </span>
      </p>
    </a>
  );
}
