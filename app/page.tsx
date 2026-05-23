import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionDivider } from "@/components/section-divider";
import { DomainTracker } from "@/components/domain-tracker";
import { Opening } from "@/components/sections/opening";
import { SelectedWork } from "@/components/sections/selected-work";
import { Principles } from "@/components/sections/principles";
import { Notes } from "@/components/sections/notes";
import { Blueprint } from "@/components/sections/blueprint";
import { ChangedMind } from "@/components/sections/changed-mind";
import { Exploring } from "@/components/sections/exploring";
import { GlobalExperience } from "@/components/sections/global-experience";
import { Stack } from "@/components/sections/stack";
import { Experience } from "@/components/sections/experience";
import { WhatYouGet } from "@/components/sections/what-you-get";
import { Contact } from "@/components/sections/contact";
import { Pause } from "@/components/sections/pause";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <DomainTracker />
      <main className="relative">
        <Opening />
        <SectionDivider />
        <SelectedWork />
        <SectionDivider />
        <Principles />
        <SectionDivider />
        <Notes />
        <Blueprint />
        {/* First silence moment — middle of the page */}
        <Pause
          label="Pause — complexity"
          primary={
            <>
              Complexity accumulates{" "}
              <span className="text-[#c8a96e]">silently.</span>
            </>
          }
          secondary="The work is to keep noticing."
        />
        <ChangedMind />
        <SectionDivider />
        <Exploring />
        <SectionDivider />
        <GlobalExperience />
        <SectionDivider />
        <Stack />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <WhatYouGet />
        {/* Second silence moment — closing breath before contact */}
        <Pause
          label="Pause — memory"
          compact
          primary={
            <>
              The longer a system lives,
              <br className="hidden sm:block" /> the more it{" "}
              <span className="text-[#c8a96e]">remembers.</span>
            </>
          }
          secondary="Build like someone will read your code in five years. They will."
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
