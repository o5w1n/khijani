import Image from "next/image";
import { PORTAL_LOGIN_URL, STUDENT_APP_URL } from "@/lib/site";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "For Schools", href: "/#for-schools" },
    { label: "Request a demo", href: "/demo" },
    { label: "Teacher & Admin Log in", href: PORTAL_LOGIN_URL },
    { label: "Enter your class code", href: STUDENT_APP_URL },
  ],
  Resources: [
    { label: "Conundrums & Cascade Games", href: "/#conundrums" },
    { label: "The Journey", href: "/#journey" },
    { label: "FAQ", href: "/#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-paper">
      <div className="kente-rule" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 pb-14 hairline-b">
          {/* Colophon */}
          <div className="sm:col-span-2 md:col-span-1">
            <Image
              src="/images/logo/on-green.png"
              alt="Khijani Africa"
              width={200}
              height={111}
              sizes="128px"
              className="h-12 w-auto mb-6"
            />
            <p className="text-[16px] italic text-ink-faint leading-[1.65] max-w-[240px] mb-6">
              Critical thinking exercises for the modern African classroom.
            </p>
            <p className="folio text-terra-ink">Hult Prize 2026</p>
          </div>

          {/* Link departments */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="folio text-ink-faint mb-3">{group}</p>
              <ul className="space-y-0.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-[40px] items-center text-[14px] text-ink-soft hover:text-terra-ink hover:italic transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Imprint line */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4">
          <p className="text-[14px] italic text-ink-faint">
            © {new Date().getFullYear()} Khijani Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
