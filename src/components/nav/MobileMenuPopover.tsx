"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: string;
  href: string;
  style?: React.CSSProperties;
};

const tabs: Tab[] = [
  { label: "Me", href: "/me" },
  { label: "Engineering", href: "/engineering" },
  { label: "Creative", href: "/creative" },
  {
    label: "日本語",
    href: "/japanese",
    style: { fontFamily: '"Noto Sans JP", system-ui, sans-serif' },
  },
];

type MobileMenuPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenuPopover({ isOpen, onClose }: MobileMenuPopoverProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Use setTimeout to avoid immediate close from the same click that opened
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close when navigating
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      className="absolute top-full right-0 mt-2 py-2 px-1 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl min-w-[160px] z-50"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="menuitem"
            className={`block px-4 py-2.5 text-base font-semibold rounded-md transition-colors ${
              isActive
                ? "text-white bg-white/10"
                : "text-white/70 hover:text-white hover:bg-white/5"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30 focus-visible:outline-offset-[-2px]`}
            style={tab.style}
            onClick={onClose}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

