export type Agent = {
  name: string;
  description: string;
  capabilities: string[];
};

export const agents: Agent[] = [
  {
    name: "Fashion Intelligence Analyst",
    description: "Monitor the global fashion industry and deliver strategic insights.",
    capabilities: [
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
    name: "Culture & Media Analyst",
    description: "Connect what's happening in culture to opportunities in fashion and content.",
    capabilities: [
      "Research what's happening in fashion, music, entertainment, sports, beauty, and media",
      "Identify cultural moments your brands can participate in",
      "Monitor celebrity style and collaborations",
      "Track viral conversations and internet trends",
      "Recommend content ideas based on current conversations",
    ],
  },
  {
    name: "Events & Opportunity Scout",
    description: "Make sure you never miss a valuable networking or career opportunity.",
    capabilities: [
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
    name: "Fashion Innovation Researcher",
    description: "Keep you ahead of where fashion is going.",
    capabilities: [
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
    name: "Textile & Materials Scientist",
    description: "Explain advantages, disadvantages, cost, scalability, and commercial availability.",
    capabilities: [
      "Research fiber science",
      "Monitor sustainable fabrics",
      "Track bio-based textiles",
      "Research plant-derived materials",
      "Monitor chemical innovations",
      "Research dye technologies",
      "Track new performance fabrics",
      "Build a searchable textile library",
    ],
  },
  {
    name: "Investment Analyst",
    description: "Research and compare investments based on your strategy.",
    capabilities: [
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
    name: "Creative Director",
    description: "Campaign concepts, styling direction, and creative critiques.",
    capabilities: [
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
    name: "Content Strategist",
    description: "Turn research into content and manage the calendar.",
    capabilities: [
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
    name: "Relationship Manager",
    description: "Keep every relationship warm.",
    capabilities: [
      "Remind you who to follow up with",
      "Draft networking emails",
      "Remember birthdays",
      "Recommend introductions",
      "Track collaborations",
    ],
  },
  {
    name: "Chief of Staff: Executive Assistant",
    description: "Every morning it asks: What's happening today?",
    capabilities: [
      "Reviews calendar, deadlines, projects, emails, opportunities, upcoming meetings, and deliverables",
      "Gives top 3 priorities",
      "Gives potential bottlenecks",
      "Gives suggested schedule",
      "Gives things to delegate",
      "Gives recommended follow-ups",
      "Takes notes and summarizes meetings",
    ],
  },
];
