/**
 * Dynamic time calculations.
 * All references to "years of experience" / "duration" / "last updated" flow
 * through here — so the portfolio ages itself automatically.
 */

const CAREER_START = "2022-09-01"; // Trainee start at Tuvoc Technologies
const CURRENT_ROLE_START = "2025-11-01"; // Senior Software Engineer at Tuvoc
const CHIPPER_LEAD_START = "2024-05-01"; // Lead on Chipper (~1 year ongoing)

function diffYears(fromIso: string, to: Date = new Date()): number {
  const from = new Date(fromIso);
  const ms = to.getTime() - from.getTime();
  return ms / (1000 * 60 * 60 * 24 * 365.25);
}

/** Returns years rounded to nearest 0.5 (e.g. 3.5, 4.0, 4.5). */
export function yearsRoundedHalf(fromIso: string): number {
  return Math.round(diffYears(fromIso) * 2) / 2;
}

/** Career experience as a 0.5-rounded number — used in hero stats. */
export function careerYears(): number {
  return yearsRoundedHalf(CAREER_START);
}

/** Years in current role, integer rounded. */
export function currentRoleYears(): number {
  return Math.max(0, Math.round(diffYears(CURRENT_ROLE_START) * 10) / 10);
}

/** Duration of Chipper lead, formatted. */
export function chipperLeadDuration(): string {
  const months = Math.floor(diffYears(CHIPPER_LEAD_START) * 12);
  if (months < 12) return `${months} months, ongoing`;
  const y = Math.floor(months / 12);
  const remainder = months % 12;
  if (remainder === 0) return `${y} year${y > 1 ? "s" : ""}, ongoing`;
  return `${y} year${y > 1 ? "s" : ""} ${remainder} mo, ongoing`;
}

/** "Last updated MMM YYYY" — current month/year, always today. */
export function lastUpdatedLabel(): string {
  return new Date().toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/** Current year — used in footer. */
export function currentYear(): number {
  return new Date().getFullYear();
}

export const CAREER_START_ISO = CAREER_START;
export const CURRENT_ROLE_START_ISO = CURRENT_ROLE_START;
