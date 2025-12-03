"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavUnderline from "@/components/ui/NavUnderline";

type TabConfig = {
  label: string;
  href: string;
  className?: string;
  style?: CSSProperties;
};

const tabs: TabConfig[] = [
  { label: "Me", href: "/me" },
  { label: "Engineering", href: "/engineering" },
  { label: "Creative", href: "/creative" },
  {
    label: "日本語",
    href: "/japanese",
    className: "font-semibold",
    style: { fontFamily: '"Noto Sans JP", system-ui, sans-serif' },
  },
];

export default function NavTabs() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  return (
    <nav ref={navRef} className="relative flex items-center gap-6 text-base pb-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            data-nav-item
            className={[
              "font-semibold",
              isActive
                ? "text-white"
                : "text-white/60 hover:text-white/90 transition-colors",
              tab.className ?? "",
            ].join(" ")}
            style={tab.style}
          >
            {tab.label}
          </Link>
        );
      })}
      <NavUnderline containerRef={navRef} />
    </nav>
  );
}
