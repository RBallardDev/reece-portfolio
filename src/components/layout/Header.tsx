"use client";

import { useCallback, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavTabs from "./NavTabs";
import HeaderStickman from "@/components/ui/HeaderStickman";
import MobileMenuPopover from "@/components/nav/MobileMenuPopover";
import NameLogo from "@/components/nav/NameLogo";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [stickmanState, setStickmanState] = useState<"visible" | "exiting" | "hidden">(
    isHome ? "visible" : "hidden"
  );

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Mobile menu handlers
  const handleOpenMobileMenu = useCallback(() => {
    setMobileMenuOpen((open) => !open);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 transition-colors duration-300 ${
          mobileMenuOpen 
            ? "bg-black" 
            : "bg-black/80 backdrop-blur-sm"
        }`}
      >
        <NameLogo />
        
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

        {/* Mobile: Simple menu trigger */}
        <button
          type="button"
          onClick={handleOpenMobileMenu}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-haspopup="menu"
          className="flex sm:hidden items-center px-2 py-1 -mx-2 rounded-md transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30 text-white font-medium tracking-wide"
        >
          {mobileMenuOpen ? "[Close]" : "[Menu]"}
        </button>
      </header>

      {/* Mobile menu - rendered outside header to avoid stacking context issues */}
      <MobileMenuPopover 
        isOpen={mobileMenuOpen} 
        onClose={handleCloseMobileMenu} 
      />
    </>
  );
}
