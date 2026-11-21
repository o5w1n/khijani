"use client";

import { Reveal } from "@/components/Reveal";

const singleClassPoints = [
  "One class using KH- four-digit student codes",
  "Full library of African conundrums & Cascade Games",
  "Automatic 6-dimension Khijani Index scoring",
  "Live teacher session monitor & class vote reveal",
  "Guided onboarding and first-session walkthrough",
];

const wholeSchoolPoints = [
  "Multiple classes across departments and year groups",
  "Student growth tracking across all 6 Index dimensions",
  "School admin analytics & teacher onboarding portal",
  "Printable student code cards & class progress reports",
  "Support for custom school scenarios & dedicated setup",
];

export default function PricingBento() {
  return (
    <section id="for-schools" className="bg-paper py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <Reveal margin="-60px" className="pb-6 hairline-b mb-14">
          <p className="folio text-green mb-4">§ 5 — For Schools</p>
          <h2
            className="font-display font-bold text-ink leading-[1.05] max-w-2xl text-balance"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
          >
            Start with one class.{" "}
            <span className="italic font-medium">Scale across your school.</span>
          </h2>
        </Reveal>

        {/* Two ruled columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 md:divide-x divide-[rgba(24,28,24,0.16)] max-w-[980px]">
          {/* Single Class */}
          <Reveal
            y={28}
            margin="-30px"
            className="flex flex-col md:pr-14"
          >
            <p className="folio text-ink-faint mb-7">For one classroom</p>
            <h3
              className="font-display font-black text-ink leading-none mb-4"
              style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
            >
              One Class
            </h3>
            <p className="text-[16px] italic text-ink-faint mb-9 leading-[1.65]">
              See Khijani run in a single classroom this term — watch students
              argue real dilemmas before rolling out further.
            </p>

            <ul className="hairline-t mb-10 flex-1">
              {singleClassPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 py-3.5 hairline-b text-[16px] text-ink-soft"
                >
                  <span className="folio text-green" aria-hidden="true">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/demo"
              className="group flex min-h-[48px] items-center justify-between px-6 py-4 border border-ink text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.1em]">
                Request a Demo
              </span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>

          {/* Whole School */}
          <Reveal
            y={28}
            delay={0.1}
            margin="-30px"
            className="flex flex-col md:pl-14"
          >
            <div className="flex items-baseline justify-between gap-4 mb-7">
              <p className="folio text-ink-faint">School-wide</p>
              <span className="folio text-terra-ink">Institutional Setup</span>
            </div>
            <h3
              className="font-display font-black text-ink leading-none mb-4"
              style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
            >
              Whole School
            </h3>
            <p className="text-[16px] italic text-ink-faint mb-9 leading-[1.65]">
              Department-wide onboarding with school-level Index analytics,
              teacher invites, and dedicated support.
            </p>

            <ul className="hairline-t mb-10 flex-1">
              {wholeSchoolPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 py-3.5 hairline-b text-[16px] text-ink-soft"
                >
                  <span className="folio text-terra-ink" aria-hidden="true">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/demo"
              className="group flex min-h-[48px] items-center justify-between px-6 py-4 bg-green text-paper transition-colors duration-200 hover:bg-green-deep"
            >
              <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.1em]">
                Request a Demo
              </span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>
        </div>

        <p className="mt-10 text-[16px] italic text-ink-faint">
          Have a quick question before booking?{" "}
          <a
            href="https://wa.me/233535378349"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center text-[16px] font-medium text-green underline underline-offset-4 decoration-green/50 hover:text-terra-ink hover:decoration-terra-ink transition-colors"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
