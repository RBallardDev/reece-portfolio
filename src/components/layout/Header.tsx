"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavTabs from "./NavTabs";
import HeaderStickman from "@/components/ui/HeaderStickman";
import MenuStickman from "@/components/nav/MenuStickman";
import MobileMenuPopover from "@/components/nav/MobileMenuPopover";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [stickmanState, setStickmanState] = useState<"visible" | "exiting" | "hidden">(
    isHome ? "visible" : "hidden"
  );

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileStickmanVisible, setMobileStickmanVisible] = useState(true);
  const respawnTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle pathname changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    
    const wasHome = prevPathname === "/";
    const nowHome = pathname === "/";
    
    if (wasHome && !nowHome && stickmanState === "visible") {
      setStickmanState("exiting");
    } else if (!wasHome && nowHome && stickmanState !== "visible") {
      setStickmanState("visible");
    }
  }

  const handleExitComplete = useCallback(() => {
    setStickmanState("hidden");
  }, []);

  const showStickman = stickmanState === "visible" || stickmanState === "exiting";
  const stickmanExiting = stickmanState === "exiting";

  // Clear any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (respawnTimeoutRef.current) {
        clearTimeout(respawnTimeoutRef.current);
      }
    };
  }, []);

  // Mobile menu handlers
  const handleOpenMobileMenu = useCallback(() => {
    // Clear any pending respawn
    if (respawnTimeoutRef.current) {
      clearTimeout(respawnTimeoutRef.current);
      respawnTimeoutRef.current = null;
    }

    if (mobileMenuOpen) {
      // Close menu - stickman respawns
      setMobileMenuOpen(false);
      // Small delay then respawn
      respawnTimeoutRef.current = setTimeout(() => {
        setMobileStickmanVisible(true);
      }, 100);
      return;
    }
    
    // Open menu - stickman disappears
    setMobileMenuOpen(true);
    setMobileStickmanVisible(false);
  }, [mobileMenuOpen]);

  const handleCloseMobileMenu = useCallback(() => {
    // Clear any pending respawn
    if (respawnTimeoutRef.current) {
      clearTimeout(respawnTimeoutRef.current);
      respawnTimeoutRef.current = null;
    }

    setMobileMenuOpen(false);
    // Small delay then respawn
    respawnTimeoutRef.current = setTimeout(() => {
      setMobileStickmanVisible(true);
    }, 100);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        setMobileStickmanVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <Link href="/" className="text-xl font-semibold tracking-tight">
        Reece Ballard
      </Link>
      
      {/* Desktop: Stickman area + Nav tabs */}
      <div className="flex-1 mx-8 hidden sm:block">
        {showStickman && (
          <HeaderStickman 
            exiting={stickmanExiting} 
            onExitComplete={handleExitComplete}
          />
        )}
      </div>
      
      {/* Desktop: Nav tabs */}
      <div className="hidden sm:block">
        <NavTabs />
      </div>

      {/* Mobile: Stickman + Hamburger menu trigger */}
      <div className="flex sm:hidden items-center relative">
        <button
          type="button"
          onClick={handleOpenMobileMenu}
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-haspopup="menu"
          className="flex items-center p-1.5 -m-1.5 rounded-md transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
        >
          <MenuStickman visible={mobileStickmanVisible} />
          {/* Hamburger icon - 4 lines */}
          <div
            className={`flex flex-col justify-center gap-[3px] w-5 h-5 transition-opacity ${
              mobileMenuOpen ? "opacity-100" : "opacity-60"
            }`}
            aria-hidden="true"
          >
            <span className="block w-full h-[2px] bg-white rounded-full" />
            <span className="block w-full h-[2px] bg-white rounded-full" />
            <span className="block w-full h-[2px] bg-white rounded-full" />
            <span className="block w-full h-[2px] bg-white rounded-full" />
          </div>
        </button>

        <MobileMenuPopover 
          isOpen={mobileMenuOpen} 
          onClose={handleCloseMobileMenu} 
        />
      </div>
    </header>
  );
}
