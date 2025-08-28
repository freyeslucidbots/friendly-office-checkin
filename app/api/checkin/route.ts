
import { NextRequest, NextResponse } from "next/server";
import { sendSlackMessage } from "@/lib/slack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, lookingFor, hostMention, notes, location } = body || {};
    if (!name || !lookingFor) return NextResponse.json({ error: "Missing required fields." }, { status: 400 });

    const text = `New check-in: ${name} is here looking for ${lookingFor}.`;
    const blocks = [
      { type: "header", text: { type: "plain_text", text: "🚪 Visitor Check-In", emoji: true } },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Name:* ${name}\n*Looking for:* ${lookingFor}${notes?`\n*Notes:* ${notes}`:""}` },
        fields: [
          ...(company ? [{ type: "mrkdwn", text: `*Company:* ${company}` }] : []),
          ...(phone ? [{ type: "mrkdwn", text: `*Phone:* ${phone}` }] : []),
          ...(location ? [{ type: "mrkdwn", text: `*Location:* ${location}` }] : []),
        ],
      },
    ] as any[];

    await sendSlackMessage({ text, blocks });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Check-in error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
