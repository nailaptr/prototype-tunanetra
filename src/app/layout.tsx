import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/a11y/SkipLink";
import Announcer from "@/components/a11y/Announcer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asisten AI Tunanetra",
  description:
    "Asisten AI berbahasa Indonesia untuk membantu pengguna tunanetra memahami layar dan mendapatkan panduan langkah demi langkah.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <SkipLink />
        <Announcer />
        {children}
      </body>
    </html>
  );
}
