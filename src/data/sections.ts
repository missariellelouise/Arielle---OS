// Nav metadata for every non-home section. Sections with a dedicated
// page (their own folder under src/app) are listed in DEDICATED_SLUGS
// and are NOT handled by the generic src/app/[slug]/page.tsx route.
export type NavSection = {
  slug: string;
  title: string;
  navLabel: string;
};

export const navSections: NavSection[] = [
  { slug: "calendar", title: "Calendar", navLabel: "Calendar" },
  { slug: "tasks", title: "Tasks / Reminders", navLabel: "Tasks/Reminders" },
  { slug: "ai-agents", title: "AI Agents", navLabel: "AI Agents" },
  { slug: "project-hub", title: "Project Hub", navLabel: "Project Hub" },
  { slug: "dump", title: "Dumppp", navLabel: "Dumppp" },
  { slug: "finance", title: "Finance", navLabel: "Finance" },
  { slug: "crm", title: "CRM", navLabel: "CRM" },
  { slug: "content-studio", title: "Content Studio", navLabel: "Content Studio" },
  { slug: "knowledge-hub", title: "Knowledge + Inspiration Hub", navLabel: "Knowledge + Inspiration" },
  { slug: "meetings", title: "Meetings Database", navLabel: "Meetings Database" },
  { slug: "brand-hq", title: "Brand HQ", navLabel: "Brand HQ" },
  { slug: "school-hub", title: "School Hub", navLabel: "School Hub" },
  { slug: "assets", title: "Asset + Template Library", navLabel: "Asset + Template Library" },
  { slug: "opportunities", title: "Opportunity Pipeline", navLabel: "Opportunity Pipeline" },
  { slug: "weekly-review", title: "Weekly Review", navLabel: "Weekly Review" },
  { slug: "archives", title: "Archives", navLabel: "Archives" },
];

// Slugs with their own dedicated page under src/app/<slug>/page.tsx —
// excluded from the generic [slug] catch-all.
export const DEDICATED_SLUGS = new Set([
  "calendar",
  "ai-agents",
  "project-hub",
  "finance",
  "crm",
  "meetings",
  "brand-hq",
  "opportunities",
]);

export type GenericSection = {
  slug: string;
  title: string;
  summary: string;
  groups: string[];
};

// Sections rendered generically from ListItem rows, grouped by label.
export const genericSections: GenericSection[] = [
  {
    slug: "tasks",
    title: "Tasks / Reminders",
    summary:
      "Every task and goal, from annual down to daily. Apple Reminders integration is not yet connected — add items here in the meantime.",
    groups: ["Annual Goals", "Quarterly Goals", "Monthly Goals", "Weekly Priorities", "Daily MITs (Most Important Tasks)"],
  },
  {
    slug: "dump",
    title: "Dumppp",
    summary: "A place to dump everything before you organize it.",
    groups: [
      "Quick Notes / Brain Dump",
      "Voice memo inbox",
      "Screenshots inbox",
      "Random ideas",
      "Links to read later",
      "Inspiration from Instagram, TikTok, Pinterest, YouTube",
    ],
  },
  {
    slug: "content-studio",
    title: "Content Studio",
    summary: "From idea to published post, with performance tracked along the way.",
    groups: [
      "Ideas",
      "Scripts",
      "Shot lists",
      "Filming schedule",
      "Editing status",
      "Approval status",
      "Performance metrics",
      "Repurposing opportunities",
    ],
  },
  {
    slug: "knowledge-hub",
    title: "Knowledge + Inspiration Hub",
    summary: "Everything you're learning and everything that inspires you.",
    groups: [
      "Learning",
      "Inspiration Library",
    ],
  },
  {
    slug: "school-hub",
    title: "School Hub",
    summary: "Everything for Miami Fashion Institute in one place.",
    groups: [
      "Assignments",
      "Grades",
      "Projects",
      "Reading",
      "Class notes",
      "Deadlines",
      "Professors",
      "Resources",
      "Portfolio pieces",
    ],
  },
  {
    slug: "assets",
    title: "Asset + Template Library",
    summary: "Every brand asset and reusable template, organized and ready to grab.",
    groups: [
      "Brand kits & guidelines (colors, fonts, etc.)",
      "Logos",
      "Photos/videos",
      "Mockups",
      "Templates",
      "Creative briefs",
      "Headshots",
      "Resumes",
      "Contracts + Invoices",
    ],
  },
  {
    slug: "weekly-review",
    title: "Weekly Review",
    summary: "A weekly check-in to close the loop and set up next week.",
    groups: [
      "What did I finish?",
      "What moved the needle?",
      "What's overdue?",
      "Who should I follow up with?",
      "What did I learn?",
      "What should AI research next week?",
    ],
  },
  {
    slug: "archives",
    title: "Archives",
    summary: "The record of everything finished, published, and won.",
    groups: [
      "Completed projects",
      "Published campaigns",
      "Press mentions",
      "Event recaps",
      "Portfolio-ready work",
      "Testimonials",
      "Revenue milestones",
      "Career wins",
      "Fashion show credit",
    ],
  },
];

export function getGenericSection(slug: string): GenericSection | undefined {
  return genericSections.find((s) => s.slug === slug);
}
