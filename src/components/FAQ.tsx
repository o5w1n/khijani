"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is Khijani?",
    a: "Khijani is a live classroom tool that helps teachers run structured critical thinking exercises. Students work through real African dilemmas in a 4-phase flow: reading a scenario, exploring stakeholder perspectives, casting a vote with a reasoned defence, and reflecting. Every session is scored by the Khijani Index.",
  },
  {
    q: "How does the Khijani Index work?",
    a: "The Khijani Index evaluates four dimensions of reasoning quality: Decision Quality, Perspective Breadth, Adaptability, and Reflection Depth. It measures how well students reason, not whether they chose the 'right' answer. Scores are calculated in under 10ms and stored over time so students and teachers can track growth.",
  },
  {
    q: "What age groups is Khijani designed for?",
    a: "Khijani has three levels. Beginner conundrums are designed for ages 10–13, Medium for 13–16, and Advanced for 15–18. The complexity of the scenario, the number of stakeholders, and the expected reasoning depth all scale by level.",
  },
  {
    q: "Do students need to create accounts?",
    a: "No. Students join a session using a 6-character code shared by the teacher. There is no download, no login, and no personal data stored for students. The session is tied to the classroom, not the individual.",
  },
  {
    q: "How long does a session take?",
    a: "A full conundrum session typically runs 25–45 minutes depending on the level and how much classroom discussion the teacher facilitates. The core student flow (scenario → stakeholders → vote → reflection) is timed and self-paced, so it fits inside a standard lesson period.",
  },
  {
    q: "Can teachers create their own conundrums?",
    a: "Yes — on the Premium plan. The custom conundrum builder lets teachers create scenarios with their own stakeholders, positions, and reflection prompts. All custom conundrums are scored by the same Khijani Index.",
  },
  {
    q: "Is Khijani aligned with the curriculum?",
    a: "Khijani is designed to complement humanities, social studies, ethics, and geography curricula across the African continent. The conundrums draw from documented regional issues and are tagged by domain, so teachers can connect them to what they're already teaching.",
  },
  {
    q: "How do schools get started?",
    a: "Individual teachers can start for free immediately. No credit card required. For institution-wide deployment (multiple teachers, school-wide analytics, and onboarding support), reach out via WhatsApp or email and we'll set up a call.",
  },
];

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-paper-deep py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          >
            <p className="folio text-green mb-5">§ 6 — Correspondence</p>
            <h2
              className="font-display font-bold text-ink leading-[1.05] text-balance mb-7"
              style={{ fontSize: "clamp(30px, 3.5vw, 44px)" }}
            >
              Questions{" "}
              <span className="italic font-medium">worth asking.</span>
            </h2>
            <div className="kente-rule w-16" aria-hidden="true" />
          </motion.div>

          {/* Ruled accordion */}
          <div className="lg:col-span-8 hairline-t">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
                className="hairline-b"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-baseline justify-between gap-6 py-6 text-left group"
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
                        : "text-ink-faint group-hover:text-ink"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="text-[16px] text-ink-soft leading-[1.7] pb-7 max-w-[620px] pl-[60px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
