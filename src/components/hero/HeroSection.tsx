export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Left: Intro text */}
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-widest text-white/60 mb-4">
          Software Engineer &amp; Creative
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          I build digital worlds.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-md">
          Multi-disciplinary developer blending code, design, and 3D to craft
          immersive experiences—from polished web apps to interactive visuals.
        </p>
      </div>

      {/* Right: 3D placeholder */}
      <div className="flex items-center justify-center">
        <div className="w-full aspect-square max-w-md rounded-2xl border border-white/10 flex items-center justify-center text-white/40 text-sm">
          3D Render Placeholder
        </div>
      </div>
    </section>
  );
}

