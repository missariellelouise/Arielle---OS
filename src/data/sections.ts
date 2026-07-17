export type FeatureGroup = {
  label?: string;
  items: string[];
};

export type Section = {
  slug: string;
  title: string;
  navLabel: string;
  summary: string;
  groups: FeatureGroup[];
};

export const sections: Section[] = [
  {
    slug: "calendar",
    title: "Calendar",
    navLabel: "Calendar",
    summary: "One place to see every meeting, no matter which calendar it lives in.",
    groups: [
      {
        items: [
          "Integrate Google Calendar & Apple Calendar to track meetings in one place",
        ],
      },
    ],
  },
  {
    slug: "tasks",
    title: "Tasks / Reminders",
    navLabel: "Tasks/Reminders",
    summary: "Every task and goal, from annual down to daily, in one system.",
    groups: [
      {
        label: "Integrations",
        items: ["Integrate Apple Reminders to keep up with tasks/projects in one place"],
      },
      {
        label: "Goal tracking",
        items: [
          "Annual Goals",
          "Quarterly Goals",
          "Monthly Goals",
          "Weekly Priorities",
          "Daily MITs (Most Important Tasks)",
        ],
      },
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    navLabel: "AI Agents",
    summary: "A team of specialized AI agents covering research, creative, operations, and finance.",
    groups: [
      {
        label: "Fashion Intelligence Analyst — monitor the global fashion industry and deliver strategic insights",
        items: [
          "Summarize fashion shows",
          "Research trends in fashion (BoF, WWD, Vogue Business, etc.)",
          "Forecast emerging fashion trends before they become mainstream",
          "Analyze runway collections and designer strategies",
          "Monitor luxury, retail, and consumer behavior",
          "Track competitor brands and industry shifts",
          "Create weekly and monthly fashion intelligence reports",
          "Trend reports, runway collections, consumer insights, color forecasts, luxury news, emerging designers",
        ],
      },
      {
        label: "Culture & Media Analyst — connect what's happening in culture to opportunities in fashion and content",
        items: [
          "Research what's happening in fashion, music, entertainment, sports, beauty, and media",
          "Identify cultural moments your brands can participate in",
          "Monitor celebrity style and collaborations",
          "Track viral conversations and internet trends",
          "Recommend content ideas based on current conversations",
        ],
      },
      {
        label: "Events & Opportunity Scout — make sure you never miss a valuable networking or career opportunity",
        items: [
          "Find networking events in Miami–Fort Lauderdale",
          "Research major conferences around the world (Cannes Lions, SXSW, Adobe MAX, etc.)",
          "Research job/contract opportunities",
          "Find fashion industry short-term internship/volunteer opportunities",
          "Research backstage, production, PR, and styling opportunities for fashion weeks",
          "Track application deadlines",
          "Recommend which events provide the highest ROI",
        ],
      },
      {
        label: "Fashion Innovation Researcher — keep you ahead of where fashion is going",
        items: [
          "Research AI transforming fashion",
          "Track retail technology",
          "Monitor fashion-tech startups",
          "Research digital fashion",
          "Research 3D design software",
          "Track manufacturing innovations",
          "Monitor supply chain technology",
          "Summarize major breakthroughs",
        ],
      },
      {
        label: "Textile & Materials Scientist",
        items: [
          "Research fiber science",
          "Monitor sustainable fabrics",
          "Track bio-based textiles",
          "Research plant-derived materials",
          "Monitor chemical innovations",
          "Research dye technologies",
          "Track new performance fabrics",
          "Build a searchable textile library",
          "Explain advantages, disadvantages, cost, scalability, and commercial availability",
        ],
      },
      {
        label: "Investment Analyst",
        items: [
          "Research stocks for long-term investing",
          "Research ETFs",
          "Research index funds",
          "Research bonds",
          "Monitor market news",
          "Explain earnings reports",
          "Compare companies",
          "Recommend investments based on your investment strategy",
          "Summarize Fidelity watchlists",
          "Track dividend opportunities",
        ],
      },
      {
        label: "Creative Director",
        items: [
          "Campaign concepts",
          "Photoshoot ideas",
          "Mood boards",
          "Styling direction",
          "Brand storytelling",
          "Color palette recommendations",
          "Seasonal concepts",
          "Creative critiques",
        ],
      },
      {
        label: "Content Strategist",
        items: [
          "Build content calendars",
          "Turn research into content",
          "Write hooks and captions",
          "Repurpose content",
          "Recommend posting schedule",
          "Analyze performance",
          "Suggest new series",
        ],
      },
      {
        label: "Relationship Manager",
        items: [
          "Remind you who to follow up with",
          "Draft networking emails",
          "Remember birthdays",
          "Recommend introductions",
          "Track collaborations",
        ],
      },
      {
        label: "Chief of Staff: Executive Assistant",
        items: [
          "Every morning it asks: What's happening today?",
          "Reviews calendar, deadlines, projects, emails, opportunities, upcoming meetings, and deliverables",
          "Gives top 3 priorities",
          "Gives potential bottlenecks",
          "Gives suggested schedule",
          "Gives things to delegate",
          "Gives recommended follow-ups",
          "Takes notes and summarizes meetings",
        ],
      },
    ],
  },
  {
    slug: "project-hub",
    title: "Project Hub",
    navLabel: "Project Hub",
    summary:
      "Kanban board to manage tasks for personal content creation and independent projects, assignments from Miami Fashion Institute, and work for Fashion Alliance Network.",
    groups: [{ items: ["Kanban list spanning personal projects, school assignments, and Fashion Alliance Network work"] }],
  },
  {
    slug: "dump",
    title: "Dumppp",
    navLabel: "Dumppp",
    summary: "A place to dump everything before you organize it.",
    groups: [
      {
        items: [
          "Quick Notes / Brain Dump",
          "Voice memo inbox",
          "Screenshots inbox",
          "Random ideas",
          "Links to read later",
          "Inspiration from Instagram, TikTok, Pinterest, YouTube",
        ],
      },
    ],
  },
  {
    slug: "finance",
    title: "Finance",
    navLabel: "Finance",
    summary: "Every dollar in, out, and invested — tracked in one place.",
    groups: [
      {
        items: [
          "Bi-weekly check",
          "Monthly expenses + due dates",
          "Payments received",
          "Memberships/subscription renewals",
          "Income by client/project",
          "Savings & investment goals",
          "Estimated taxes owed (for freelance income)",
        ],
      },
    ],
  },
  {
    slug: "crm",
    title: "CRM",
    navLabel: "CRM",
    summary: "Track everyone you meet — brands, editors, stylists, and everyone in between.",
    groups: [
      {
        label: "Categories",
        items: [
          "People",
          "Brands",
          "Editors",
          "Photographers",
          "Stylists",
          "PR contacts",
          "Designers",
          "Manufacturers",
          "Recruiters",
          "Professors",
          "Sponsors",
          "Investors",
        ],
      },
      {
        label: "For each person",
        items: [
          "Where you met",
          "Last conversation",
          "Follow-up date",
          "Interests",
          "Collaboration ideas",
          "Notes",
        ],
      },
    ],
  },
  {
    slug: "content-studio",
    title: "Content Studio",
    navLabel: "Content Studio",
    summary: "From idea to published post, with performance tracked along the way.",
    groups: [
      {
        items: [
          "Ideas",
          "Scripts",
          "Shot lists",
          "Filming schedule",
          "Editing status",
          "Approval status",
          "Plan publishing schedule based on analytics",
          "Performance metrics",
          "Repurposing opportunities",
        ],
      },
    ],
  },
  {
    slug: "knowledge-hub",
    title: "Knowledge + Inspiration Hub",
    navLabel: "Knowledge + Inspiration",
    summary: "Everything you're learning and everything that inspires you.",
    groups: [
      {
        label: "Learning",
        items: ["Articles", "Books", "Podcasts", "Videos", "Courses", "Research papers"],
      },
      {
        label: "Inspiration Library",
        items: [
          "Editorials + Campaigns",
          "Branding",
          "Photography",
          "Styling",
          "Color palettes",
          "Typography",
          "Packaging",
          "Runway shows",
          "Architecture",
          "Interior design",
          "Music videos",
          "Film scenes",
          "Creative direction references",
        ],
      },
    ],
  },
  {
    slug: "meetings",
    title: "Meetings Database",
    navLabel: "Meetings Database",
    summary: "A searchable record of every meeting, decision, and follow-up.",
    groups: [
      {
        items: [
          "AI summaries",
          "Hand-written/typed notes",
          "Decisions made/next steps",
          "Action items/deliverables",
          "Follow-up dates",
        ],
      },
    ],
  },
  {
    slug: "brand-hq",
    title: "Brand HQ",
    navLabel: "Brand HQ",
    summary: "The strategy, identity, and assets behind every brand you run.",
    groups: [
      {
        label: "Brands",
        items: ["AAZA", "Science of Fashion & Beauty (SOFAB)", "Personal Brand", "Future startups"],
      },
      {
        label: "Each brand gets",
        items: [
          "Mission",
          "Vision",
          "Voice",
          "Target audience",
          "Goals",
          "Brand guidelines",
          "Color palette",
          "Fonts",
          "Competitors",
          "Ideas backlog",
        ],
      },
      {
        label: "Also tracked",
        items: ["Retail analysis, competitor research, retail pricing"],
      },
    ],
  },
  {
    slug: "school-hub",
    title: "School Hub",
    navLabel: "School Hub",
    summary: "Everything for Miami Fashion Institute in one place.",
    groups: [
      {
        items: [
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
    ],
  },
  {
    slug: "assets",
    title: "Asset + Template Library",
    navLabel: "Asset + Template Library",
    summary: "Every brand asset and reusable template, organized and ready to grab.",
    groups: [
      {
        label: "Folders",
        items: [
          "Brand kits & guidelines (colors, fonts, etc.)",
          "Logos",
          "Photos/videos",
          "Mockups",
          "Creative briefs",
          "Headshots",
          "Resumes",
          "Contracts + Invoices",
        ],
      },
      {
        label: "Templates",
        items: [
          "Email templates",
          "Proposal templates",
          "Invoices",
          "Creative briefs",
          "Mood boards",
          "Contracts",
          "Meeting agendas",
          "Shot lists",
          "Event checklists",
          "Packing lists",
        ],
      },
    ],
  },
  {
    slug: "opportunities",
    title: "Opportunity Pipeline",
    navLabel: "Opportunity Pipeline",
    summary: "Every opportunity worth chasing, tracked from lead to outcome.",
    groups: [
      {
        label: "Types",
        items: [
          "Jobs",
          "Freelance",
          "Speaking",
          "Volunteer",
          "Collaborations",
          "Brand partnerships",
          "Competitions",
          "Grants",
          "Accelerators",
          "Residencies",
          "Fashion shows",
          "Model calls",
          "Open casting calls",
          "Conferences",
          "Scholarships",
        ],
      },
      {
        label: "Each opportunity includes",
        items: ["Deadline", "Status", "Contact person", "Required materials", "Follow-up date", "Outcome"],
      },
    ],
  },
  {
    slug: "weekly-review",
    title: "Weekly Review",
    navLabel: "Weekly Review",
    summary: "A weekly check-in to close the loop and set up next week.",
    groups: [
      {
        items: [
          "What did I finish?",
          "What moved the needle?",
          "What's overdue?",
          "Who should I follow up with?",
          "What did I learn?",
          "What should AI research next week?",
        ],
      },
    ],
  },
  {
    slug: "archives",
    title: "Archives",
    navLabel: "Archives",
    summary: "The record of everything finished, published, and won.",
    groups: [
      {
        items: [
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
    ],
  },
];

export function getSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
