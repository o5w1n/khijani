"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

interface Media {
  type: "image" | "video";
  src: string;
  caption: string;
  captionsSrc?: string;
}

interface Chapter {
  num: string;
  title: string;
  period: string;
  blurb: string;
  cover: string;
  media: Media[];
}

const chapters: Chapter[] = [
  {
    num: "01",
    title: "First Pilot",
    period: "Accra",
    blurb: "The first classroom. The first vote. The day the idea became real.",
    cover: "/images/Pilot 1/1.jpg",
    media: [
      {
        type: "image",
        src: "/images/Pilot 1/2.jpg",
        caption: "Students reading the opening scenario",
      },
      {
        type: "image",
        src: "/images/Pilot 1/3.jpg",
        caption: "The first stakeholder debate",
      },
      {
        type: "image",
        src: "/images/Pilot 1/4.jpg",
        caption: "Vote phase — hands up for position two",
      },
      {
        type: "image",
        src: "/images/Pilot 1/5.jpg",
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
    cover: "/images/Pilot 2/cover.jpg",
    media: [
      {
        type: "image",
        src: "/images/Pilot 2/1.jpg",
        caption: "Round two — a full classroom session",
      },
      {
        type: "image",
        src: "/images/Pilot 2/2.jpg",
        caption: "Teachers reviewing class-wide patterns",
      },
      {
        type: "image",
        src: "/images/Pilot 2/3.jpg",
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
    cover: "/images/Hult prize/cover.jpg",
    media: [
      {
        type: "image",
        src: "/images/Hult prize/1.jpg",
        caption: "On stage at nationals",
      },
      {
        type: "image",
        src: "/images/Hult prize/2.jpg",
        caption: "The pitch",
      },
      {
        type: "image",
        src: "/images/Hult prize/3.jpg",
        caption: "The team, after",
      },
      {
        type: "image",
        src: "/images/Hult prize/4.jpg",
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
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={dialogRef}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
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
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="group inline-flex min-h-[44px] items-center gap-3 shrink-0 px-2"
            aria-label="Close chapter"
          >
            <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.1em] text-ink-soft group-hover:text-ink transition-colors">
              Close
            </span>
            <span
              className="font-display text-3xl leading-none text-ink rotate-45 inline-block transition-transform duration-300 group-hover:rotate-[135deg]"
              aria-hidden="true"
            >
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
              initial={reduced ? false : { opacity: 0, y: 24 }}
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
                >
                  <track kind="captions" src={m.captionsSrc} label="English" />
                </video>
              ) : (
                <div className="relative w-full aspect-video overflow-hidden bg-paper-deep">
                  <Image
                    src={m.src}
                    alt={m.caption}
                    fill
                    priority={i === 0}
                    quality={75}
                    sizes={
                      i % 3 === 0
                        ? "(max-width: 768px) 100vw, 1200px"
                        : "(max-width: 768px) 100vw, 580px"
                    }
                    className="object-cover"
                  />
                </div>
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
  const lastOpenerRef = useRef<HTMLButtonElement | null>(null);

  const colSizes =
    hovered === null
      ? "1fr 1fr 1fr"
      : [0, 1, 2].map((c) => (c === hovered ? "1.9fr" : "1fr")).join(" ");

  function openDialog(idx: number, opener: HTMLButtonElement) {
    lastOpenerRef.current = opener;
    setOpenChapter(idx);
  }

  function closeDialog() {
    setOpenChapter(null);
    requestAnimationFrame(() => {
      lastOpenerRef.current?.focus();
    });
  }

  return (
    <section id="journey" className="bg-paper py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Department header */}
        <Reveal
          margin="-60px"
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
        </Reveal>

        {/* Chapter covers — expanding bento row on desktop, stacked on mobile */}
        <Reveal
          y={28}
          duration={0.7}
          className="grid grid-cols-1 md:grid-cols-none gap-3 md:h-[480px]"
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
                onOpen={(btn) => openDialog(i, btn)}
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
                  onOpen={(btn) => openDialog(i, btn)}
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Next chapter teaser */}
        <div className="flex items-baseline gap-5 mt-8 pt-5 hairline-t">
          <span
            aria-hidden="true"
            className="font-display font-light text-[34px] leading-none text-ink-faint"
          >
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
            onClose={closeDialog}
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
  onOpen: (opener: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      onClick={(e) => onOpen(e.currentTarget)}
      className="group relative w-full h-full overflow-hidden text-left bg-ink"
      aria-label={`Open Chapter ${chapter.num} — ${chapter.title}`}
    >
      <Image
        src={chapter.cover}
        alt=""
        fill
        quality={75}
        sizes="(max-width: 768px) 100vw, 45vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
      />
      {/* Ink wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />
      <div className="absolute top-0 left-0 right-0 kente-rule opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p className="folio text-gold mb-2">
          Chapter {chapter.num} — {chapter.period}
        </p>
        <h3 className="font-display font-bold text-paper leading-[1.1] text-[24px] md:text-[28px] mb-2">
          {chapter.title}
        </h3>
        <p
          className={`text-paper/85 italic text-[14px] leading-[1.6] max-w-[300px] transition-all duration-300 ${
            isHovered ? "opacity-100 max-h-24 visible" : "md:invisible md:opacity-0 md:max-h-0 opacity-100"
          } overflow-hidden`}
        >
          {chapter.blurb}
        </p>
        <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.1em] text-paper/85 mt-3 group-hover:text-paper transition-colors duration-200">
          Enter chapter →
        </p>
      </div>
    </button>
  );
}
