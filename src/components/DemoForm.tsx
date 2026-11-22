"use client";

import { useState, useRef } from "react";
import { DEMO_ROLES, demoRequestSchema } from "@/lib/demo-request";
import { CONTACT_EMAIL } from "@/lib/site";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };
type FieldErrors = Partial<Record<"full_name" | "email" | "phone" | "role" | "school_name" | "country" | "message", string>>;

const FIELD_ORDER: (keyof FieldErrors)[] = [
  "full_name",
  "email",
  "phone",
  "role",
  "school_name",
  "country",
  "message",
];

const LABEL = "font-mono text-[14px] font-semibold uppercase tracking-[0.06em] text-ink-soft block mb-2";

function fieldClass(hasError: boolean) {
  return [
    "w-full min-h-[44px] bg-paper border px-4 py-3 text-[16px] text-ink placeholder:text-ink-faint transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    hasError
      ? "border-terra-ink focus-visible:border-terra-ink focus-visible:ring-terra-ink"
      : "border-rule-control focus-visible:border-green",
  ].join(" ");
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
        {optional && (
          <span className="font-sans text-[14px] text-ink-faint normal-case tracking-normal font-normal">
            {" "}
            (optional)
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[14px] font-medium text-terra-ink">
          {error}
        </p>
      )}
    </div>
  );
}

export default function DemoForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  function clearFieldError(name: keyof FieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function focusFirstInvalid(errors: FieldErrors) {
    for (const name of FIELD_ORDER) {
      if (errors[name]) {
        const el = formRef.current?.querySelector<HTMLElement>(`#${name}`);
        el?.focus();
        break;
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = demoRequestSchema.safeParse(raw);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "") as keyof FieldErrors;
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      setStatus({
        kind: "error",
        message: "Please fix the highlighted fields before submitting.",
      });
      focusFirstInvalid(nextErrors);
      return;
    }

    setFieldErrors({});
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json: { error?: string; fieldErrors?: FieldErrors } = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.fieldErrors) {
          setFieldErrors(json.fieldErrors);
          focusFirstInvalid(json.fieldErrors);
        }
        setStatus({
          kind: "error",
          message:
            json.error ??
            `We couldn't submit your request. Please try again, or email ${CONTACT_EMAIL}.`,
        });
        return;
      }
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: `Couldn't reach us — check your internet connection and try again, or email ${CONTACT_EMAIL}.`,
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="border border-rule bg-paper p-8 md:p-10" role="status" aria-live="polite">
        <p className="folio text-green mb-4">Request received</p>
        <h2 className="font-display text-3xl font-semibold text-ink mb-4">
          Thank you. We&apos;ll be in touch.
        </h2>
        <p className="text-[17px] text-ink-soft leading-[1.7]">
          Someone from the Khijani team will contact you within two working days to arrange a time
          that suits your school.
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="border border-rule bg-paper p-6 md:p-10 space-y-6"
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <Field id="full_name" label="Full name" error={fieldErrors.full_name}>
          <input
            id="full_name"
            name="full_name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.full_name)}
            aria-describedby={fieldErrors.full_name ? "full_name-error" : undefined}
            onChange={() => clearFieldError("full_name")}
            className={fieldClass(Boolean(fieldErrors.full_name))}
          />
        </Field>
        <Field id="email" label="Work email" error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            onChange={() => clearFieldError("email")}
            className={fieldClass(Boolean(fieldErrors.email))}
          />
        </Field>
        <Field id="phone" label="Phone / WhatsApp" error={fieldErrors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+233 ..."
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            onChange={() => clearFieldError("phone")}
            className={fieldClass(Boolean(fieldErrors.phone))}
          />
        </Field>
        <Field id="role" label="Your role" error={fieldErrors.role}>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            aria-invalid={Boolean(fieldErrors.role)}
            aria-describedby={fieldErrors.role ? "role-error" : undefined}
            onChange={() => clearFieldError("role")}
            className={fieldClass(Boolean(fieldErrors.role))}
          >
            <option value="" disabled>
              Choose one
            </option>
            {DEMO_ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="school_name" label="School name" error={fieldErrors.school_name}>
          <input
            id="school_name"
            name="school_name"
            required
            minLength={2}
            maxLength={150}
            autoComplete="organization"
            aria-invalid={Boolean(fieldErrors.school_name)}
            aria-describedby={fieldErrors.school_name ? "school_name-error" : undefined}
            onChange={() => clearFieldError("school_name")}
            className={fieldClass(Boolean(fieldErrors.school_name))}
          />
        </Field>
        <Field id="country" label="Country" error={fieldErrors.country}>
          <input
            id="country"
            name="country"
            required
            minLength={2}
            maxLength={60}
            autoComplete="country-name"
            aria-invalid={Boolean(fieldErrors.country)}
            aria-describedby={fieldErrors.country ? "country-error" : undefined}
            onChange={() => clearFieldError("country")}
            className={fieldClass(Boolean(fieldErrors.country))}
          />
        </Field>
      </div>

      <Field id="message" label="Anything we should know?" optional error={fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          onChange={() => clearFieldError("message")}
          className={fieldClass(Boolean(fieldErrors.message))}
          placeholder="Class sizes, subjects, when you'd like to start…"
        />
      </Field>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" && (
        <p className="text-[16px] font-medium text-terra-ink" role="alert">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group w-full min-h-[48px] flex items-center justify-between px-6 py-4 bg-green text-paper transition-colors duration-200 hover:bg-green-deep disabled:opacity-60"
      >
        <span className="font-mono text-[14px] font-semibold uppercase tracking-[0.1em]">
          {sending ? "Sending…" : "Request a demo"}
        </span>
        <span className="font-display text-lg leading-none transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </button>

      <p className="text-[14px] text-ink-faint leading-relaxed">
        We use these details only to arrange your demo. See our{" "}
        <a
          href="/privacy"
          className="inline-flex min-h-[40px] items-center text-[14px] underline underline-offset-4 decoration-ink/40 hover:decoration-ink"
        >
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
