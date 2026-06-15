"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Media {
  type: "image" | "video";
  src: string;
  caption: string;
}

interface Chapter {
  num: string;
  title: string;
  period: string;
  blurb: string;
  cover: string;
  media: Media[];
}

/*
 * Swap the Unsplash placeholders for real pilot photos:
 * drop files in public/images/journey/ and point src at "/images/journey/...".
 */
const chapters: Chapter[] = [
  {
    num: "01",
    title: "First Pilot",
    period: "Accra",
    blurb: "The first classroom. The first vote. The day the idea became real.",
    cover: "/images/Pilot%201/1.jpg",
    media: [
      {
        type: "image",
        src: "/images/Pilot%201/2.jpg",
        caption: "Students reading the opening scenario",
      },
      {
        type: "image",
        src: "/images/Pilot%201/3.jpg",
        caption: "The first stakeholder debate",
      },
      {
        type: "image",
        src: "/images/Pilot%201/4.jpg",
        caption: "Vote phase — hands up for position two",
      },
      {
        type: "image",
        src: "/images/Pilot%201/5.jpg",
        caption: "After the session",
      },
    ],
  },
  {
    num: "02",
    title: "Second Pilot",
    period: "Returning, sharper",
    blurb:
      "New conundrums, a tighter flow, and the first cohort to see their Index grow.",
    cover: "/images/Pilot%202/cover.jpg",
    media: [
      {
        type: "image",
        src: "/images/Pilot%202/1.jpg",
        caption: "Round two — a full classroom session",
      },
      {
        type: "image",
        src: "/images/Pilot%202/2.jpg",
        caption: "Teachers reviewing class-wide patterns",
      },
      {
        type: "image",
        src: "/images/Pilot%202/3.jpg",
        caption: "Reflection phase, in writing",
      },
    ],
  },
  {
    num: "03",
    title: "Hult Prize 2026",
    period: "Nationals",
    blurb:
      "Khijani on the national stage: pitching a thinking classroom for the continent.",
    cover: "/images/Hult%20prize/cover.jpg",
    media: [
      {
        type: "image",
        src: "/images/Hult%20prize/1.jpg",
        caption: "On stage at nationals",
      },
      {
        type: "image",
        src: "/images/Hult%20prize/2.jpg",
        caption: "The pitch",
      },
      {
        type: "image",
        src: "/images/Hult%20prize/3.jpg",
        caption: "The team, after",
      },
      {
        type: "image",
        src: "/images/Hult%20prize/4.jpg",
        caption: "Post-pitch celebrations",
      },
    ],
  },
];

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

