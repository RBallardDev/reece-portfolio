import HeroSection from "@/components/hero/HeroSection";
import SummaryGrid from "@/components/sections/SummaryGrid";
import FitText from "@/components/ui/FitText";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 px-6 max-w-6xl mx-auto w-full space-y-20">
        <HeroSection />
        <SummaryGrid />
      </main>

      {/* Footer text - full bleed, padding above, flush bottom */}
      <footer className="pt-32">
        <FitText className="font-bold tracking-tight uppercase text-white/90">
          RBALLARDDEV.
        </FitText>
      </footer>
    </div>
  );
}
