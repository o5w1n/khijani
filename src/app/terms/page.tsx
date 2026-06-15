import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Khijani Africa",
  description: "The terms that govern your use of the Khijani website.",
};

export default function TermsPage() {
  return <LegalPage slug="terms" kicker="§ Legal — Terms" />;
}
