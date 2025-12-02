"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Me", href: "/me" },
  { label: "Engineering", href: "/engineering" },
  { label: "Creative", href: "/creative" },
  { label: "日本語", href: "/japanese" },
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-sm">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              isActive
                ? "text-white"
                : "text-white/60 hover:text-white/90 transition-colors"
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

