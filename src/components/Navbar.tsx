"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Menu } from "lucide-react";
import { PORTAL_LOGIN_URL, STUDENT_APP_URL } from "@/lib/site";

const navLinks = [
  { label: "The Method", href: "/#how-it-works" },
  { label: "The Briefs", href: "/#conundrums" },
  { label: "Gallery", href: "/#journey" },
  { label: "For Schools", href: "/#for-schools" },
  { label: "Questions", href: "/#faq" },
];

const NAV_LINK_CLS =
  "font-mono text-[14px] font-semibold uppercase tracking-[0.06em] inline-flex min-h-[40px] items-center text-ink-soft hover:text-terra-ink transition-colors duration-200 whitespace-nowrap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        openBtnRef.current?.focus();
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
  }, [open]);

  function closeDrawer() {
    setOpen(false);
    openBtnRef.current?.focus();
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-paper transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_rgba(24,28,24,0.16)]" : ""
        }`}
      >
        <div className="kente-rule" aria-hidden="true" />
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Wordmark */}
          <a href="/" className="shrink-0 inline-flex min-h-[40px] items-center">
            <Image
              src="/images/logo/on-green.png"
              alt="Khijani Africa"
              width={180}
              height={100}
              sizes="128px"
              priority
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={NAV_LINK_CLS}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a href={PORTAL_LOGIN_URL} className={NAV_LINK_CLS}>
              Log in
            </a>
            <a
              href="/demo"
              className="inline-flex min-h-[40px] items-center px-5 border border-ink font-mono text-[14px] font-semibold uppercase tracking-[0.06em] text-ink transition-colors duration-200 hover:bg-ink hover:text-paper whitespace-nowrap"
            >
              Request a demo
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={openBtnRef}
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center text-ink"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-drawer"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-paper flex flex-col px-6 pt-6 pb-8 overflow-y-auto"
          >
            <div className="kente-rule absolute top-0 left-0 right-0" aria-hidden="true" />
            <div className="flex items-center justify-between mb-10 mt-2">
              <Image
                src="/images/logo/on-green.png"
                alt="Khijani Africa"
                width={180}
                height={100}
                sizes="128px"
                className="h-10 w-auto"
              />
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeDrawer}
                className="inline-flex h-11 w-11 items-center justify-center text-ink-soft hover:text-ink"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.07,
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="group flex items-baseline justify-between py-4 min-h-[48px] hairline-b"
                >
                  <span className="font-display text-3xl font-semibold text-ink group-hover:italic group-hover:text-terra-ink transition-colors duration-200">
                    {link.label}
                  </span>
                  <span className="folio text-ink-faint">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-auto pt-8 flex flex-col gap-3"
            >
              <a
                href={STUDENT_APP_URL}
                className="flex min-h-[44px] w-full items-center justify-center border border-rule-control px-4 font-mono text-[14px] font-semibold uppercase tracking-[0.06em] text-green"
              >
                Enter your class code
              </a>
              <a
                href={PORTAL_LOGIN_URL}
                className="flex min-h-[44px] w-full items-center justify-center border border-ink px-4 font-mono text-[14px] font-semibold uppercase tracking-[0.06em] text-ink"
              >
                Log in
              </a>
              <a
                href="/demo"
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] w-full items-center justify-center bg-ink px-4 font-mono text-[14px] font-semibold uppercase tracking-[0.06em] text-paper"
              >
                Request a demo
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
