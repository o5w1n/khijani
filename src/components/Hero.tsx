"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const AFRICA_PATH =
  "M 120,25 C 158,10 205,8 250,22 L 285,42 C 294,62 296,85 294,108 L 296,132 C 298,145 298,154 294,162 L 282,185 C 268,220 253,255 238,285 L 215,328 C 198,356 178,374 155,380 L 130,378 C 108,372 88,358 70,338 L 50,308 C 36,278 30,250 34,224 L 28,200 C 20,176 16,152 22,128 C 28,106 40,88 54,72 L 68,54 C 75,40 86,28 100,22 Z";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  },
};

export default function Hero() {
  return (
    <section className="relative bg-paper pt-16 overflow-hidden">
      {/* Africa silhouette — fine engraving, right margin */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg
          viewBox="0 0 320 420"
          className="absolute right-[-8%] bottom-[-10%] h-[85%] text-green opacity-[0.07]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d={AFRICA_PATH} />
          <path d={AFRICA_PATH} transform="translate(8,8)" strokeWidth="0.75" />
        </svg>
      </div>

      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10"
      >
        {/* Dateline bar */}
        <motion.div
          variants={stagger.item}
          className="flex items-center justify-between py-4 hairline-b mt-4"
        >
          <span className="folio text-ink">Vol. I — The Thinking Issue</span>
          <span className="folio text-ink-faint hidden sm:inline">
            Accra Ghana
          </span>
          <span className="folio text-terra">Est. 2026</span>
        </motion.div>

        {/* Masthead headline */}
        <div className="pt-14 md:pt-20 pb-12 md:pb-16">
          <motion.h1
            variants={stagger.item}
            className="font-display font-black text-ink leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(56px, 11vw, 148px)" }}
          >
            Train your mind.
          </motion.h1>
          <motion.h1
            variants={stagger.item}
            className="font-display font-black leading-[0.95] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(56px, 11vw, 148px)" }}
          >
            Shape{" "}
            <span className="italic font-semibold text-terra">your world.</span>
          </motion.h1>
        </div>

        {/* Standfirst row: drop-cap intro + CTA column */}
        <motion.div
          variants={stagger.item}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 md:pb-20"
        >
          <div className="md:col-span-6 lg:col-span-5">
            <div className="kente-rule w-24 mb-7" aria-hidden="true" />
            <p className="dropcap text-ink-soft text-[18px] md:text-[19px] leading-[1.65]">
              Real African dilemmas. Multiple perspectives. Hard decisions and
              no easy answers. Khijani turns the classroom into a chamber of
              honest argument — where students learn to reason, not recite.
              This is how critical thinkers are made.
            </p>
          </div>

          <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9 flex flex-col justify-end gap-3">
            <a
              href="#how-it-works"
              className="group flex items-center justify-between px-6 py-4 bg-green text-paper transition-colors duration-200 hover:bg-green-deep"
            >
              <span className="folio">Start Your Journey</span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#pricing"
              className="group flex items-center justify-between px-6 py-4 border border-ink text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              <span className="folio">For Schools</span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </motion.div>

        {/* Lead photograph */}
        <motion.figure variants={stagger.item} className="pb-14 md:pb-16">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-paper-deep">
            <Image
              src="/images/hero.jpg"
              alt="Students from a Khijani pilot session gathered on a school balcony in Accra"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-[center_32%]"
            />
          </div>
          <figcaption className="flex items-baseline justify-between gap-4 pt-3 hairline-b pb-3">
            <span className="text-[14px] italic text-ink-faint">
              Pilot session students, Accra — moments after the vote.
            </span>
            <span className="folio text-ink-faint shrink-0 hidden sm:inline">
              Fig. 01 — From the field
            </span>
          </figcaption>
        </motion.figure>

        {/* Index strip */}
        <motion.div
          variants={stagger.item}
          className="hairline-t grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(24,28,24,0.16)]"
        >
          {[
            { num: "01", label: "Critical thinking", note: "as a daily habit" },
            { num: "02", label: "Real African problems", note: "no invented scenarios" },
            { num: "03", label: "Measurable growth", note: "via the Khijani Index" },
          ].map((item) => (
            <div key={item.num} className="flex items-baseline gap-4 py-5 sm:px-6 first:pl-0 last:pr-0">
              <span className="font-display font-light text-[28px] text-terra leading-none">
                {item.num}
              </span>
              <p className="text-[15px] text-ink leading-snug">
                <span className="font-semibold">{item.label}</span>{" "}
                <span className="italic text-ink-faint">— {item.note}</span>
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
