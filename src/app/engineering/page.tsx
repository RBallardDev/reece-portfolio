import { Suspense } from "react";
import EngineeringView from "@/components/engineering/EngineeringView";

export default function EngineeringPage() {
  return (
    <main className="pt-24 px-6 pb-16 md:pb-6">
      <Suspense fallback={<EngineeringLoadingSkeleton />}>
        <EngineeringView />
      </Suspense>
    </main>
  );
}

function EngineeringLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="h-10 w-48 bg-white/5 rounded mb-8 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 p-5 animate-pulse"
          >
            <div className="aspect-video w-full rounded-lg bg-white/5 mb-4" />
            <div className="h-3 w-16 bg-white/5 rounded mb-2" />
            <div className="h-5 w-32 bg-white/5 rounded mb-2" />
            <div className="h-4 w-full bg-white/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
