"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function CtaBanner() {
  return (
    <section className="relative bg-green-deep overflow-hidden">
      <div className="kente-rule" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none bg-noise opacity-25" aria-hidden="true" />

      {/* Footer image, cropped at the right edge */}
      <div
        className="absolute inset-y-0 right-0 flex items-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer.png"
          alt=""
          className="h-[120%] w-auto object-contain translate-x-1/4 opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[760px]"
        >
          <p className="folio text-gold mb-6">The Final Word</p>
          <h2
            className="font-display font-bold text-paper leading-[1.05] text-balance mb-7"
            style={{ fontSize: "clamp(34px, 5.5vw, 64px)" }}
          >
            Bring Khijani{" "}
            <span className="italic font-medium">to your school.</span>
          </h2>
          <p className="text-paper/65 text-[17px] leading-[1.7] mb-12 max-w-[480px]">
            Pilot Khijani in one classroom this term. No IT department, no
            long-term commitment — just see the Index move first.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-[640px]">
            <a
              href="https://wa.me/233XXXXXXXXX?text=Hi%2C+I%27d+like+to+bring+Khijani+to+my+school"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center justify-between gap-4 px-6 py-4 bg-paper text-ink transition-colors duration-200 hover:bg-gold"
            >
              <span className="folio">Message Us on WhatsApp</span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="mailto:hello@khijani.app"
              className="group flex flex-1 items-center justify-between gap-4 px-6 py-4 border border-paper/30 text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/5"
            >
              <span className="folio">hello@khijani.app</span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex items-center gap-6 mt-14 flex-wrap border-t border-paper/15 pt-6">
            {["Accra, Ghana", "African Schools", "Hult Prize 2026"].map((tag) => (
              <span key={tag} className="folio text-paper/40">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
