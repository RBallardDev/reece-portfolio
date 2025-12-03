"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavTabs from "./NavTabs";
import HeaderStickman from "@/components/ui/HeaderStickman";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [stickmanState, setStickmanState] = useState<"visible" | "exiting" | "hidden">(
    isHome ? "visible" : "hidden"
  );

  // Handle pathname changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    
    const wasHome = prevPathname === "/";
    const nowHome = pathname === "/";
    
    if (wasHome && !nowHome && stickmanState === "visible") {
      // Leaving home - start exit animation
      setStickmanState("exiting");
    } else if (!wasHome && nowHome && stickmanState !== "visible") {
      // Arriving at home - show stickman
      setStickmanState("visible");
    }
  }

  const handleExitComplete = useCallback(() => {
    setStickmanState("hidden");
  }, []);

  const showStickman = stickmanState === "visible" || stickmanState === "exiting";
  const stickmanExiting = stickmanState === "exiting";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <Link href="/" className="text-xl font-semibold tracking-tight">
        Reece Ballard
      </Link>
      <div className="flex-1 mx-8 hidden sm:block">
        {showStickman && (
          <HeaderStickman 
            exiting={stickmanExiting} 
            onExitComplete={handleExitComplete}
          />
        )}
      </div>
      <NavTabs />
    </header>
  );
}
