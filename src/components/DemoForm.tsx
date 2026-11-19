"use client";

import { useState } from "react";
import { DEMO_ROLES } from "@/lib/demo-request";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const FIELD = "w-full bg-paper border border-rule px-4 py-3 text-[16px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-green transition-colors";
const LABEL = "folio text-ink-soft block mb-2";

function Field({ id, label, optional, children }: { id: string; label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
        {optional && <span className="text-ink-faint normal-case tracking-normal font-normal"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

export default function DemoForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
        return;
      }
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error", message: "Couldn't reach us. Check your connection and try again." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="border border-rule bg-paper p-8 md:p-10" role="status">
        <p className="folio text-green mb-4">Request received</p>
        <h2 className="font-display text-3xl font-semibold text-ink mb-4">Thank you. We&apos;ll be in touch.</h2>
        <p className="text-[17px] text-ink-soft leading-[1.7]">
          Someone from the Khijani team will contact you within two working days to arrange a time
          that suits your school.
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} className="border border-rule bg-paper p-6 md:p-10 space-y-6" noValidate={false}>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field id="full_name" label="Full name">
          <input id="full_name" name="full_name" required minLength={2} maxLength={100} autoComplete="name" className={FIELD} />
        </Field>
        <Field id="email" label="Work email">
          <input id="email" name="email" type="email" required maxLength={255} autoComplete="email" className={FIELD} />
        </Field>
        <Field id="phone" label="Phone / WhatsApp">
          <input id="phone" name="phone" type="tel" required pattern="[0-9+()\s\-]{6,30}" autoComplete="tel" placeholder="+233 ..." className={FIELD} />
        </Field>
        <Field id="role" label="Your role">
          <select id="role" name="role" required defaultValue="" className={FIELD}>
            <option value="" disabled>Choose one</option>
            {DEMO_ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </Field>
        <Field id="school_name" label="School name">
          <input id="school_name" name="school_name" required minLength={2} maxLength={150} autoComplete="organization" className={FIELD} />
        </Field>
        <Field id="country" label="Country">
          <input id="country" name="country" required minLength={2} maxLength={60} autoComplete="country-name" className={FIELD} />
        </Field>
      </div>

      <Field id="message" label="Anything we should know?" optional>
        <textarea id="message" name="message" rows={4} maxLength={1000} className={FIELD} placeholder="Class sizes, subjects, when you'd like to start…" />
      </Field>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" && (
        <p className="text-[15px] text-terra-dark" role="alert">{status.message}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group w-full flex items-center justify-between px-6 py-4 bg-green text-paper transition-colors duration-200 hover:bg-green-deep disabled:opacity-60"
      >
        <span className="folio">{sending ? "Sending…" : "Request a demo"}</span>
        <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1">→</span>
      </button>

      <p className="text-[14px] text-ink-faint leading-relaxed">
        We use these details only to arrange your demo. See our{" "}
        <a href="/privacy" className="underline underline-offset-4 decoration-ink/30 hover:decoration-ink">privacy policy</a>.
      </p>
    </form>
  );
}
