import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

async function seedListItems() {
  const items: { section: string; group: string; title: string; done?: boolean }[] = [
    // Tasks / goal hierarchy
    { section: "tasks", group: "Annual Goals", title: "Land a fashion week backstage credit" },
    { section: "tasks", group: "Quarterly Goals", title: "Launch AAZA capsule collection" },
    { section: "tasks", group: "Monthly Goals", title: "Publish 12 pieces of content" },
    { section: "tasks", group: "Weekly Priorities", title: "Finalize AAZA lookbook shot list" },
    { section: "tasks", group: "Weekly Priorities", title: "Submit Miami Fashion Institute portfolio draft" },
    { section: "tasks", group: "Weekly Priorities", title: "Follow up with Fashion Alliance Network contact" },
    { section: "tasks", group: "Daily MITs (Most Important Tasks)", title: "Send follow-up email to PR contact" },
    { section: "tasks", group: "Daily MITs (Most Important Tasks)", title: "Post weekly content recap" },
    { section: "tasks", group: "Daily MITs (Most Important Tasks)", title: "Review textile supplier notes" },

    // Dump
    { section: "dump", group: "Quick Notes / Brain Dump", title: "Idea: capsule collection using bio-based leather alternative" },
    { section: "dump", group: "Voice memo inbox", title: "Voice memo: styling notes from fitting" },
    { section: "dump", group: "Screenshots inbox", title: "Screenshot: color palette from runway show" },
    { section: "dump", group: "Random ideas", title: "Reel series: 'What I learned backstage'" },
    { section: "dump", group: "Links to read later", title: "BoF article on sustainable dye technology" },
    { section: "dump", group: "Inspiration from Instagram, TikTok, Pinterest, YouTube", title: "Moodboard pin: editorial lighting reference" },

    // Content Studio
    { section: "content-studio", group: "Ideas", title: "SOFAB newsletter on dye tech innovations" },
    { section: "content-studio", group: "Scripts", title: "Script: backstage recap reel" },
    { section: "content-studio", group: "Shot lists", title: "AAZA lookbook shot list" },
    { section: "content-studio", group: "Filming schedule", title: "Studio day — Jul 22" },
    { section: "content-studio", group: "Editing status", title: "Backstage recap — rough cut" },
    { section: "content-studio", group: "Approval status", title: "SOFAB newsletter — pending review" },

    // Knowledge Hub
    { section: "knowledge-hub", group: "Learning", title: "The Business of Fashion — trend report Q3" },
    { section: "knowledge-hub", group: "Inspiration Library", title: "Editorial: Vogue Business color forecast" },

    // School Hub
    { section: "school-hub", group: "Assignments", title: "Textile science midterm project" },
    { section: "school-hub", group: "Deadlines", title: "Portfolio review submission" },

    // Assets
    { section: "assets", group: "Brand kits & guidelines (colors, fonts, etc.)", title: "AAZA brand kit v2" },
    { section: "assets", group: "Templates", title: "Creative brief template" },

    // Weekly Review
    { section: "weekly-review", group: "What did I finish?", title: "Add this week's wins here" },
    { section: "weekly-review", group: "What's overdue?", title: "Add anything overdue here" },

    // Archives
    { section: "archives", group: "Completed projects", title: "AAZA lookbook Vol. 1" },
  ];

  for (const [i, item] of items.entries()) {
    await db.listItem.create({
      data: { ...item, order: i, done: item.done ?? false },
    });
  }
}

async function seedDeadlinesAndEvents() {
  await db.deadline.createMany({
    data: [
      { label: "SOFAB pitch deck due", date: daysFromNow(2) },
      { label: "Scholarship application closes", date: daysFromNow(5) },
      { label: "Client invoice due", date: daysFromNow(9) },
    ],
  });

  await db.event.createMany({
    data: [
      { label: "Miami networking mixer", date: daysFromNow(8) },
      { label: "Adobe MAX", date: daysFromNow(90) },
    ],
  });

  await db.meeting.createMany({
    data: [
      { title: "Studio check-in", date: new Date(new Date().setHours(10, 0, 0, 0)) },
      { title: "Brand partner call", date: new Date(new Date().setHours(14, 30, 0, 0)) },
    ],
  });
}

async function seedFinance() {
  await db.transaction.createMany({
    data: [
      { type: "income", label: "AAZA consulting", amount: 2500, client: "AAZA", date: daysFromNow(-10) },
      { type: "income", label: "Freelance styling gig", amount: 1750, client: "Independent client", date: daysFromNow(-3) },
      { type: "expense", label: "Fabric samples", amount: 180, date: daysFromNow(-6) },
      { type: "subscription", label: "Adobe Creative Cloud", amount: 59.99, recurring: true, date: daysFromNow(-1), dueDate: daysFromNow(24) },
    ],
  });
  await db.metric.create({ data: { key: "followersGained", value: 312 } });
}

async function seedProjects() {
  await db.projectCard.createMany({
    data: [
      { title: "AAZA fall lookbook", category: "Personal", status: "in-progress", order: 0 },
      { title: "Miami Fashion Institute final project", category: "Miami Fashion Institute", status: "todo", order: 1 },
      { title: "Fashion Alliance Network campaign", category: "Fashion Alliance Network", status: "at-risk", order: 2 },
    ],
  });
}

async function seedContacts() {
  await db.contact.createMany({
    data: [
      { name: "Jordan Ellis", category: "Editors", whereMet: "Cannes Lions 2026", interests: "Sustainable textiles" },
      { name: "Priya Nair", category: "PR contacts", whereMet: "Miami networking mixer" },
    ],
  });
}

async function seedOpportunities() {
  await db.opportunity.createMany({
    data: [
      { title: "Backstage PA — regional fashion week", type: "Fashion shows", status: "applied", deadline: daysFromNow(14) },
      { title: "SXSW speaker application", type: "Speaking", status: "researching", deadline: daysFromNow(45) },
    ],
  });
}

async function seedBrands() {
  await db.brand.createMany({
    data: [
      { slug: "aaza", name: "AAZA" },
      { slug: "sofab", name: "Science of Fashion & Beauty (SOFAB)" },
      { slug: "personal-brand", name: "Personal Brand" },
      { slug: "future-startups", name: "Future startups" },
    ],
  });
}

async function main() {
  await seedListItems();
  await seedDeadlinesAndEvents();
  await seedFinance();
  await seedProjects();
  await seedContacts();
  await seedOpportunities();
  await seedBrands();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
