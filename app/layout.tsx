import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "H&M Kalkyle",
  description: "H&M Malerservice kalkyle- og tilbudssystem"
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
