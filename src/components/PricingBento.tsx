"use client";

import { motion } from "framer-motion";

const pilotFeatures = [
  "One class, up to 60 students",
  "Full 4-phase student flow",
  "Full Khijani Index scoring",
  "Up to 3 conundrums for the term",
  "Full term of session history",
];

const customFeatures = [
  "Unlimited conundrums",
  "Advanced Khijani Index (all 5 dimensions)",
  "Unlimited students across classes",
  "Class-wide reasoning analytics",
  "Student growth tracking over time",
  "Priority support",
  "Custom conundrum builder",
];

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function PricingBento() {
  return (
    <section id="pricing" className="bg-paper py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="pb-6 hairline-b mb-14"
        >
          <p className="folio text-green mb-4">§ 5 — For Schools</p>
          <h2
            className="font-display font-bold text-ink leading-[1.05] max-w-2xl text-balance"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
          >
            Start with one class.{" "}
            <span className="italic font-medium">Scale when it works.</span>
          </h2>
        </motion.div>

        {/* Two ruled columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 md:divide-x divide-[rgba(24,28,24,0.16)] max-w-[980px]">
          {/* Pilot */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col md:pr-14"
          >
            <p className="folio text-ink-faint mb-7">For a single class</p>
            <p
              className="font-display font-black text-ink leading-none mb-4"
              style={{ fontSize: "clamp(52px, 6vw, 72px)" }}
            >
              Pilot
            </p>
            <p className="text-[16px] italic text-ink-faint mb-9 leading-[1.65]">
              Run a full term of critical-thinking sessions with one class —
              see the Index move before you commit.
            </p>

            <ul className="hairline-t mb-10 flex-1">
              {pilotFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline gap-4 py-3.5 hairline-b text-[15px] text-ink-soft"
                >
                  <span className="folio text-green" aria-hidden="true">
                    ·
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/233XXXXXXXXX?text=Hi%2C+I%27d+like+to+pilot+Khijani+in+my+classroom"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 py-4 border border-ink text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              <span className="folio">Start a Pilot</span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          {/* Custom */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="flex flex-col md:pl-14"
          >
            <div className="flex items-baseline justify-between mb-7">
              <p className="folio text-ink-faint">School-wide</p>
              <span className="folio text-terra">School Plan</span>
            </div>
            <p
              className="font-display font-black text-ink leading-none mb-4"
              style={{ fontSize: "clamp(52px, 6vw, 72px)" }}
            >
              Custom
            </p>
            <p className="text-[16px] italic text-ink-faint mb-9 leading-[1.65]">
              Institution-wide deployment with full analytics, training, and
              dedicated account management.
            </p>

            <ul className="hairline-t mb-10 flex-1">
              {customFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline gap-4 py-3.5 hairline-b text-[15px] text-ink-soft"
                >
                  <span className="folio text-terra" aria-hidden="true">
                    ·
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/233535378349?text=Hi%2C+I%27d+like+to+enquire+about+Khijani+for+our+school"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 py-4 bg-green text-paper transition-colors duration-200 hover:bg-green-deep"
            >
              <span className="folio">Contact Us</span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        <p className="mt-10 text-[15px] italic text-ink-faint">
          Not sure which fits?{" "}
          <a
            href="https://wa.me/233535378349"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green underline underline-offset-4 decoration-green/40 hover:decoration-green"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
