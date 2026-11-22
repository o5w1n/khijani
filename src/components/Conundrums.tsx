"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

type Level = "Beginner" | "Medium" | "Advanced";

interface Conundrum {
  num: string;
  title: string;
  domain: string;
  level: Level;
  teaser: string;
}

const conundrums: Conundrum[] = [
  {
    num: "01",
    title: "When the River Runs Dry",
    domain: "Climate & Food Security",
    level: "Beginner",
    teaser:
      "A dam upstream is saving one region from drought, but draining the farmland of three others. Who decides who gets water?",
  },
  {
    num: "02",
    title: "The Lights We Share",
    domain: "Energy Poverty",
    level: "Beginner",
    teaser:
      "A solar grid powers a village, but only covers 60 homes. The community must choose who stays in the dark.",
  },
  {
    num: "03",
    title: "The Scholarship or the Job",
    domain: "Youth Unemployment",
    level: "Medium",
    teaser:
      "A student earns a full scholarship abroad. Her family needs her income now. Her country needs her skills later. What does she owe, and to whom?",
  },
  {
    num: "04",
    title: "The Lithium Beneath Us",
    domain: "Natural Resources",
    level: "Medium",
    teaser:
      "A lithium deposit sits under ancestral farmland. The mine means jobs and foreign investment. It also means evictions and environmental risk.",
  },
  {
    num: "05",
    title: "The Debt That Built Our Roads",
    domain: "Sovereign Debt",
    level: "Advanced",
    teaser:
      "A government took a $2B infrastructure loan. Repayments now crowd out healthcare and education. Was the deal worth signing?",
  },
  {
    num: "06",
    title: "The Data That Feeds Them",
    domain: "Technology & Sovereignty",
    level: "Advanced",
    teaser:
      "A foreign tech company offers free AI-powered crop forecasting, in exchange for exclusive rights to all agricultural data generated.",
  },
];

const levels: Level[] = ["Beginner", "Medium", "Advanced"];

const levelColor: Record<Level, string> = {
  Beginner: "text-green",
  Medium: "text-gold-ink",
  Advanced: "text-terra-ink",
};

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

/* Redaction bars stand in for the title of briefs outside the active level */
function RedactedTitle({ seed }: { seed: number }) {
  const widths = [
    ["62%", "28%"],
    ["48%", "40%"],
    ["70%", "20%"],
  ][seed % 3];
  return (
    <span className="flex items-center gap-3" aria-hidden="true">
      {widths.map((w, i) => (
        <span
          key={i}
          className="inline-block h-[0.72em] bg-ink/85"
          style={{ width: w, fontSize: "clamp(21px, 2.6vw, 30px)" }}
        />
      ))}
    </span>
  );
}

