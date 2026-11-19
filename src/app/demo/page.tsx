import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Request a demo — Khijani Africa",
  description:
    "See Khijani in a real classroom. Tell us about your school and we'll arrange a walkthrough of the conundrums, the teacher portal and the Khijani Index.",
  alternates: { canonical: "/demo" },
};

const STEPS = [
  "We reply within two working days to find a time that suits you.",
  "A 30-minute walkthrough: a live conundrum, the teacher portal and how the Khijani Index is scored.",
  "If it fits, we set up your school's admin account and help you run a first class.",
];

export default function DemoPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-paper pt-28 md:pt-36 pb-24 md:pb-32">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="folio text-green mb-6">For Schools</p>
            <h1
              className="font-display font-bold text-ink leading-[1.05] text-balance mb-7"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              See Khijani in <span className="italic font-medium">your</span> classroom.
            </h1>
            <p className="text-[17px] text-ink-soft leading-[1.7] mb-10">
              Tell us a little about your school. We&apos;ll show you how a conundrum runs, what
              teachers see, and how students&apos; thinking is measured over a term.
            </p>
            <ol className="space-y-5 hairline-t pt-8">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="folio text-terra pt-1">0{i + 1}</span>
                  <span className="text-[16px] text-ink-soft leading-[1.6]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="md:col-span-7 relative">
            <DemoForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
