import { person } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a8780] sm:flex-row sm:items-center sm:justify-between sm:px-10 md:px-16">
        <div>{person.name} · Built with Next.js</div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <span>Last updated · {person.lastUpdated}</span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
