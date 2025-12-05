import HeroSection from "@/components/hero/HeroSection";
import SummaryGrid from "@/components/sections/SummaryGrid";
import FeaturedWorkRow from "@/components/home/FeaturedWorkRow";
import ContactDock from "@/components/home/ContactDock";
import SparkleWordmark from "@/components/home/SparkleWordmark";
import StatsStrip from "@/components/home/StatsStrip";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-1 pt-24 px-6 max-w-6xl mx-auto w-full space-y-20">
        <HeroSection />
        <StatsStrip />
        <SummaryGrid />
        <FeaturedWorkRow />
      </main>

      {/* Footer area - Contact dock + wordmark */}
      <footer className="pt-32 w-screen">
        {/* Contact dock - text links above wordmark */}
        <ContactDock />
        
        {/* Wordmark - full width with sparkles on hover */}
        <SparkleWordmark />
      </footer>
    </div>
  );
}
