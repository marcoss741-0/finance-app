import type { Metadata } from "next";
import { Mulish } from "next/font/google";

import "./globals.css";
import { Toaster } from "./_components/ui/sonner";

export const metadata: Metadata = {
  title: "Finance AI-APP",
  description: "Manage your finance with AI",
};

const mulish = Mulish({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`dark antialiased ${mulish.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
