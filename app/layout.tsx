import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Irfan's Personal AI Hub",
  description: "An intelligent workspace for documentation, prototypes, and innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

