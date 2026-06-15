"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "My Year 10s were completely engaged for 40 straight minutes. Khijani sparked the best discussion I've had in five years of teaching. Students were challenging each other's reasoning, not just sharing opinions.",
    name: "Amara Diallo",
    role: "Social Studies Teacher",
    school: "Wilbury School, Accra",
  },
  {
    quote:
      "The Khijani Index gave me concrete data on each student's thinking depth. I finally had evidence-backed conversations with parents about critical thinking skills, not just grades.",
    name: "Michael Owusu",
    role: "Head of Humanities",
    school: "Nairobi Academy",
  },
  {
    quote:
      "Within two weeks, I noticed students starting to say 'but have you considered...' in regular lessons. Khijani built habits that transferred beyond the exercise. That's the real win.",
    name: "Seyram Aveh",
    role: "Ethics & Philosophy Teacher",
    school: "Wonder Heights International School",
  },
];

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function Testimonials() {
  return (
    <section className="relative bg-green-deep py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 kente-rule" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none bg-noise opacity-30" aria-hidden="true" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex items-end justify-between gap-6 pb-6 border-b border-paper/15 mb-14"
        >
          <div>
            <p className="folio text-gold mb-4">§ 3 — Field Notes</p>
            <h2
              className="font-display font-bold text-paper leading-[1.05] max-w-2xl text-balance"
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
            >
              Dispatches{" "}
              <span className="italic font-medium">from the classroom.</span>
            </h2>
          </div>
          <span className="folio text-paper/40 hidden md:block shrink-0 pb-2">
            Early pilot feedback
          </span>
        </motion.div>

        {/* Pull-quote columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-paper/15">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
              className="flex flex-col py-8 md:py-2 md:px-10 first:pl-0 last:pr-0 border-b md:border-b-0 border-paper/15 last:border-b-0"
            >
              <span
                className="font-display font-black text-gold leading-none select-none mb-5"
                style={{ fontSize: "64px" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote className="font-display text-paper/90 text-[18px] md:text-[19px] leading-[1.55] italic flex-1 mb-8">
                {t.quote}
              </blockquote>

              <figcaption className="pt-5 border-t border-paper/15">
                <p className="folio text-paper mb-1.5">{t.name}</p>
                <p className="text-[14px] italic text-paper/50 leading-snug">
                  {t.role} — {t.school}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
