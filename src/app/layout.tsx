import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "NEXT Notes",
  description:
    "Meeting notes, blog-style summaries, and research productivity tips from the NEXT meetup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
