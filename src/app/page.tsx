import HeroSection from "@/components/hero/HeroSection";
import SummaryGrid from "@/components/sections/SummaryGrid";

export default function Home() {
  return (
    <main className="min-h-screen pt-24 px-6 pb-16 max-w-6xl mx-auto space-y-20">
      <HeroSection />
      <SummaryGrid />
    </main>
  );
}
