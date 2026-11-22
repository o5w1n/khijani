"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="relative bg-green-deep overflow-hidden">
      <div className="kente-rule" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none bg-noise opacity-25" aria-hidden="true" />

      {/* Footer image, cropped at the right edge */}
      <div
        className="hidden sm:flex absolute inset-y-0 right-0 items-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/images/footer-mark.png"
          alt=""
          width={720}
          height={720}
          quality={75}
          sizes="40vw"
          className="h-[120%] w-auto object-contain translate-x-1/4 opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal y={28} duration={0.7} className="max-w-[760px]">
          <p className="folio text-gold mb-6">The Final Word</p>
          <h2
            className="font-display font-bold text-paper leading-[1.05] text-balance mb-7"
            style={{ fontSize: "clamp(34px, 5.5vw, 64px)" }}
          >
            Bring Khijani{" "}
            <span className="italic font-medium">to your school.</span>
          </h2>
          <p className="text-paper/85 text-[17px] leading-[1.7] mb-12 max-w-[520px]">
            Arrange a 30-minute walkthrough with your team. We set up your
            school admin account and help your teachers run their first class
            session.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-[640px]">
            <a
              href="/demo"
              className="group flex min-h-[48px] flex-1 items-center justify-between gap-4 px-6 py-4 bg-paper text-ink transition-colors duration-200 hover:bg-gold"
            >
              <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.1em]">
                Request a Demo
              </span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex min-h-[48px] flex-1 items-center justify-between gap-4 px-6 py-4 border border-paper/65 text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10"
            >
              <span className="font-mono text-[14px] font-semibold tracking-[0.04em]">
                {CONTACT_EMAIL}
              </span>
              <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex items-center gap-6 mt-14 flex-wrap border-t border-paper/20 pt-6">
            {["Accra, Ghana", "African Schools", "Hult Prize 2026"].map((tag) => (
              <span key={tag} className="folio text-paper/75">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
