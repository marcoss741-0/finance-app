import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "./_components/ui/sonner";

export const metadata: Metadata = {
  title: "Fiannce AI",
  description: "Manage your finance with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`dark antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
