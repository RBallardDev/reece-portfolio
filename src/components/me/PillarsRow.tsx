"use client";

import TiltCard from "./TiltCard";

const pillars = [
  {
    title: "Engineering",
    description:
      "Engineering is my favorite hobby. It’s not just my job, it’s what I choose to spend my time on. I build because I genuinely love the process: learn → build → ship → repeat. It’s the one thing I can do for hours, completely losing track of time.",
  },
  {
    title: "Creative",
    description:
      "I’ve always been creative, just not in the traditional “drawing or painting” way. My brain is naturally logical, and over time I learned how to use that to express ideas: first through edits and video work, and now through software. It’s taught me how to switch between structure and experimentation and still ship clean results.",
  },
  {
    title: "Japanese",
    description:
      "Japanese is a long-term investment for me. It opens doors for work and collaboration beyond the U.S., and it matters personally since I have family in Japan I want better connect with. I also love the challenge of learning Japanese. It’s the best kind of mental workout.",
  },
];

export default function PillarsRow() {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <TiltCard key={pillar.title} className="h-full">
            <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
            <p className="mt-2 text-base text-white/55 leading-relaxed">
              {pillar.description}
            </p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

