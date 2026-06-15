import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy — Khijani Africa",
  description:
    "How Khijani uses cookies and similar technologies across its website, portal, and student app.",
};

export default function CookiesPage() {
  return <LegalPage slug="cookies" kicker="§ Legal — Cookies" />;
}
