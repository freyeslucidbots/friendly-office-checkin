
# Friendly Office Check-In (Next.js + Slack)

Simple check-in form that posts to Slack via Incoming Webhook.

## Deploy on Vercel
1) Push these files to GitHub (or upload via the web UI)
2) Import the repo in Vercel
3) Add env vars:
   - SLACK_WEBHOOK_URL=your webhook
   - NEXT_PUBLIC_OFFICE_NAME=Lucid Bots
   - (optional) NEXT_PUBLIC_HOSTS=[{"label":"Front Desk"},{"label":"Andrew","mention":"<@U123456>"}]

## Local dev (optional)
npm i && cp .env.example .env.local && npm run dev
