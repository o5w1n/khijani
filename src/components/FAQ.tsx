"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    q: "What is Khijani?",
    a: "Khijani is a classroom platform that helps teachers build structured critical thinking through two activities: live classroom conundrums (scenario → stakeholders → vote → reflection) and Cascade Games where students navigate unfolding consequences. Every session contributes to a student's Khijani Index.",
  },
  {
    q: "How does the Khijani Index work?",
    a: "The Khijani Index evaluates six dimensions of critical thinking: Reasoning Quality, Evidence Use, Systems Thinking, Adaptability, Reflection, and Perspective. It measures how thoughtfully students argue and revise views, not whether they picked a 'right' answer.",
  },
  {
    q: "What age groups is Khijani designed for?",
    a: "Khijani offers Beginner (ages 10–13), Medium (ages 13–16), and Advanced (ages 15–18) briefs and games. Scenario complexity, stakeholder nuance, and reflection prompts scale by level.",
  },
  {
    q: "Do students need email addresses or passwords?",
    a: "No. Teachers open a live classroom window and students join using a short KH- four-digit class code (for example KH-1042) alongside their first name — no student emails, passwords, or downloads.",
  },
  {
    q: "How long does a session take?",
    a: "A full conundrum session typically runs 25–45 minutes depending on class discussion, while Cascade Games fit neatly into shorter blocks. Everything is designed to fit inside a standard lesson period.",
  },
  {
    q: "Can schools run bespoke or local dilemmas?",
    a: "Yes. During institutional onboarding, partner schools can work with our team to introduce custom local scenarios scored by the same 6-dimension Khijani Index alongside our shared library.",
  },
  {
    q: "Is Khijani aligned with the curriculum?",
    a: "Khijani complements humanities, social studies, ethics, civic education, and geography curricula across African schools. Briefs draw from documented regional issues so teachers can connect sessions to current topics.",
  },
  {
    q: "How does a school get started?",
    a: "Every school starts with a live walkthrough. Request a demo and our team will schedule a 30-minute session covering conundrums, Cascade Games, the teacher portal, and the Khijani Index, then set up your school admin account.",
  },
];

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="bg-paper-deep py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Left label */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="folio text-green mb-5">§ 6 — Correspondence</p>
              <h2
                className="font-display font-bold text-ink leading-[1.05] text-balance mb-7"
                style={{ fontSize: "clamp(30px, 3.5vw, 44px)" }}
              >
                Questions{" "}
                <span className="italic font-medium">worth asking.</span>
              </h2>
              <div className="kente-rule w-16" aria-hidden="true" />
            </Reveal>
          </div>

          {/* Ruled accordion */}
          <div className="lg:col-span-8 hairline-t">
            {faqs.map((item, i) => (
              <Reveal
                key={item.q}
                y={16}
                duration={0.5}
                delay={i * 0.04}
                margin="-20px"
                className="hairline-b"
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full min-h-[48px] flex items-baseline justify-between gap-6 py-6 text-left group"
                  aria-expanded={open === i}
                >
                  <span className="flex items-baseline gap-5">
                    <span className="folio text-ink-faint shrink-0">
                      Q.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display font-semibold text-[19px] md:text-[21px] text-ink leading-snug transition-all duration-200 group-hover:italic ${
                        open === i ? "italic text-green" : ""
                      }`}
                    >
                      {item.q}
                    </span>
                  </span>
                  <span
                    className={`font-display text-2xl leading-none shrink-0 transition-transform duration-300 ${
                      open === i
                        ? "rotate-45 text-green"
                        : "text-ink-soft group-hover:text-ink"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-0 sm:pl-[60px] max-w-[620px]">
                        <p className="text-[16px] text-ink-soft leading-[1.7]">
                          {item.a}
                        </p>
                        {i === faqs.length - 1 && (
                          <a
                            href="/demo"
                            className="mt-3 inline-flex min-h-[40px] items-center text-[15px] font-semibold text-green underline underline-offset-4 decoration-green/50 hover:text-terra-ink hover:decoration-terra-ink"
                          >
                            Book a school walkthrough →
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
