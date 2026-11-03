import { NextResponse } from "next/server";

// Contact form endpoint. Sends the request to Georgi's inbox through Resend.
// Set these in the hosting environment (e.g. Vercel project settings):
//   RESEND_API_KEY  (required)   CONTACT_TO (default georgikarchev5@gmail.com)   CONTACT_FROM (default onboarding@resend.dev sender)
// Without RESEND_API_KEY the endpoint answers 503 and the page falls back to opening the visitor's mail app.

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v: unknown, max: number) => String(v ?? "").replace(/\r/g, "").trim().slice(0, max);
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  recent.push(now);
  hits.set(ip, recent);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const name = oneLine(clean(body.name, 120));
  const email = oneLine(clean(body.email, 200));
  const message = clean(body.message, 4000);
  const service = oneLine(clean(body.service, 120));
  const phone = oneLine(clean(body.phone, 60));
  const calltime = oneLine(clean(body.calltime, 200));

  if (!name || !EMAIL_RE.test(email)) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Preferred time: ${calltime || "-"}`,
    `Service: ${service || "-"}`,
    "",
    message || "(no message)",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "KARCHX <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? "georgikarchev5@gmail.com"],
        reply_to: email,
        subject: `KARCHX free call request from ${name}`,
        text,
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
