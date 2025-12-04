import HeroSection from "@/components/hero/HeroSection";
import SummaryGrid from "@/components/sections/SummaryGrid";
import FitText from "@/components/ui/FitText";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-1 pt-24 px-6 max-w-6xl mx-auto w-full space-y-20">
        <HeroSection />
        <SummaryGrid />
      </main>

      {/* Footer text - full viewport width, padding above, centered */}
      <footer className="pt-32 w-screen">
        <FitText className="font-bold tracking-tight uppercase text-white/90">
          RBALLAR<span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>D</span>DEV
        </FitText>
      </footer>
    </div>
  );
}
