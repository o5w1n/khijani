import Image from "next/image";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Conundrums", href: "/#conundrums" },
    { label: "Khijani Index", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
  ],
  Resources: [
    { label: "Teacher Guide", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
    { label: "Conundrum Library", href: "/#conundrums" },
    { label: "Changelog", href: "/#" },
  ],
  Company: [
    { label: "About", href: "/#" },
    { label: "Blog", href: "/#" },
    { label: "Careers", href: "/#" },
    { label: "Contact", href: "/#faq" },
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12 pb-14 hairline-b">
          {/* Colophon */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/images/logo/on-green.png"
              alt="Khijani Africa"
              width={5022}
              height={2769}
              className="h-12 w-auto mb-6"
            />
            <p className="text-[14px] italic text-ink-faint leading-[1.7] max-w-[210px] mb-7">
              Critical thinking exercises for the modern African classroom.
            </p>
            <p className="folio text-terra">Hult Prize 2026</p>
          </div>

          {/* Link departments */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="folio text-ink-faint mb-5">{group}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-ink-soft hover:text-terra hover:italic transition-colors duration-200"
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
          <p className="text-[13px] italic text-ink-faint">
            © {new Date().getFullYear()} Khijani Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
