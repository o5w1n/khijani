import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Khijani Africa",
  description:
    "How Khijani collects, uses, and protects personal data across our website, portal, and student app.",
};

export default function PrivacyPage() {
  return <LegalPage slug="privacy" kicker="§ Legal — Privacy" />;
}
