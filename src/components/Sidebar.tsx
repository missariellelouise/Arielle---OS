"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  ListChecks,
  Bot,
  KanbanSquare,
  Inbox,
  Wallet,
  Users,
  Clapperboard,
  BookOpen,
  MessagesSquare,
  Building2,
  GraduationCap,
  FolderArchive,
  Target,
  ClipboardList,
  Archive,
  type LucideIcon,
} from "lucide-react";
import { sections } from "@/data/sections";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const iconBySlug: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  tasks: ListChecks,
  "ai-agents": Bot,
  "project-hub": KanbanSquare,
  dump: Inbox,
  finance: Wallet,
  crm: Users,
  "content-studio": Clapperboard,
  "knowledge-hub": BookOpen,
  meetings: MessagesSquare,
  "brand-hq": Building2,
  "school-hub": GraduationCap,
  assets: FolderArchive,
  opportunities: Target,
  "weekly-review": ClipboardList,
  archives: Archive,
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  ...sections.map((s) => ({
    href: `/${s.slug}`,
    label: s.navLabel,
    icon: iconBySlug[s.slug] ?? Home,
  })),
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-black/10 bg-white/60 px-4 py-6 dark:border-white/10 dark:bg-white/5 md:block">
      <div className="mb-6 px-2">
        <p className="text-lg font-semibold tracking-tight">Arielle OS</p>
        <p className="text-xs text-black/50 dark:text-white/50">Personal command center</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-black/10 font-medium text-foreground dark:bg-white/15"
                  : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
