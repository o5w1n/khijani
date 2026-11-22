"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const phases = [
  {
    num: "01",
    title: "Read the Scenario",
    description:
      "Students encounter a real African dilemma: a drought that threatens farming, a lithium mine that promises jobs but risks the environment, a debt deal that funds roads but binds futures.",
  },
  {
    num: "02",
    title: "Explore Stakeholders",
    description:
      "Expandable stakeholder cards reveal each group's perspective, needs, and position. Students must sit with complexity before forming a view.",
  },
  {
    num: "03",
    title: "Vote and Defend",
    description:
      "Students cast a position and write a timed defence. The reasoning matters more than the answer. Votes can change; switching is expected.",
  },
  {
    num: "04",
    title: "Reflect on Your Thinking",
    description:
      "A guided reflection asks students what they changed, what they stood firm on, and what evidence moved them — before building on those habits in Cascade Games.",
  },
];

const indexDimensions = [
  { label: "Reasoning Quality", score: 20, fill: 85 },
  { label: "Evidence Use", score: 15, fill: 80 },
  { label: "Systems Thinking", score: 20, fill: 75 },
  { label: "Adaptability", score: 15, fill: 72 },
  { label: "Reflection", score: 20, fill: 90 },
  { label: "Perspective", score: 10, fill: 78 },
];

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-paper py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Department header */}
        <Reveal
          margin="-60px"
          className="flex items-end justify-between gap-6 pb-6 hairline-b mb-2"
        >
          <div>
            <p className="folio text-green mb-4">§ 1 — The Method</p>
            <h2
              className="font-display font-bold text-ink leading-[1.05] text-balance"
              style={{ fontSize: "clamp(34px, 5vw, 56px)" }}
            >
              Four phases. <span className="italic font-medium">One sharper mind.</span>
            </h2>
          </div>
          <span className="folio text-ink-faint hidden md:block shrink-0 pb-2">
            25–45 min per session
          </span>
        </Reveal>

        {/* Phase ledger rows */}
        <div>
          {phases.map((phase, i) => (
            <Reveal
              key={phase.num}
              duration={0.6}
              delay={i * 0.08}
              className="group grid grid-cols-[auto_1fr] md:grid-cols-12 gap-x-6 md:gap-x-10 py-9 hairline-b items-start"
            >
              <span
                className="md:col-span-2 font-display font-light text-terra-ink leading-[0.8] tracking-tight transition-colors duration-300 group-hover:text-green"
                style={{ fontSize: "clamp(48px, 6vw, 84px)" }}
              >
                {phase.num}
              </span>
              <h3 className="md:col-span-4 font-display font-semibold text-ink text-[22px] md:text-[26px] leading-tight pt-1">
                {phase.title}
              </h3>
              <p className="col-span-2 md:col-span-6 text-ink-soft text-[16px] leading-[1.7] pt-1 max-w-[560px]">
                {phase.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Khijani Index — ink ledger panel */}
        <Reveal
          y={32}
          duration={0.7}
          className="relative bg-green-deep mt-16 overflow-hidden"
        >
          <div className="kente-rule" aria-hidden="true" />
          <div className="absolute inset-0 bg-noise opacity-30" aria-hidden="true" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Left: text */}
            <div className="px-8 py-12 lg:px-14 lg:py-16">
              <p className="folio text-gold mb-6">The Khijani Index</p>
              <h3
                className="font-display font-semibold text-paper leading-[1.15] text-balance mb-6"
                style={{ fontSize: "clamp(26px, 3vw, 36px)" }}
              >
                A score that measures{" "}
                <span className="italic">how</span> you think — not what you
                know.
              </h3>
              <p className="text-paper/85 text-[16px] leading-[1.7] max-w-md">
                Across conundrums and Cascade Games, the Khijani Index evaluates
                six dimensions of critical thinking. Students see their own
                growth over time; teachers see class-wide patterns.
              </p>
            </div>

            {/* Right: score bars */}
            <div className="px-8 py-12 lg:px-14 lg:py-16 flex flex-col justify-center gap-5 lg:border-l border-paper/15">
              {indexDimensions.map((dim, i) => (
                <div key={dim.label}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-display text-[16px] text-paper/95 italic">
                      {dim.label}
                    </span>
                    <span className="folio text-paper/75">/{dim.score}</span>
                  </div>
                  <div className="h-[3px] bg-paper/15 overflow-hidden">
                    <motion.div
                      data-motion-bar=""
                      style={{ "--bar-fill": `${dim.fill}%`, width: `${dim.fill}%` } as CSSProperties}
                      initial={reduced ? false : { width: 0 }}
                      whileInView={{ width: `${dim.fill}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
                      className="h-full bg-gold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
