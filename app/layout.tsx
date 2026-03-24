import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSONCraft - Data Template Studio",
  description: "Transform JSON with dynamic template functions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
