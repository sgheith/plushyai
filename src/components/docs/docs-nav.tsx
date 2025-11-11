"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  HelpCircle,
  Lightbulb,
  PlayCircle,
  Wrench,
  FileText,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/docs",
    icon: FileText,
  },
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    icon: PlayCircle,
  },
  {
    title: "How to Use",
    href: "/docs/how-to-use",
    icon: BookOpen,
  },
  {
    title: "FAQ",
    href: "/docs/faq",
    icon: HelpCircle,
  },
  {
    title: "Tips & Best Practices",
    href: "/docs/tips",
    icon: Lightbulb,
  },
  {
    title: "Troubleshooting",
    href: "/docs/troubleshooting",
    icon: Wrench,
  },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-24 space-y-1">
      <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Documentation
      </h3>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
              isActive
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
