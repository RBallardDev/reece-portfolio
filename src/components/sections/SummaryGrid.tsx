"use client";

import Link from "next/link";
import { User, Code, Palette, Languages } from "lucide-react";
import { motion } from "motion/react";
import { revealItem } from "@/components/motion/reveal";

const cards = [
  {
    title: "Me",
    description: "Who I am and what drives me.",
    href: "/me",
    icon: User,
  },
  {
    title: "Engineering",
    description: "Software projects and technical work.",
    href: "/engineering",
    icon: Code,
  },
  {
    title: "Creative",
    description: "Design, 3D, and visual experiments.",
    href: "/creative",
    icon: Palette,
  },
  {
    title: "日本語",
    description: "My journey learning Japanese.",
    href: "/japanese",
    icon: Languages,
  },
];

export default function SummaryGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.href}
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link
              href={card.href}
              className="group block rounded-xl border border-white/10 bg-white/0 p-6 transition-colors hover:border-white/25 hover:bg-white/5 h-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{card.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{card.description}</p>
                </div>
                <Icon className="w-5 h-5 text-white transition-colors group-hover:text-white flex-shrink-0 ml-4" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </section>
  );
}
