"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const textVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function JapanesePage() {
  const [lang, setLang] = useState<"ja" | "en">("ja");

  return (
    <main className="min-h-screen pt-24 px-6 pb-16">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex items-center justify-between gap-4 mb-10">
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: '"Noto Sans JP", system-ui, sans-serif' }}
          >
            日本語
          </h1>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLang(lang === "ja" ? "en" : "ja")}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {lang === "ja" ? "[English | 英語]" : "[日本語 | Japanese]"}
            </button>
          </div>
        </div>

        {/* Text content with crossfade between languages */}
        <AnimatePresence mode="wait">
          {lang === "ja" ? (
            <motion.div
              key="ja"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Desktop: tategaki (縦書き) — vertical, right to left */}
              <div className="hidden md:flex w-full overflow-x-auto justify-end">
                <p
                  className="text-2xl leading-loose text-white/80 font-medium"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    height: "clamp(400px, 70vh, 700px)",
                    fontFamily: '"Noto Sans JP", system-ui, sans-serif',
                  }}
                >
                  はじめまして。バラード・リースです。ロサンゼルスで生まれて、今もロサンゼルスに住んでいます。ソフトウェアエンジニアとして働いていて、この仕事が大好きです。趣味はファッションと車と音楽とバスケットボールです。日本語を勉強している理由は二つあります。一つ目は、子どものとき、小学校二年生のときに、両親が私を日本人のバスケットボールリーグに入れてくれたことです。小さいころから日本の文化に触れて、日本人や日本の文化のまわりで育ちました。そして大きくなって大学に行ったとき、日本語を副専攻にすることにしました。二つ目は、日本に家族がいることです。東京と沖縄と福岡にいとこがいて、もっとよく話せるようになりたいです。よろしくお願いします。
                </p>
              </div>

              {/* Mobile: yokogaki (横書き) — horizontal, left to right */}
              <div className="md:hidden">
                <p
                  className="text-xl leading-relaxed text-white/80 font-medium"
                  style={{ fontFamily: '"Noto Sans JP", system-ui, sans-serif' }}
                >
                  はじめまして。バラード・リースです。ロサンゼルスで生まれて、今もロサンゼルスに住んでいます。ソフトウェアエンジニアとして働いていて、この仕事が大好きです。趣味はファッションと車と音楽とバスケットボールです。日本語を勉強している理由は二つあります。一つ目は、子どものとき、小学校二年生のときに、両親が私を日本人のバスケットボールリーグに入れてくれたことです。小さいころから日本の文化に触れて、日本人や日本の文化のまわりで育ちました。そして大きくなって大学に行ったとき、日本語を副専攻にすることにしました。二つ目は、日本に家族がいることです。東京と沖縄と福岡にいとこがいて、もっとよく話せるようになりたいです。よろしくお願いします。
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="en"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="text-xl sm:text-2xl leading-relaxed text-white/80 font-medium max-w-3xl">
                Hi, my name is Reece Ballard. I was born in Los Angeles, and I live in Los Angeles now. I work as a software engineer, and I really love it. My hobbies include fashion, cars, music, and basketball. I decided to study Japanese for two reasons. First, when I was a kid, my parents put me in a Japanese basketball league in second grade. This introduced me to Japanese culture at a young age, and I grew up around Japanese people and culture. Later, when I got older and went to college, I decided to minor in Japanese. Second, I have family in Japan. I have cousins in Tokyo, Okinawa, and Fukuoka, and I want to connect with them better.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

