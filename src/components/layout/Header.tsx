import Link from "next/link";
import NavTabs from "./NavTabs";
import HeaderStickman from "@/components/ui/HeaderStickman";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <Link href="/" className="text-xl font-semibold tracking-tight">
        Reece Ballard
      </Link>
      <div className="flex-1 mx-8 hidden sm:block">
        <HeaderStickman />
      </div>
      <NavTabs />
    </header>
  );
}