function ChapterOverlay({
  chapter,
  onClose,
}: {
  chapter: Chapter;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[110] bg-paper overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Chapter ${chapter.num} — ${chapter.title}`}
    >
      <div className="kente-rule sticky top-0 z-10" aria-hidden="true" />
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pb-20">
        {/* Chapter masthead */}
        <div className="flex items-end justify-between gap-6 pt-10 pb-6 hairline-b mb-10">
          <div>
            <p className="folio text-green mb-3">
              Chapter {chapter.num} — {chapter.period}
            </p>
            <h3
              className="font-display font-bold text-ink leading-[1.05]"
              style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
            >
              {chapter.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-3 shrink-0 pb-2"
            aria-label="Close chapter"
          >
            <span className="folio text-ink-faint group-hover:text-ink transition-colors">
              Close
            </span>
            <span className="font-display text-3xl leading-none text-ink rotate-45 inline-block transition-transform duration-300 group-hover:rotate-[135deg]">
              +
            </span>
          </button>
        </div>

        <p className="font-display italic text-ink-soft text-[19px] md:text-[22px] leading-[1.5] max-w-[560px] mb-12">
          {chapter.blurb}
        </p>

        {/* Plates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
          {chapter.media.map((m, i) => (
            <motion.figure
              key={m.src}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              {m.type === "video" ? (
                <video
                  src={m.src}
                  controls
                  playsInline
                  className="w-full aspect-video object-cover bg-ink"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.src}
                  alt={m.caption}
                  className="w-full aspect-video object-cover bg-paper-deep"
                  loading="lazy"
                />
              )}
              <figcaption className="flex items-baseline justify-between gap-4 pt-3 hairline-t mt-0 border-t-0">
                <span className="text-[14px] italic text-ink-faint">
                  {m.caption}
                </span>
                <span className="folio text-ink-faint shrink-0">
                  Plate {chapter.num}.{i + 1}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function JourneyGallery() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const colSizes =
    hovered === null
      ? "1fr 1fr 1fr"
      : [0, 1, 2].map((c) => (c === hovered ? "1.9fr" : "1fr")).join(" ");

  return (
    <section id="journey" className="bg-paper py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Department header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex items-end justify-between gap-6 pb-6 hairline-b mb-12"
        >
          <div>
            <p className="folio text-green mb-4">§ 4 — The Journey</p>
            <h2
              className="font-display font-bold text-ink leading-[1.05] max-w-2xl text-balance"
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
            >
              A story told{" "}
              <span className="italic font-medium">in chapters.</span>
            </h2>
          </div>
          <span className="folio text-ink-faint hidden md:block shrink-0 pb-2">
            From the field
          </span>
        </motion.div>

        {/* Chapter covers — expanding bento row on desktop, stacked on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-none gap-3 md:h-[480px]"
          style={{ gridTemplateColumns: undefined }}
        >
          <div
            className="hidden md:grid gap-3 h-full"
            style={{
              gridTemplateColumns: colSizes,
              transition: "grid-template-columns 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            {chapters.map((ch, i) => (
              <ChapterCover
                key={ch.num}
                chapter={ch}
                isHovered={hovered === i}
                onHover={(h) => setHovered(h ? i : null)}
                onOpen={() => setOpenChapter(i)}
              />
            ))}
          </div>

          {/* Mobile: stacked covers */}
          <div className="md:hidden flex flex-col gap-3">
            {chapters.map((ch, i) => (
              <div key={ch.num} className="h-[260px]">
                <ChapterCover
                  chapter={ch}
                  isHovered={false}
                  onHover={() => {}}
                  onOpen={() => setOpenChapter(i)}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Next chapter teaser */}
        <div className="flex items-baseline gap-5 mt-8 pt-5 hairline-t">
          <span className="font-display font-light text-[34px] leading-none text-ink-faint/40">
            04
          </span>
          <p className="font-display italic text-ink-faint text-[18px]">
            Next chapter coming soon.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {openChapter !== null && (
          <ChapterOverlay
            chapter={chapters[openChapter]}
            onClose={() => setOpenChapter(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ChapterCover({
  chapter,
  isHovered,
  onHover,
  onOpen,
}: {
  chapter: Chapter;
  isHovered: boolean;
  onHover: (hovering: boolean) => void;
  onOpen: () => void;
}) {
  return (
    <button
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      onClick={onOpen}
      className="group relative w-full h-full overflow-hidden text-left bg-ink"
      aria-label={`Open Chapter ${chapter.num} — ${chapter.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chapter.cover}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
        loading="lazy"
      />
      {/* Ink wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />
      <div className="absolute top-0 left-0 right-0 kente-rule opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p className="folio text-gold mb-2">
          Chapter {chapter.num} — {chapter.period}
        </p>
        <h3 className="font-display font-bold text-paper leading-[1.1] text-[24px] md:text-[28px] mb-2">
          {chapter.title}
        </h3>
        <p
          className={`text-paper/70 italic text-[14px] leading-[1.6] max-w-[300px] transition-all duration-400 ${
            isHovered ? "opacity-100 max-h-20" : "md:opacity-0 md:max-h-0 opacity-100"
          } overflow-hidden`}
        >
          {chapter.blurb}
        </p>
        <p className="folio text-paper/60 mt-3 group-hover:text-paper transition-colors duration-200">
          Enter chapter →
        </p>
      </div>
    </button>
  );
}
