
const WEBHOOK = process.env.SLACK_WEBHOOK_URL;
type Payload = { text: string; blocks?: any[] };
export async function sendSlackMessage(payload: Payload) {
  if (!WEBHOOK) throw new Error("SLACK_WEBHOOK_URL not configured.");
  const res = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Webhook failed: ${res.status} ${await res.text()}`);
}