export default function Conundrums() {
  const [activeLevel, setActiveLevel] = useState<Level>("Beginner");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectLevel = (lvl: Level) => {
    setActiveLevel(lvl);
    setActiveIdx(null);
  };

  function handleTabKeyDown(e: React.KeyboardEvent, idx: number) {
    let nextIdx: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      nextIdx = (idx + 1) % levels.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      nextIdx = (idx - 1 + levels.length) % levels.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = levels.length - 1;
    }
    if (nextIdx !== null) {
      e.preventDefault();
      selectLevel(levels[nextIdx]);
      tabRefs.current[nextIdx]?.focus();
    }
  }

  return (
    <section id="conundrums" className="bg-paper-deep py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Left — editorial sidebar, sticky on desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal margin="-60px">
              <p className="folio text-green mb-5">§ 2 — The Briefs</p>
              <h2
                className="font-display font-bold text-ink leading-[1.05] text-balance mb-7"
                style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                Real problems.{" "}
                <span className="italic font-medium">Real stakes.</span>
              </h2>
              <div className="kente-rule w-16 mb-7" aria-hidden="true" />
              <p className="text-ink-soft text-[16px] leading-[1.7] mb-10 max-w-[380px]">
                Each conundrum is grounded in documented African realities —
                water rights, energy access, resource extraction, and debt
                deals. Alongside the briefs, students play{" "}
                <strong className="font-semibold text-ink">Cascade Games</strong>{" "}
                to see how choices ripple over time.
              </p>

              {/* Level toggles */}
              <div className="hairline-t" role="tablist" aria-label="Brief difficulty level">
                {levels.map((lvl, idx) => {
                  const isActive = activeLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => selectLevel(lvl)}
                      onKeyDown={(e) => handleTabKeyDown(e, idx)}
                      className="group w-full flex min-h-[44px] items-center justify-between py-3 hairline-b text-left"
                    >
                      <span
                        className={`font-mono text-[14px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 ${
                          isActive
                            ? levelColor[lvl]
                            : "text-ink-faint group-hover:text-ink"
                        }`}
                      >
                        {lvl}
                      </span>
                      <span
                        className={`font-display text-[15px] italic transition-opacity duration-200 ${
                          isActive
                            ? "text-ink opacity-100"
                            : "invisible opacity-0 text-ink-soft group-hover:visible group-hover:opacity-100"
                        }`}
                      >
                        {isActive ? "— in view" : "view"}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="folio text-ink-faint mt-7">
                Full briefs &amp; Cascade Games open in the classroom edition.
              </p>
            </Reveal>
          </div>

          {/* Right — table-of-contents list */}
          <div className="lg:col-span-8 hairline-t">
            {conundrums.map((c, i) => {
              const inLevel = c.level === activeLevel;
              const isOpen = inLevel && activeIdx === i;
              return (
                <Reveal
                  key={c.num}
                  y={20}
                  duration={0.55}
                  delay={i * 0.06}
                  margin="-30px"
                  className="hairline-b"
                >
                  <button
                    type="button"
                    onClick={() =>
                      inLevel
                        ? setActiveIdx(isOpen ? null : i)
                        : selectLevel(c.level)
                    }
                    aria-expanded={inLevel ? isOpen : undefined}
                    aria-label={
                      inLevel
                        ? undefined
                        : `Redacted ${c.level} brief — switch to ${c.level} level`
                    }
                    className="group w-full min-h-[48px] text-left grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 md:gap-x-8 py-7"
                  >
                    <span
                      className={`font-display font-light text-[34px] md:text-[44px] leading-none transition-colors duration-300 text-ink-faint ${
                        inLevel ? "group-hover:text-terra-ink" : ""
                      }`}
                    >
                      {c.num}
                    </span>
                    <span>
                      {inLevel ? (
                        <span
                          className={`block font-display font-semibold text-ink leading-[1.15] transition-all duration-200 group-hover:italic ${
                            isOpen ? "italic text-green" : ""
                          }`}
                          style={{ fontSize: "clamp(21px, 2.6vw, 30px)" }}
                        >
                          {c.title}
                        </span>
                      ) : (
                        <RedactedTitle seed={i} />
                      )}
                      <span className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        {inLevel && (
                          <span className="folio text-ink-faint">{c.domain}</span>
                        )}
                        <span
                          className={`folio ${
                            inLevel ? levelColor[c.level] : "text-ink-faint"
                          }`}
                        >
                          {c.level}
                        </span>
                        {!inLevel && (
                          <span className="text-[14px] text-ink-faint italic">
                            classified — select level to reveal
                          </span>
                        )}
                      </span>
                    </span>
                    <span
                      className={`font-display text-2xl leading-none transition-transform duration-300 ${
                        isOpen
                          ? "rotate-45 text-green"
                          : "text-ink-soft group-hover:text-ink"
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="dropcap text-ink-soft text-[16px] leading-[1.7] max-w-[580px] pb-8 pl-0 sm:pl-[58px] md:pl-[76px]">
                          {c.teaser}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
