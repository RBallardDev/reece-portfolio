import Link from "next/link";

const cards = [
  {
    title: "Me",
    description: "Who I am and what drives me.",
    href: "/me",
  },
  {
    title: "Engineering",
    description: "Software projects and technical work.",
    href: "/engineering",
  },
  {
    title: "Creative",
    description: "Design, 3D, and visual experiments.",
    href: "/creative",
  },
  {
    title: "日本語",
    description: "My journey learning Japanese.",
    href: "/japanese",
  },
];

export default function SummaryGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group block rounded-xl border border-white/10 bg-white/0 p-6 transition-colors hover:border-white/25 hover:bg-white/5"
        >
          <h3 className="text-lg font-medium">{card.title}</h3>
          <p className="mt-1 text-sm text-white/60">{card.description}</p>
        </Link>
      ))}
    </section>
  );
}
