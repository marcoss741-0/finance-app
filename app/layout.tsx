import type { Metadata } from "next";
import { Mulish } from "next/font/google";

import "./globals.css";
import { Toaster } from "./_components/ui/sonner";

export const metadata: Metadata = {
  title: "Finance AI-APP",
  description: "Manage your finance with AI",
};

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`dark antialiased ${mulish.className}`}>
        <div className="flex h-full flex-col overflow-hidden">{children}</div>

        <Toaster />
      </body>
    </html>
  );
}
