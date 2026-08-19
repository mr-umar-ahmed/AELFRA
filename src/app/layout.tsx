import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aelfra — Sovereign Intelligence at the Kernel Boundary",
  description:
    "An Awwwards-inspired cinematic platform unifying Linux Kernel Sandbox Runtime Defense, Enterprise AI Onboarding, and Autonomous AI Financial Audit under a single sovereign microservices architecture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${jetbrainsMono.variable} h-full bg-abyssal antialiased`}
    >
      <body className="min-h-full bg-abyssal text-foreground selection:bg-ocean-deep selection:text-villa-nova">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
