import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLegalMarkdown, type LegalSlug } from "@/lib/legal";

interface LegalPageProps {
  slug: LegalSlug;
  kicker: string;
}

export default function LegalPage({ slug, kicker }: LegalPageProps) {
  const markdown = getLegalMarkdown(slug);

  return (
    <main>
      <Navbar />

      <article className="bg-paper pt-28 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-[760px] mx-auto px-6 md:px-10">
          <p className="folio text-green mb-6">{kicker}</p>
          <div className="legal-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

// Map markdown elements onto the site's editorial type system rather than
// shipping unstyled defaults.
const markdownComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1
      className="font-display font-bold text-ink leading-[1.05] text-balance mb-6"
      style={{ fontSize: "clamp(34px, 5vw, 56px)" }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="font-display font-semibold text-ink leading-tight mt-14 mb-5 pb-3 hairline-b text-[26px] md:text-[30px]">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="font-display font-semibold text-ink mt-9 mb-3 text-[19px]">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-[16.5px] text-ink-soft leading-[1.75] my-5">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-5 space-y-2.5 list-disc pl-6 marker:text-green text-[16.5px] text-ink-soft leading-[1.7]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-5 space-y-2.5 list-decimal pl-6 marker:text-ink-faint marker:font-mono text-[16.5px] text-ink-soft leading-[1.7]">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li className="pl-1">{children}</li>,
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a
      href={href}
      className="text-green underline underline-offset-4 decoration-green/40 hover:decoration-green transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-7 border-l-2 border-terra bg-paper-deep/60 px-5 py-4 text-[15.5px] text-ink-soft italic leading-[1.7]">
      {children}
    </blockquote>
  ),
  hr: () => <div className="kente-rule my-12" aria-hidden="true" />,
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-7 overflow-x-auto">
      <table className="w-full border-collapse text-[14.5px] text-ink-soft">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="hairline-b">{children}</thead>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="text-left folio text-ink-faint py-3 pr-4 align-top">{children}</th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="py-3 pr-4 align-top hairline-b leading-[1.6]">{children}</td>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="font-mono text-[0.85em] bg-paper-deep px-1.5 py-0.5 rounded text-terra">
      {children}
    </code>
  ),
};
