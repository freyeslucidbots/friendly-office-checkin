
import "./globals.css";
import type { Metadata } from "next";

const OFFICE_NAME = process.env.NEXT_PUBLIC_OFFICE_NAME || "Office";

export const metadata: Metadata = {
  title: `${OFFICE_NAME} — Check-In`,
  description: `Quick visitor check-in for ${OFFICE_NAME}`,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
