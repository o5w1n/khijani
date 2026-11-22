import { NextRequest, NextResponse } from "next/server";
import { DEMO_ROLES, demoRequestSchema, type DemoRequest } from "@/lib/demo-request";
import { CONTACT_EMAIL } from "@/lib/site";

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

// Best-effort per-instance limiter; the DB CHECK constraints bound what a
// determined sender can store.
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now >= entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function requiredEnv(): { supabaseUrl: string; supabaseAnonKey: string; resendKey: string; notifyTo: string } | null {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.DEMO_REQUEST_TO;
  if (!supabaseUrl || !supabaseAnonKey || !resendKey || !notifyTo) return null;
  return { supabaseUrl, supabaseAnonKey, resendKey, notifyTo };
}

async function saveRequest(req: DemoRequest, url: string, anonKey: string): Promise<boolean> {
  const res = await fetch(`${url}/rest/v1/demo_requests`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      full_name: req.full_name,
      email: req.email,
      phone: req.phone,
      school_name: req.school_name,
      role: req.role,
      country: req.country,
      message: req.message ?? null,
    }),
  });
  if (!res.ok) console.error("[demo-request] save failed:", res.status, await res.text());
  return res.ok;
}

async function notifyTeam(req: DemoRequest, resendKey: string, to: string): Promise<boolean> {
  const roleLabel = DEMO_ROLES.find((r) => r.value === req.role)?.label ?? req.role;
  const text = [
    `New demo request from www.khijani.africa`,
    ``,
    `Name:    ${req.full_name}`,
    `Email:   ${req.email}`,
    `Phone:   ${req.phone}`,
    `School:  ${req.school_name}`,
    `Role:    ${roleLabel}`,
    `Country: ${req.country}`,
    ``,
    `Message:`,
    req.message ?? "(none)",
    ``,
    `Reply to this email to answer them directly.`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Khijani Website <noreply@khijani.africa>",
      to: to.split(",").map((addr) => addr.trim()).filter(Boolean),
      reply_to: req.email,
      subject: `Demo request: ${req.school_name} (${req.country})`.replace(/\s+/g, " "),
      text,
    }),
  });
  if (!res.ok) console.error("[demo-request] email failed:", res.status, await res.text());
  return res.ok;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many demo requests from your connection. Wait a few minutes and try again." },
      { status: 429 }
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    const honeypotTripped = parsed.error.issues.some((i) => i.path[0] === "company_website");
    // Pretend success to bots so they don't retry.
    if (honeypotTripped) return NextResponse.json({ ok: true });

    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !(key in fieldErrors)) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Please review the highlighted fields below.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const env = requiredEnv();
  if (!env) {
    console.error("[demo-request] missing SUPABASE_URL / SUPABASE_ANON_KEY / RESEND_API_KEY / DEMO_REQUEST_TO");
    return NextResponse.json(
      { error: `We couldn't submit the form right now. Please email ${CONTACT_EMAIL} or message +233 53 537 8349 on WhatsApp.` },
      { status: 500 }
    );
  }

  const [saved, emailed] = await Promise.all([
    saveRequest(parsed.data, env.supabaseUrl, env.supabaseAnonKey).catch((e: unknown) => {
      console.error("[demo-request] save threw:", e);
      return false;
    }),
    notifyTeam(parsed.data, env.resendKey, env.notifyTo).catch((e: unknown) => {
      console.error("[demo-request] email threw:", e);
      return false;
    }),
  ]);

  // One channel is enough for the team to see it; only fail if both are lost.
  if (!saved && !emailed) {
    return NextResponse.json(
      {
        error: `Could not deliver your request. Please try again, or reach us at ${CONTACT_EMAIL} or +233 53 537 8349 on WhatsApp.`,
      },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
