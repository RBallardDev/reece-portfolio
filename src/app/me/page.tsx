import MeHero from "@/components/me/MeHero";
import PillarsRow from "@/components/me/PillarsRow";
import ToolkitDrawer from "@/components/me/ToolkitDrawer";

export default function MePage() {
  return (
    <main className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <MeHero />
        <PillarsRow />
        <ToolkitDrawer />
      </div>
    </main>
  );
}

