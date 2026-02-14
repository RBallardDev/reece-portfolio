import LandingGrid from "@/components/home/LandingGrid";
// import FeaturedWorkRow from "@/components/home/FeaturedWorkRow";
import ContactDock from "@/components/home/ContactDock";
import SparkleWordmark from "@/components/home/SparkleWordmark";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Full-viewport landing grid — 4 quadrant navigation */}
      <LandingGrid />

      {/* Below the fold — featured work hidden for now */}
      {/* <main className="flex-1 px-6 pt-20 pb-8 max-w-6xl mx-auto w-full space-y-20">
        <FeaturedWorkRow />
      </main> */}

      {/* Footer area - Contact dock + wordmark */}
      <footer data-landing-footer className="pt-32 w-screen" style={{ opacity: 0 }}>
        <ContactDock />
        <SparkleWordmark />
      </footer>
    </div>
  );
}
