import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HM Malerservice AS - Pristilbud",
  description: "Internt verktøy for å lage pristilbud"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  );
}
